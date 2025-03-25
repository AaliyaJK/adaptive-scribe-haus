
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cat, 
  Dog,
  Rabbit,
  MessageSquare, 
  Heart, 
  Send, 
  Maximize2, 
  Minimize2, 
  ChevronUp,
  ChevronDown,
  Sparkles,
  Volume,
  Mic,
  Gift,
  Hand
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

type Companion = {
  id: string;
  name: string;
  type: 'cat' | 'dog' | 'rabbit';
  personality: string;
  color: string;
  description: string;
  sounds: string[];
  actions: string[];
};

type Message = {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: Date;
};

type SoundMap = {
  [key: string]: {
    cat: string;
    dog: string;
    rabbit: string;
  }
};

const companions: Companion[] = [
  {
    id: 'luna',
    name: 'Luna',
    type: 'cat',
    personality: 'Calm & Patient',
    color: 'purple',
    description: 'Luna is a calming presence who helps with stress management and provides gentle guidance.',
    sounds: ['meow', 'purr', 'hiss'],
    actions: ['pet', 'play', 'feed', 'sleep']
  },
  {
    id: 'buddy',
    name: 'Buddy',
    type: 'dog',
    personality: 'Energetic & Motivating',
    color: 'orange',
    description: 'Buddy brings energy and motivation when you need a boost to stay engaged with your learning.',
    sounds: ['woof', 'bark', 'pant'],
    actions: ['pet', 'play', 'feed', 'sleep']
  },
  {
    id: 'milo',
    name: 'Milo',
    type: 'rabbit',
    personality: 'Wise & Thoughtful',
    color: 'green',
    description: 'Milo offers analytical insights and helps break down complex topics into manageable pieces.',
    sounds: ['squeak', 'nibble', 'thump'],
    actions: ['pet', 'play', 'feed', 'sleep']
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'companion',
    text: "Hi there! I'm Luna. Touch me, talk to me, or give me treats! I'm here to keep you company!",
    timestamp: new Date()
  }
];

// Sound file mapping
const soundFiles: SoundMap = {
  pet: {
    cat: "/sounds/cat-purr.mp3",
    dog: "/sounds/dog-pant.mp3",
    rabbit: "/sounds/rabbit-nibble.mp3"
  },
  happy: {
    cat: "/sounds/cat-meow-happy.mp3",
    dog: "/sounds/dog-happy.mp3",
    rabbit: "/sounds/rabbit-happy.mp3"
  },
  play: {
    cat: "/sounds/cat-play.mp3",
    dog: "/sounds/dog-play.mp3",
    rabbit: "/sounds/rabbit-hop.mp3"
  },
  eat: {
    cat: "/sounds/cat-eating.mp3",
    dog: "/sounds/dog-eating.mp3",
    rabbit: "/sounds/rabbit-eating.mp3"
  },
  message: {
    cat: "/sounds/cat-short-meow.mp3",
    dog: "/sounds/dog-bark-short.mp3",
    rabbit: "/sounds/rabbit-squeak.mp3"
  },
  excited: {
    cat: "/sounds/cat-excited.mp3",
    dog: "/sounds/dog-excited.mp3",
    rabbit: "/sounds/rabbit-excited.mp3"
  }
};

const VirtualCompanion = () => {
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion>(companions[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [action, setAction] = useState<string | null>(null);
  const [happiness, setHappiness] = useState(70);
  const [energy, setEnergy] = useState(80);
  const [repeating, setRepeating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const companionRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element on component mount
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (minimized) setMinimized(false);
  };
  
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add random idle animations
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (!action && Math.random() > 0.7) {
        const idleActions = ['blink', 'look', 'sniff'];
        const randomIdle = idleActions[Math.floor(Math.random() * idleActions.length)];
        setAction(randomIdle);
        setTimeout(() => setAction(null), 1000);
      }
    }, 3000);
    
    return () => clearInterval(idleInterval);
  }, [action]);

  // Play sound function
  const playSound = (type: string) => {
    if (!soundEnabled || !audioRef.current) return;
    
    const soundCategory = soundFiles[type] || soundFiles.happy; // Default to happy sounds
    const soundUrl = soundCategory[selectedCompanion.type];
    
    try {
      if (soundUrl) {
        console.log(`Playing ${type} sound`);
        audioRef.current.src = soundUrl;
        audioRef.current.volume = 0.7; // 70% volume by default
        audioRef.current.play().catch(err => {
          console.warn("Audio playback was prevented:", err);
          // Show fallback toast for browsers that block autoplay
          toast({
            title: `${selectedCompanion.name} says:`,
            description: type === 'happy' 
              ? (selectedCompanion.type === 'cat' ? "Purrrr!" : selectedCompanion.type === 'dog' ? "Woof woof!" : "Squeak!") 
              : selectedCompanion.sounds[Math.floor(Math.random() * selectedCompanion.sounds.length)] + "!",
            duration: 1500,
          });
        });
      }
    } catch (error) {
      console.error("Error playing sound:", error);
      
      // Fallback to toast
      toast({
        title: `${selectedCompanion.name} says:`,
        description: type === 'happy' 
          ? (selectedCompanion.type === 'cat' ? "Purrrr!" : selectedCompanion.type === 'dog' ? "Woof woof!" : "Squeak!") 
          : selectedCompanion.sounds[Math.floor(Math.random() * selectedCompanion.sounds.length)] + "!",
        duration: 1500,
      });
    }
  };

  // Pet the companion
  const handlePet = () => {
    if (action) return; // Don't interrupt current action
    
    setAction('happy');
    playSound('pet');
    setHappiness(prev => Math.min(prev + 10, 100));
    
    // Return to idle after animation
    setTimeout(() => {
      setAction(null);
      
      // Sometimes respond with a message
      if (Math.random() > 0.5) {
        const responses = [
          "Purrrr! That feels nice!",
          "I love when you pet me!",
          "You're so kind! I feel better already!",
          "Ahh, that's the spot!",
          "We're friends now! How can I help you?"
        ];
        
        addCompanionMessage(responses[Math.floor(Math.random() * responses.length)]);
      }
    }, 2000);
  };

  // Play with companion
  const handlePlay = () => {
    if (action) return; // Don't interrupt current action
    
    setAction('play');
    playSound('play');
    setHappiness(prev => Math.min(prev + 15, 100));
    setEnergy(prev => Math.max(prev - 10, 20));
    
    // Return to idle after animation
    setTimeout(() => {
      setAction(null);
      addCompanionMessage("That was fun! Let's play again later!");
    }, 3000);
  };

  // Feed the companion
  const handleFeed = () => {
    if (action) return; // Don't interrupt current action
    
    setAction('eat');
    playSound('eat');
    setEnergy(prev => Math.min(prev + 20, 100));
    
    // Return to idle after animation
    setTimeout(() => {
      setAction(null);
      addCompanionMessage("Yum! Thank you for the treat!");
    }, 2500);
  };

  // Make companion repeat what user says
  const handleRepeat = () => {
    setRepeating(!repeating);
    
    if (!repeating) {
      toast({
        title: "Echo Mode On",
        description: `${selectedCompanion.name} will repeat what you say!`,
        duration: 2000,
      });
    } else {
      toast({
        title: "Echo Mode Off",
        description: `${selectedCompanion.name} won't repeat you anymore.`,
        duration: 2000,
      });
    }
  };

  // Toggle sound effects
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast({
      title: soundEnabled ? "Sounds Disabled" : "Sounds Enabled",
      description: soundEnabled ? "Companion sounds have been turned off." : "Companion sounds have been turned on.",
      duration: 2000,
    });
  };

  // Add a message from the companion
  const addCompanionMessage = (text: string) => {
    setIsSpeaking(true);
    setAction('talk');
    playSound('message');
    
    // Add the message
    const companionMessage: Message = {
      id: Date.now().toString(),
      sender: 'companion',
      text: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, companionMessage]);
    
    // Stop speaking after a moment
    setTimeout(() => {
      setIsSpeaking(false);
      setAction(null);
    }, 2000);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Store message content before clearing input
    const messageContent = newMessage;
    setNewMessage('');
    
    // Respond differently based on message content
    setTimeout(() => {
      // If in repeat mode, just echo back
      if (repeating) {
        addCompanionMessage(messageContent);
        return;
      }
      
      // Check for specific keywords
      const lowerMessage = messageContent.toLowerCase();
      
      if (lowerMessage.includes('pet') || lowerMessage.includes('stroke') || lowerMessage.includes('touch')) {
        handlePet();
      } else if (lowerMessage.includes('play') || lowerMessage.includes('game') || lowerMessage.includes('fun')) {
        handlePlay();
      } else if (lowerMessage.includes('food') || lowerMessage.includes('treat') || lowerMessage.includes('hungry')) {
        handleFeed();
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi') {
        addCompanionMessage(`Hi there! I'm ${selectedCompanion.name}! How are you feeling today?`);
      } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
        addCompanionMessage("It's important to take breaks! How about a short meditation or a walk?");
      } else if (lowerMessage.includes('sad') || lowerMessage.includes('upset') || lowerMessage.includes('unhappy')) {
        addCompanionMessage("I'm sorry you're feeling down. Would petting me help? It releases oxytocin - the feel-good hormone!");
        handlePet();
      } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
        addCompanionMessage("That's wonderful to hear! Your positive energy makes me happy too!");
        playSound('happy');
      } else if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
        addCompanionMessage("I'm here to help! Try breaking your problem into smaller steps. What's the first tiny part you could solve?");
      } else if (lowerMessage.includes('thank')) {
        addCompanionMessage("You're very welcome! I'm always here for you!");
        playSound('happy');
      } else {
        // Generic responses
        const genericResponses = [
          `I'm here for you! Want to play a game or just chat?`,
          `Remember to take care of yourself today. How about a quick break?`,
          `I enjoy our conversations! What would you like to talk about?`,
          `Pet therapy is great for reducing stress. Try giving me a pet!`,
          `Did you know that interacting with pets can lower blood pressure? How are you feeling?`
        ];
        
        addCompanionMessage(genericResponses[Math.floor(Math.random() * genericResponses.length)]);
      }
    }, 1000);
  };
  
  const toggleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // In a real implementation, this would start voice recording
      toast({
        title: "Voice Input",
        description: "Voice recognition started (simulation)",
        duration: 3000,
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        const simulatedPhrases = [
          "I'm feeling a bit tired today",
          "Can you help me with something?",
          "Hello, how are you?",
          "I'd like to play a game",
          "I need some motivation"
        ];
        
        setNewMessage(simulatedPhrases[Math.floor(Math.random() * simulatedPhrases.length)]);
        
        toast({
          title: "Voice Input Complete",
          description: "Message transcribed",
          duration: 2000,
        });
      }, 3000);
    } else {
      // Stop recording
      toast({
        title: "Voice Input",
        description: "Voice recognition stopped",
        duration: 2000,
      });
    }
  };
  
  const changeCompanion = (companion: Companion) => {
    setSelectedCompanion(companion);
    
    // Reset companion state
    setAction(null);
    setHappiness(70);
    setEnergy(80);
    setRepeating(false);
    
    // Welcome message
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'companion',
        text: `Hi there! I'm ${companion.name}. Touch me, talk to me, or give me treats! I'm here to keep you company!`,
        timestamp: new Date()
      }
    ]);
    
    // Show toast
    toast({
      title: `${companion.name} is here!`,
      description: companion.description,
      duration: 3000,
    });
    
    // Play greeting sound
    playSound('happy');
  };
  
  // Get the companion icon based on type
  const getCompanionIcon = () => {
    switch (selectedCompanion.type) {
      case 'cat':
        return <Cat className="h-full w-full" />;
      case 'dog':
        return <Dog className="h-full w-full" />;
      case 'rabbit':
        return <Rabbit className="h-full w-full" />;
      default:
        return <Cat className="h-full w-full" />;
    }
  };
  
  // Get color classes based on companion
  const getCompanionColorClasses = () => {
    switch (selectedCompanion.color) {
      case 'purple':
        return {
          bg: "bg-gradient-to-br from-purple-100 to-indigo-100",
          header: "bg-gradient-to-r from-purple-200 to-indigo-200",
          primary: "from-purple-500 to-indigo-600",
          secondary: "from-purple-200 to-indigo-300"
        };
      case 'orange':
        return {
          bg: "bg-gradient-to-br from-orange-100 to-amber-100",
          header: "bg-gradient-to-r from-orange-200 to-amber-200",
          primary: "from-orange-500 to-amber-600",
          secondary: "from-orange-200 to-amber-300"
        };
      case 'green':
        return {
          bg: "bg-gradient-to-br from-green-100 to-teal-100",
          header: "bg-gradient-to-r from-green-200 to-teal-200",
          primary: "from-green-500 to-teal-600",
          secondary: "from-green-200 to-teal-300"
        };
      default:
        return {
          bg: "bg-gradient-to-br from-blue-100 to-indigo-100",
          header: "bg-gradient-to-r from-blue-200 to-indigo-200",
          primary: "from-blue-500 to-indigo-600",
          secondary: "from-blue-200 to-indigo-300"
        };
    }
  };
  
  const colorClasses = getCompanionColorClasses();
  
  return (
    <div className={`fixed ${minimized ? 'bottom-4 right-4' : 'bottom-0 right-4'} z-40 transition-all duration-300 ${expanded ? 'w-80 md:w-96' : 'w-72'} drop-shadow-xl`}>
      {/* Companion Chat Interface */}
      <Card className={`shadow-2xl border-2 overflow-hidden rounded-xl ${colorClasses.bg} border-${selectedCompanion.color}-200 ${minimized ? 'h-auto' : expanded ? 'h-[600px]' : 'h-[500px]'}`}>
        {!minimized && (
          <CardHeader className={`py-3 px-4 border-b flex flex-row items-center justify-between space-y-0 ${colorClasses.header}`}>
            <div className="flex items-center space-x-2">
              <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${colorClasses.primary} flex items-center justify-center text-white`}>
                {selectedCompanion.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-medium">{selectedCompanion.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedCompanion.personality}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSound} 
                className="h-7 w-7"
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? (
                  <Volume className="h-4 w-4" />
                ) : (
                  <Volume className="h-4 w-4 text-muted-foreground opacity-50" />
                )}
              </Button>
              {expanded ? (
                <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-7 w-7">
                  <Minimize2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-7 w-7">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-7 w-7">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        )}
        
        {minimized ? (
          <Button 
            onClick={toggleMinimized} 
            className={`w-full py-2 px-4 h-auto rounded-lg flex items-center justify-between bg-gradient-to-r ${colorClasses.primary} text-white`}
          >
            <div className="flex items-center">
              {selectedCompanion.type === 'cat' && <Cat className="h-5 w-5 mr-2" />}
              {selectedCompanion.type === 'dog' && <Dog className="h-5 w-5 mr-2" />}
              {selectedCompanion.type === 'rabbit' && <Rabbit className="h-5 w-5 mr-2" />}
              <span>{selectedCompanion.name}</span>
            </div>
            <ChevronUp className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <CardContent className={`p-0 flex-grow overflow-hidden ${expanded ? 'h-[calc(600px-56px)]' : 'h-[calc(500px-56px)]'}`}>
              <Tabs defaultValue="pet">
                <TabsList className={`w-full grid grid-cols-3 h-10 bg-gradient-to-r ${colorClasses.secondary}`}>
                  <TabsTrigger value="pet">Pet</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="companions">Friends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pet" className="m-0 h-full">
                  <div className="flex flex-col h-full">
                    {/* Main Pet Interface - Like Talking Tom */}
                    <div 
                      className="flex-grow relative flex flex-col justify-center items-center bg-gradient-to-b from-transparent via-transparent to-white/30 cursor-pointer"
                      onClick={handlePet}
                    >
                      {/* Pet Character */}
                      <div 
                        ref={companionRef}
                        className={`relative w-40 h-40 transition-all duration-300 select-none
                          ${action === 'happy' ? 'animate-bounce' : ''}
                          ${action === 'talk' ? 'animate-pulse' : ''}
                          ${action === 'play' ? 'animate-spin' : ''}
                          ${action === 'eat' ? 'animate-pulse scale-110' : ''}
                          ${action === 'blink' ? 'opacity-90' : ''}
                          ${action === 'look' ? 'translate-x-2' : ''}
                          ${action === 'sniff' ? 'translate-y-1' : ''}
                        `}
                      >
                        {/* Pet Background */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorClasses.primary} opacity-20`} />
                        
                        {/* Pet Icon */}
                        <div className={`absolute inset-0 flex items-center justify-center text-${selectedCompanion.color}-600 transition-all transform ${isSpeaking ? 'scale-105' : ''}`}>
                          {getCompanionIcon()}
                        </div>
                        
                        {/* Visual speaking indicator */}
                        {isSpeaking && (
                          <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-1.5 shadow-md animate-pulse">
                            <Volume className={`h-5 w-5 text-${selectedCompanion.color}-500`} />
                          </div>
                        )}
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-2">
                        {/* Happiness Level */}
                        <div className="flex items-center space-x-2 bg-white/50 rounded-full px-3 py-1 text-xs shadow-sm">
                          <Heart className={`h-3 w-3 ${happiness > 70 ? 'text-pink-500 fill-pink-500' : 'text-pink-300'}`} />
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500 transition-all duration-500"
                              style={{ width: `${happiness}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Energy Level */}
                        <div className="flex items-center space-x-2 bg-white/50 rounded-full px-3 py-1 text-xs shadow-sm">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-500 transition-all duration-500" 
                              style={{ width: `${energy}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Mood Bubble */}
                      {action && (
                        <div className={`absolute top-6 right-6 bg-white rounded-lg px-3 py-1.5 shadow-lg animate-fade-in`}>
                          <p className="text-sm font-medium">
                            {action === 'happy' && '😊 Happy!'}
                            {action === 'talk' && '💬 Talking...'}
                            {action === 'play' && '🎮 Playing!'}
                            {action === 'eat' && '🍪 Eating!'}
                            {action === 'blink' && '👁️ ...'}
                            {action === 'look' && '👀 ...'}
                            {action === 'sniff' && '👃 ...'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Pet Interaction Buttons */}
                    <div className="h-20 border-t flex items-center justify-around p-2 border-t-white/50 bg-white/30">
                      <Button
                        onClick={handlePet}
                        className={`h-14 w-14 rounded-full bg-gradient-to-br ${colorClasses.primary} text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex flex-col items-center justify-center`}
                      >
                        <Hand className="h-5 w-5 mb-0.5" />
                        <span className="text-[10px]">Pet</span>
                      </Button>
                      
                      <Button
                        onClick={handlePlay}
                        className={`h-14 w-14 rounded-full bg-gradient-to-br ${colorClasses.primary} text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex flex-col items-center justify-center`}
                      >
                        <Sparkles className="h-5 w-5 mb-0.5" />
                        <span className="text-[10px]">Play</span>
                      </Button>
                      
                      <Button
                        onClick={handleFeed}
                        className={`h-14 w-14 rounded-full bg-gradient-to-br ${colorClasses.primary} text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex flex-col items-center justify-center`}
                      >
                        <Gift className="h-5 w-5 mb-0.5" />
                        <span className="text-[10px]">Treat</span>
                      </Button>
                      
                      <Button
                        onClick={handleRepeat}
                        className={`h-14 w-14 rounded-full ${repeating ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'} text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex flex-col items-center justify-center`}
                      >
                        <Volume className="h-5 w-5 mb-0.5" />
                        <span className="text-[10px]">Echo</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="chat" className="m-0 h-full">
                  <div className="h-full flex flex-col">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                              message.sender === 'user' 
                                ? `bg-gradient-to-r ${colorClasses.primary} text-white` 
                                : 'bg-white'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-3 border-t bg-white/50">
                      <div className="flex space-x-2">
                        <Button 
                          type="button" 
                          size="icon" 
                          variant={isRecording ? "destructive" : "outline"}
                          onClick={toggleVoiceInput}
                          className="h-10 w-10 rounded-full"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="input-field rounded-full bg-white/80"
                        />
                        <Button 
                          type="submit" 
                          size="icon" 
                          className={`bg-gradient-to-r ${colorClasses.primary} text-white h-10 w-10 rounded-full`}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
                
                <TabsContent value="companions" className="m-0 h-full">
                  <div className="h-full overflow-y-auto p-4 space-y-4">
                    {companions.map((companion) => (
                      <div 
                        key={companion.id}
                        onClick={() => changeCompanion(companion)}
                        className={`p-3 rounded-xl cursor-pointer transition-all hover:shadow-md
                          ${selectedCompanion.id === companion.id 
                            ? `bg-${companion.color}-100 border-2 border-${companion.color}-300` 
                            : 'bg-white/80 border border-white hover:bg-white'
                          }`}
                      >
                        <div className="flex items-center">
                          <div className={`h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-${companion.color}-200 to-${companion.color}-100 text-${companion.color}-600 mr-3`}>
                            {companion.type === 'cat' && <Cat className="h-10 w-10" />}
                            {companion.type === 'dog' && <Dog className="h-10 w-10" />}
                            {companion.type === 'rabbit' && <Rabbit className="h-10 w-10" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">{companion.name}</h4>
                            <p className="text-xs text-muted-foreground">{companion.personality}</p>
                            <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                              {companion.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default VirtualCompanion;

