import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface LessonsLibraryProps {
  isGuest?: boolean;
}

const LessonsLibrary = ({ isGuest = false }: LessonsLibraryProps) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const lessons = {
    shortTerm: [
      {
        id: "grounding-101",
        title: "5-4-3-2-1 Grounding Technique",
        duration: "3 min",
        description: "Learn this powerful grounding technique to calm anxiety in the moment",
        content: `The 5-4-3-2-1 technique is a simple but effective grounding exercise that helps you reconnect with the present moment when anxiety strikes.

Here's how it works:

**5 things you can SEE**
Look around and name 5 things you can see. Really focus on each one - their color, shape, texture.

**4 things you can TOUCH**
Notice 4 things you can physically feel - your feet on the ground, the texture of your clothes, the temperature of the air.

**3 things you can HEAR**
Listen carefully and identify 3 sounds around you - maybe birds chirping, cars passing, or even your own breathing.

**2 things you can SMELL**
Take a moment to notice 2 scents in your environment.

**1 thing you can TASTE**
Focus on one taste in your mouth, or take a sip of water and really notice the taste.

This technique works by shifting your focus from anxious thoughts to your immediate sensory experience, helping to ground you in the present moment.`
      },
      {
        id: "breathing-basics",
        title: "Box Breathing for Anxiety",
        duration: "4 min",
        description: "Master the box breathing technique used by Navy SEALs",
        content: `Box breathing, also known as square breathing, is a powerful technique used by Navy SEALs, first responders, and healthcare professionals to manage stress and anxiety.

**The Pattern:**
- Inhale for 4 counts
- Hold for 4 counts  
- Exhale for 4 counts
- Hold empty for 4 counts
- Repeat

**Why it works:**
Box breathing activates your parasympathetic nervous system, which is responsible for the "rest and digest" response. This directly counters the "fight or flight" response that drives anxiety.

**When to use it:**
- Before stressful situations
- During a panic attack
- When you feel overwhelmed
- As a daily practice to build resilience

**Tips for success:**
- Start with shorter counts (3 seconds) if 4 feels too long
- Focus on the counting to distract from anxious thoughts
- Practice daily for 5-10 minutes to build the habit
- Use visualization - imagine drawing a square as you breathe`
      },
      {
        id: "panic-first-aid",
        title: "Panic Attack First Aid",
        duration: "5 min",
        description: "Essential steps to take during a panic attack",
        content: `Panic attacks can feel overwhelming, but remember: they are not dangerous and they will pass. Here's your step-by-step guide:

**Immediate Steps:**

1. **Recognize it's a panic attack**
   - Remind yourself: "This is anxiety, not danger"
   - You are safe, this will pass

2. **Don't fight it**
   - Resisting makes it worse
   - Accept the feelings without judgment

3. **Focus on breathing**
   - Breathe slowly and deeply
   - Try the 4-7-8 technique: inhale for 4, hold for 7, exhale for 8

4. **Ground yourself**
   - Use the 5-4-3-2-1 technique
   - Focus on physical sensations

5. **Positive self-talk**
   - "I am safe"
   - "This feeling is temporary"
   - "I have survived this before"

**Remember:**
- Panic attacks typically peak within 10 minutes
- They cannot cause physical harm
- Each time you get through one, you build resilience
- It's okay to seek support from others

**After the attack:**
- Be gentle with yourself
- Avoid caffeine and alcohol
- Practice self-care
- Consider what triggered it for future awareness`
      }
    ],
    longTerm: [
      {
        id: "understanding-anxiety",
        title: "Understanding Your Anxiety",
        duration: "8 min",
        description: "Learn what anxiety is and why it happens",
        content: `Anxiety is one of the most common human experiences, and understanding it is the first step to managing it effectively.

**What is Anxiety?**
Anxiety is your body's natural alarm system. It's designed to keep you safe by alerting you to potential threats. The problem arises when this system becomes overactive or responds to situations that aren't actually dangerous.

**The Anxiety Response:**
When you perceive a threat (real or imagined), your body releases stress hormones like adrenaline and cortisol. This triggers:
- Increased heart rate
- Rapid breathing
- Muscle tension
- Heightened alertness

**Types of Anxiety:**
- **Generalized Anxiety:** Persistent worry about everyday situations
- **Panic Disorder:** Sudden, intense episodes of fear
- **Social Anxiety:** Fear of social situations and judgment
- **Phobias:** Intense fear of specific objects or situations

**Why Me?**
Anxiety can be influenced by:
- Genetics (family history)
- Brain chemistry
- Life experiences
- Current stressors
- Medical conditions

**The Good News:**
- Anxiety is highly treatable
- You can learn to manage it effectively
- Many successful people have anxiety
- It doesn't define you or limit your potential

Understanding your anxiety removes the mystery and fear, giving you power over it rather than letting it have power over you.`
      },
      {
        id: "lifestyle-changes",
        title: "Lifestyle Changes for Anxiety",
        duration: "10 min",
        description: "Simple daily habits that reduce anxiety over time",
        content: `Small, consistent lifestyle changes can have a profound impact on your anxiety levels. Here are evidence-based strategies:

**Sleep Hygiene:**
- Aim for 7-9 hours per night
- Keep a consistent sleep schedule
- Avoid screens 1 hour before bed
- Create a calming bedtime routine

**Exercise:**
- Even 10 minutes of walking can help
- Aim for 30 minutes of activity most days
- Try yoga or gentle stretching
- Exercise releases natural mood boosters

**Nutrition:**
- Limit caffeine (can trigger anxiety)
- Reduce alcohol consumption
- Eat regular, balanced meals
- Stay hydrated throughout the day
- Consider reducing sugar intake

**Mindfulness Practices:**
- Start with 5 minutes of meditation daily
- Practice gratitude journaling
- Try progressive muscle relaxation
- Use mindful breathing throughout the day

**Social Connection:**
- Maintain relationships with supportive people
- Don't isolate yourself during difficult times
- Consider joining support groups
- Share your feelings with trusted friends

**Stress Management:**
- Learn to say no to unnecessary commitments
- Practice time management
- Take regular breaks during work
- Engage in hobbies you enjoy

**Environment:**
- Create a calming space at home
- Reduce clutter in your living space
- Spend time in nature when possible
- Limit news consumption if it increases anxiety

Remember: Small changes compound over time. Start with one or two areas and gradually build new habits.`
      },
      {
        id: "cognitive-strategies",
        title: "Changing Anxious Thoughts",
        duration: "12 min",
        description: "Cognitive techniques to challenge and reframe negative thinking",
        content: `Your thoughts have immense power over your emotions. Learning to identify and change anxious thinking patterns is a cornerstone of anxiety management.

**Common Anxious Thinking Patterns:**

1. **Catastrophizing:** Imagining the worst possible outcome
2. **All-or-Nothing:** Seeing things in black and white
3. **Mind Reading:** Assuming you know what others think
4. **Fortune Telling:** Predicting negative future events
5. **Filtering:** Focusing only on negatives while ignoring positives

**The Thought Challenge Process:**

**Step 1: Notice the Thought**
- Pause and identify the specific thought causing anxiety
- Write it down if helpful

**Step 2: Examine the Evidence**
- What evidence supports this thought?
- What evidence contradicts it?
- Am I falling into a thinking trap?

**Step 3: Find a Balanced Perspective**
- What would I tell a friend in this situation?
- What's a more realistic way to look at this?
- What are some alternative explanations?

**Step 4: Take Action**
- What can I actually control in this situation?
- What's one small step I can take?

**Helpful Questions:**
- Is this thought helpful or harmful?
- Am I treating this thought as a fact when it's just an opinion?
- What's the most likely outcome (not the worst case)?
- How important will this be in 5 years?

**Practice Exercise:**
For one week, write down anxious thoughts and practice challenging them using this process. You'll start to see patterns and become more skilled at catching unhelpful thoughts early.

Remember: The goal isn't to eliminate all negative thoughts, but to have a more balanced and realistic perspective.`
      }
    ]
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    setSelectedLesson(null);
  };

  const isCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  if (selectedLesson) {
    const allLessons = [...lessons.shortTerm, ...lessons.longTerm];
    const lesson = allLessons.find(l => l.id === selectedLesson);
    
    if (!lesson) return null;

    return (
      <Card className="bg-gradient-to-br from-accent to-soft-blue border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle>{lesson.title}</CardTitle>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedLesson(null)}
            >
              ← Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              {lesson.duration}
            </Badge>
            {isCompleted(lesson.id) && (
              <Badge className="bg-success-green/20 text-success-green border-success-green/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {lesson.content}
            </div>
          </div>
          
          <Button 
            onClick={() => handleCompleteLesson(lesson.id)}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isCompleted(lesson.id)}
          >
            {isCompleted(lesson.id) ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Lesson Completed
              </>
            ) : (
              "Mark as Complete"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-accent to-soft-blue border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <CardTitle>Learning Library</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="short-term" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="short-term">Quick Relief</TabsTrigger>
            <TabsTrigger value="long-term">Understanding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="short-term" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Short lessons for immediate coping strategies
            </p>
            
            {lessons.shortTerm.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`p-4 bg-background/50 rounded-lg border border-border transition-colors ${
                  isGuest && index > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-background/70 cursor-pointer'
                }`}
                onClick={() => {
                  if (!isGuest || index === 0) {
                    setSelectedLesson(lesson.id);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                      {isCompleted(lesson.id) && (
                        <CheckCircle className="h-4 w-4 text-success-green" />
                      )}
                      {isGuest && index > 0 && (
                        <Badge variant="outline" className="text-xs">Premium</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {lesson.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="long-term" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              In-depth lessons for lasting anxiety management
            </p>
            
            {isGuest ? (
              <div className="text-center p-8 bg-background/50 rounded-lg border border-border">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Unlock Complete Learning Library
                </h4>
                <p className="text-muted-foreground mb-4">
                  Create a free account to access all in-depth lessons and build lasting anxiety management skills.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Sign Up for Free Access
                </Button>
              </div>
            ) : (
              lessons.longTerm.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="p-4 bg-background/50 rounded-lg border border-border hover:bg-background/70 transition-colors cursor-pointer"
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                        {isCompleted(lesson.id) && (
                          <CheckCircle className="h-4 w-4 text-success-green" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {lesson.duration}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-2" />
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LessonsLibrary;