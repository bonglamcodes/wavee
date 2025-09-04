// ElevenLabs Audio Service with secure API key handling
interface ElevenLabsConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  voice: string;
}

interface AudioGenerationOptions {
  text: string;
  voice?: string;
  model?: string;
  stability?: number;
  similarity_boost?: number;
  speed?: number;
}

class ElevenLabsService {
  private config: ElevenLabsConfig | null = null;
  private audioCache = new Map<string, string>();

  async initialize(apiKey?: string): Promise<boolean> {
    try {
      // For frontend apps, the API key needs to be passed directly
      // In production, this would come from a secure backend endpoint
      const key = apiKey;
      
      if (!key) {
        console.warn('ElevenLabs API key not provided. Falling back to browser TTS.');
        return false;
      }

      this.config = {
        apiKey: key,
        baseUrl: 'https://api.elevenlabs.io/v1',
        model: 'eleven_multilingual_v2', // High quality, emotionally rich
        voice: 'pFZP5JQG7iQjIQuC4Bku' // Lily - calm, soothing voice
      };

      // Test the API key with a small request
      await this.validateApiKey();
      return true;
    } catch (error) {
      console.error('Failed to initialize ElevenLabs:', error);
      this.config = null;
      return false;
    }
  }

  private async validateApiKey(): Promise<void> {
    if (!this.config) throw new Error('Service not initialized');

    const response = await fetch(`${this.config.baseUrl}/voices`, {
      headers: {
        'xi-api-key': this.config.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API validation failed: ${response.status}`);
    }
  }

  async generateSpeech(options: AudioGenerationOptions): Promise<string | null> {
    if (!this.config) {
      console.warn('ElevenLabs not initialized');
      return null;
    }

    const cacheKey = `${options.text}-${options.voice || this.config.voice}`;
    
    // Check cache first
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    try {
      const requestBody = {
        text: options.text,
        model_id: options.model || this.config.model,
        voice_settings: {
          stability: options.stability || 0.75,
          similarity_boost: options.similarity_boost || 0.85,
          speed: options.speed || 1.0,
          style: 0.2, // Slightly expressive
          use_speaker_boost: true
        }
      };

      const response = await fetch(
        `${this.config.baseUrl}/text-to-speech/${options.voice || this.config.voice}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.config.apiKey,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cache the result
      this.audioCache.set(cacheKey, audioUrl);
      
      return audioUrl;
    } catch (error) {
      console.error('ElevenLabs speech generation failed:', error);
      return null;
    }
  }

  isAvailable(): boolean {
    return this.config !== null;
  }

  clearCache(): void {
    // Clean up object URLs to prevent memory leaks
    this.audioCache.forEach(url => {
      URL.revokeObjectURL(url);
    });
    this.audioCache.clear();
  }
}

// Export singleton instance
export const elevenLabsService = new ElevenLabsService();