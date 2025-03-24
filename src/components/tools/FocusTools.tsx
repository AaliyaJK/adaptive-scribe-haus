
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  VolumeX, 
  Volume1, 
  Volume2, 
  BrainCircuit, 
  CheckCircle2,
  Sparkles,
  CloudRain,
  Wind,
  Coffee,
  Waves,
  Music,
  Birds
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type SoundOption = {
  id: string;
  name: string;
  icon: JSX.Element;
};

const soundOptions: SoundOption[] = [
  { id: 'rain', name: 'Rain', icon: <CloudRain className="h-5 w-5" /> },
  { id: 'whitenoise', name: 'White Noise', icon: <Wind className="h-5 w-5" /> },
  { id: 'cafe', name: 'Café', icon: <Coffee className="h-5 w-5" /> },
  { id: 'waves', name: 'Ocean Waves', icon: <Waves className="h-5 w-5" /> },
  { id: 'lofi', name: 'Lo-Fi Music', icon: <Music className="h-5 w-5" /> },
  { id: 'nature', name: 'Nature', icon: <Birds className="h-5 w-5" /> },
];

const FocusTools = () => {
  // Pomodoro Timer State
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [timerType, setTimerType] = useState<'work' | 'break'>('work');
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  
  // Sound Environment State
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  
  // Mindfulness State
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [breathingActive, setBreathingActive] = useState(false);
  
  // Timer functions
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && !isPaused) {
      interval = window.setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            // Time is up
            clearInterval(interval!);
            const nextTimerType = timerType === 'work' ? 'break' : 'work';
            const nextTime = nextTimerType === 'work' ? workTime * 60 : breakTime * 60;
            
            setTimerType(nextTimerType);
            setIsPaused(true);
            return nextTime;
          }
          return time - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timerType, workTime, breakTime]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(workTime * 60);
    setTimerType('work');
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Sound functions
  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
    }
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0]);
    if (newValue[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Breathing exercise functions
  const toggleBreathingExercise = () => {
    if (breathingActive) {
      setBreathingActive(false);
      setBreathingPhase('inhale');
    } else {
      setBreathingActive(true);
      startBreathingCycle();
    }
  };
  
  const startBreathingCycle = () => {
    // Simple 4-7-8 breathing technique
    // 4 seconds inhale, 7 seconds hold, 8 seconds exhale, 1 second rest
    setBreathingPhase('inhale');
    setTimeout(() => {
      if (!breathingActive) return;
      setBreathingPhase('hold');
      setTimeout(() => {
        if (!breathingActive) return;
        setBreathingPhase('exhale');
        setTimeout(() => {
          if (!breathingActive) return;
          setBreathingPhase('rest');
          setTimeout(() => {
            if (breathingActive) {
              startBreathingCycle();
            }
          }, 1000); // Rest for 1 second
        }, 8000); // Exhale for 8 seconds
      }, 7000); // Hold for 7 seconds
    }, 4000); // Inhale for 4 seconds
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="pomodoro">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="pomodoro">Pomodoro Timer</TabsTrigger>
          <TabsTrigger value="sounds">Sound Environment</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pomodoro">
          <Card className="shadow-soft border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">{timerType === 'work' ? 'Work Time' : 'Break Time'}</CardTitle>
              <CardDescription>
                Focus for {workTime} minutes, then take a {breakTime} minute break
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 rounded-full bg-primary/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-medium">{formatTime(time)}</span>
                </div>
                {/* Progress Circle - simplified version */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-secondary stroke-current"
                    strokeWidth="4"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary stroke-current transition-all duration-1000 ease-in-out"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                    strokeDasharray="289.02652413026095"
                    strokeDashoffset={289.02652413026095 * (1 - time / (timerType === 'work' ? workTime * 60 : breakTime * 60))}
                  />
                </svg>
              </div>
              
              <div className="flex gap-4">
                {isPaused ? (
                  <Button 
                    className="bg-primary text-primary-foreground h-12 w-12 rounded-full" 
                    onClick={isActive ? handlePauseResume : handleStart}
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button 
                    className="bg-primary text-primary-foreground h-12 w-12 rounded-full" 
                    onClick={handlePauseResume}
                  >
                    <Pause className="h-5 w-5" />
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="h-12 w-12 rounded-full"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full max-w-xs mt-8">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm">Work Time</Label>
                    <span className="text-sm font-medium">{workTime} min</span>
                  </div>
                  <Slider
                    value={[workTime]}
                    min={5}
                    max={60}
                    step={5}
                    onValueChange={(value) => setWorkTime(value[0])}
                    disabled={isActive && !isPaused}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm">Break Time</Label>
                    <span className="text-sm font-medium">{breakTime} min</span>
                  </div>
                  <Slider
                    value={[breakTime]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setBreakTime(value[0])}
                    disabled={isActive && !isPaused}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="flex items-center space-x-2">
                <Switch id="autostart" />
                <Label htmlFor="autostart">Auto-start next session</Label>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sounds">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Sound Environment</CardTitle>
              <CardDescription>
                Create your perfect audio atmosphere for focus and concentration
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {soundOptions.map((sound) => (
                  <Button
                    key={sound.id}
                    variant={activeSound === sound.id ? "default" : "outline"}
                    className={`h-auto py-3 flex flex-col items-center gap-2 ${
                      activeSound === sound.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-primary/5'
                    }`}
                    onClick={() => toggleSound(sound.id)}
                  >
                    {sound.icon}
                    <span className="text-sm">{sound.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Volume</Label>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleMute} 
                      className="h-8 w-8"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : volume < 50 ? (
                        <Volume1 className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Mixer Settings</Label>
                    <Switch id="advanced" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enable advanced mixer to combine multiple sounds
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Save Preset</Button>
              <Button variant="default" disabled={!activeSound}>
                Play
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="mindfulness">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Mindfulness Exercises</CardTitle>
              <CardDescription>
                Take a moment to calm your mind and improve focus
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                {breathingActive ? (
                  <div className="text-center space-y-6">
                    <div className="relative w-40 h-40 mx-auto">
                      <div 
                        className={`absolute inset-0 bg-primary/10 rounded-full transition-all duration-1000 ease-in-out ${
                          breathingPhase === 'inhale' 
                            ? 'scale-100' 
                            : breathingPhase === 'hold' 
                              ? 'scale-110' 
                              : breathingPhase === 'exhale' 
                                ? 'scale-90' 
                                : 'scale-100'
                        }`}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BrainCircuit className={`h-16 w-16 text-primary transition-all duration-700 ease-in-out ${
                          breathingPhase === 'inhale' 
                            ? 'opacity-100 scale-110' 
                            : breathingPhase === 'hold' 
                              ? 'opacity-80 scale-100' 
                              : 'opacity-60 scale-90'
                        }`} />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium">{
                      breathingPhase === 'inhale' 
                        ? 'Inhale...' 
                        : breathingPhase === 'hold' 
                          ? 'Hold...' 
                          : breathingPhase === 'exhale' 
                            ? 'Exhale...' 
                            : 'Rest...'
                    }</h3>
                    
                    <Button onClick={toggleBreathingExercise} variant="outline">
                      Stop Exercise
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-8">
                    <Sparkles className="h-16 w-16 text-primary mx-auto" />
                    <div>
                      <h3 className="text-xl font-medium mb-2">4-7-8 Breathing Technique</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        A simple breathing exercise to reduce anxiety, help with focus, and calm your mind.
                      </p>
                      <ol className="text-sm text-muted-foreground space-y-2 mb-8 text-left max-w-xs mx-auto">
                        <li className="flex items-start">
                          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                          <span>Inhale quietly through your nose for 4 seconds</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                          <span>Hold your breath for 7 seconds</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                          <span>Exhale completely through your mouth for 8 seconds</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                          <span>Repeat the cycle 3-4 times</span>
                        </li>
                      </ol>
                      <Button onClick={toggleBreathingExercise} className="btn-primary">
                        Start Breathing Exercise
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="justify-center border-t pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-1" />
                    <span>Reduces stress</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-1" />
                    <span>Improves focus</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary mr-1" />
                    <span>Calms the mind</span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FocusTools;
