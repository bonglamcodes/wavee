// Unified Speech Service with ElevenLabs and Browser TTS fallback
import { elevenLabsService } from './audioService';
import { apiKeyService } from './apiKeyService';

interface SpeechOptions {
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

interface AmbientSound {
  id: string;
  name: string;
  url: string;
  icon: string;
}

class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private ambientAudio: HTMLAudioElement | null = null;
  private isElevenLabsAvailable = false;
  private speechVolume = 0.8;
  private ambientVolume = 0.3;

  // Ambient soundscapes for relaxation  
  private ambientSounds: AmbientSound[] = [
    {
      id: 'ocean',
      name: 'Ocean Waves',
      url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
      icon: '🌊'
    },
    {
      id: 'rain',
      name: 'Gentle Rain',
      url: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443a.mp3', 
      icon: '🌧️'
    },
    {
      id: 'forest',
      name: 'Forest Sounds',
      url: 'https://cdn.pixabay.com/audio/2022/03/20/audio_4985af5753.mp3',
      icon: '🌲'
    },
    {
      id: 'whitenoise',
      name: 'White Noise',
      url: 'https://cdn.pixabay.com/audio/2022/11/27/audio_7c2b6b8a27.mp3',
      icon: '⚪'
    },
    {
      id: 'silence',
      name: 'Silence',
      url: '',
      icon: '🔇'
    }
  ];

  async initialize(): Promise<void> {
    try {
      // Get the API key from secure storage
      const apiKey = await apiKeyService.getElevenLabsApiKey();
      
      // Try to initialize ElevenLabs service with the API key
      this.isElevenLabsAvailable = await elevenLabsService.initialize(apiKey || undefined);
      
      if (this.isElevenLabsAvailable) {
        console.log('✅ ElevenLabs service initialized successfully');
      } else {
        console.log('⚠️ ElevenLabs not available, using browser TTS fallback');
      }

      // Load user preferences
      this.loadAudioPreferences();
    } catch (error) {
      console.error('Speech service initialization failed:', error);
      this.isElevenLabsAvailable = false;
    }
  }

  private loadAudioPreferences(): void {
    const prefs = JSON.parse(localStorage.getItem('wavee-audio-preferences') || '{}');
    this.speechVolume = prefs.speechVolume || 0.8;
    this.ambientVolume = prefs.ambientVolume || 0.3;
  }

  private saveAudioPreferences(): void {
    const prefs = {
      speechVolume: this.speechVolume,
      ambientVolume: this.ambientVolume,
    };
    localStorage.setItem('wavee-audio-preferences', JSON.stringify(prefs));
  }

  async speak(options: SpeechOptions): Promise<void> {
    // Stop any current speech
    this.stopSpeech();

    try {
      if (this.isElevenLabsAvailable) {
        await this.speakWithElevenLabs(options);
      } else {
        await this.speakWithBrowserTTS(options);
      }
    } catch (error) {
      console.error('Speech failed, falling back to browser TTS:', error);
      if (options.onError) {
        options.onError(error as Error);
      }
      // Fallback to browser TTS
      await this.speakWithBrowserTTS(options);
    }
  }

  private async speakWithElevenLabs(options: SpeechOptions): Promise<void> {
    try {
      const audioUrl = await elevenLabsService.generateSpeech({
        text: options.text,
        voice: options.voice,
        speed: options.rate || 1.0,
      });

      if (!audioUrl) {
        throw new Error('Failed to generate audio with ElevenLabs');
      }

      this.currentAudio = new Audio(audioUrl);
      this.currentAudio.volume = this.speechVolume * (options.volume || 1);

      this.currentAudio.onloadstart = () => {
        if (options.onStart) options.onStart();
      };

      this.currentAudio.onended = () => {
        if (options.onEnd) options.onEnd();
        this.currentAudio = null;
      };

      this.currentAudio.onerror = (error) => {
        console.error('Audio playback error:', error);
        if (options.onError) {
          options.onError(new Error('Audio playback failed'));
        }
      };

      await this.currentAudio.play();
    } catch (error) {
      throw error;
    }
  }

  private async speakWithBrowserTTS(options: SpeechOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Browser TTS not supported'));
        return;
      }

      this.currentUtterance = new SpeechSynthesisUtterance(options.text);
      this.currentUtterance.rate = options.rate || 0.9;
      this.currentUtterance.pitch = options.pitch || 1;
      this.currentUtterance.volume = this.speechVolume * (options.volume || 1);

      // Use consistent voice for all speech
      const voices = speechSynthesis.getVoices();
      let selectedVoice = null;
      
      // Try to find the same voice every time for consistency
      if (voices.length > 0) {
        // First try to find a preferred calm voice
        selectedVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          (voice.name.toLowerCase().includes('female') && voice.lang.startsWith('en'))
        );
        
        // If no preferred voice found, use the first available English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        }
      }

      if (selectedVoice) {
        this.currentUtterance.voice = selectedVoice;
      }

      this.currentUtterance.onstart = () => {
        if (options.onStart) options.onStart();
      };

      this.currentUtterance.onend = () => {
        if (options.onEnd) options.onEnd();
        resolve();
      };

      this.currentUtterance.onerror = (event) => {
        const error = new Error(`Speech synthesis error: ${event.error}`);
        if (options.onError) options.onError(error);
        reject(error);
      };

      speechSynthesis.speak(this.currentUtterance);
    });
  }

  stopSpeech(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    if (this.currentUtterance) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking(): boolean {
    return !!(this.currentAudio && !this.currentAudio.paused) || 
           speechSynthesis.speaking;
  }

  // Ambient sound methods
  playAmbientSound(soundId: string): void {
    this.stopAmbientSound();

    if (soundId === 'silence') return;

    const sound = this.ambientSounds.find(s => s.id === soundId);
    if (!sound || !sound.url) return;

    this.ambientAudio = new Audio(sound.url);
    this.ambientAudio.loop = true;
    this.ambientAudio.volume = this.ambientVolume;

    this.ambientAudio.play().catch(error => {
      console.error('Failed to play ambient sound:', error);
    });
  }

  stopAmbientSound(): void {
    if (this.ambientAudio) {
      this.ambientAudio.pause();
      this.ambientAudio = null;
    }
  }

  setAmbientVolume(volume: number): void {
    this.ambientVolume = Math.max(0, Math.min(1, volume));
    if (this.ambientAudio) {
      this.ambientAudio.volume = this.ambientVolume;
    }
    this.saveAudioPreferences();
  }

  setSpeechVolume(volume: number): void {
    this.speechVolume = Math.max(0, Math.min(1, volume));
    if (this.currentAudio) {
      this.currentAudio.volume = this.speechVolume;
    }
    this.saveAudioPreferences();
  }

  getAmbientSounds(): AmbientSound[] {
    return this.ambientSounds;
  }

  getSpeechVolume(): number {
    return this.speechVolume;
  }

  getAmbientVolume(): number {
    return this.ambientVolume;
  }

  isElevenLabsEnabled(): boolean {
    return this.isElevenLabsAvailable;
  }

  // Breathing exercise specific methods
  async speakBreathingCue(phase: 'inhale' | 'hold' | 'exhale', count: number): Promise<void> {
    const instructions = {
      inhale: `Breathe in slowly... ${count}`,
      hold: `Hold your breath... ${count}`,
      exhale: `Breathe out gently... ${count}`
    };

    await this.speak({
      text: instructions[phase],
      rate: 0.8,
      volume: 0.9
    });
  }

  dispose(): void {
    this.stopSpeech();
    this.stopAmbientSound();
    elevenLabsService.clearCache();
  }
}

// Export singleton instance
export const speechService = new SpeechService();