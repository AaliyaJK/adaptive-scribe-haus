
import React, { useState, useEffect } from 'react';
import { 
  Cat, 
  MessageSquare, 
  Heart, 
  Send, 
  XCircle, 
  Maximize2, 
  Minimize2, 
  ChevronUp,
  ChevronDown,
  Sparkles,
  PlusCircle,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Companion = {
  id: string;
  name: string;
  type: string;
  personality: string;
  avatar: string;
  description: string;
};

type Message = {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: Date;
};

const companions: Companion[] = [
  {
    id: 'luna',
    name: 'Luna',
    type: 'Cat',
    personality: 'Calm & Patient',
    avatar: '/placeholder.svg',
    description: 'Luna is a calming presence who helps with stress management and provides gentle guidance.'
  },
  {
    id: 'spark',
    name: 'Spark',
    type: 'Fox',
    personality: 'Energetic & Motivating',
    avatar: '/placeholder.svg',
    description: 'Spark brings energy and motivation when you need a boost to stay engaged with your learning.'
  },
  {
    id: 'echo',
    name: 'Echo',
    type: 'Owl',
    personality: 'Wise & Thoughtful',
    avatar: '/placeholder.svg',
    description: 'Echo offers analytical insights and helps break down complex topics into manageable pieces.'
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'companion',
    text: "Hi there! I'm Luna, your learning companion. How can I help you today?",
    timestamp: new Date()
  }
];

const VirtualCompanion = () => {
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion>(companions[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [companionStatus, setCompanionStatus] = useState({ mood: 'happy', energy: 100 });
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (minimized) setMinimized(false);
  };
  
  const toggleMinimized = () => {
    setMinimized(!minimized);
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
    setNewMessage('');
    
    // Simulate companion response
    setTimeout(() => {
      let responseText = '';
      
      if (newMessage.toLowerCase().includes('help') || newMessage.toLowerCase().includes('stuck')) {
        responseText = `I can see you might be feeling stuck. Remember to break down the problem into smaller parts. Would you like me to suggest a different approach?`;
      } else if (newMessage.toLowerCase().includes('tired') || newMessage.toLowerCase().includes('break')) {
        responseText = `It's important to take breaks! How about a 5-minute mindfulness exercise to refresh your mind?`;
      } else if (newMessage.toLowerCase().includes('anxious') || newMessage.toLowerCase().includes('stressed')) {
        responseText = `I'm here for you. Let's take a deep breath together. Would you like to try a quick calming exercise?`;
      } else {
        responseText = `I'm here to support your learning journey. Is there something specific you'd like help with?`;
      }
      
      const companionMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'companion',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, companionMessage]);
    }, 1000);
  };
  
  const changeCompanion = (companion: Companion) => {
    setSelectedCompanion(companion);
    
    // Reset messages with a greeting from the new companion
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'companion',
        text: `Hi there! I'm ${companion.name}, your learning companion. How can I help you today?`,
        timestamp: new Date()
      }
    ]);
  };
  
  return (
    <div className={`fixed ${minimized ? 'bottom-4 right-4' : 'bottom-0 right-4'} z-40 transition-all duration-300 ${expanded ? 'w-80 md:w-96' : 'w-72'}`}>
      {/* Companion Chat Interface */}
      <Card className={`shadow-soft-lg border-border overflow-hidden ${minimized ? 'h-auto' : expanded ? 'h-[600px]' : 'h-[400px]'}`}>
        {!minimized && (
          <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedCompanion.avatar} alt={selectedCompanion.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {selectedCompanion.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium">{selectedCompanion.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedCompanion.personality}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
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
            className="w-full py-2 px-4 h-auto rounded-lg flex items-center justify-between bg-primary text-primary-foreground"
          >
            <div className="flex items-center">
              <Cat className="h-5 w-5 mr-2" />
              <span>{selectedCompanion.name}</span>
            </div>
            <ChevronUp className="h-4 w-4" />
          </Button>
        ) : (
          <>
            <CardContent className={`p-0 flex-grow overflow-hidden ${expanded ? 'h-[calc(600px-126px)]' : 'h-[calc(400px-126px)]'}`}>
              <Tabs defaultValue="chat">
                <TabsList className="w-full grid grid-cols-3 h-10 bg-secondary/50">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="companions">Companions</TabsTrigger>
                  <TabsTrigger value="mood">Mood</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="m-0">
                  <div className="h-[calc(100%-2.5rem)] flex flex-col bg-secondary/30">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-3 border-t bg-card">
                      <div className="flex space-x-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="input-field"
                        />
                        <Button 
                          type="submit" 
                          size="icon" 
                          className="bg-primary text-primary-foreground h-10 w-10"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
                
                <TabsContent value="companions" className="m-0">
                  <div className="h-[calc(100%-2.5rem)] overflow-y-auto p-4 space-y-4 bg-secondary/30">
                    {companions.map((companion) => (
                      <div 
                        key={companion.id}
                        onClick={() => changeCompanion(companion)}
                        className={`p-3 rounded-lg cursor-pointer transition-all 
                          ${selectedCompanion.id === companion.id 
                            ? 'bg-primary/10 border border-primary/30' 
                            : 'bg-white border border-border hover:border-primary/20'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={companion.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {companion.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{companion.name}</h4>
                            <p className="text-xs text-muted-foreground">{companion.personality}</p>
                          </div>
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground">
                          {companion.description}
                        </p>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-2">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Customize Companion
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="mood" className="m-0">
                  <div className="h-[calc(100%-2.5rem)] p-4 flex flex-col items-center justify-center bg-secondary/30">
                    <div className="text-center">
                      <div className="relative h-32 w-32 mx-auto mb-4">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={selectedCompanion.avatar} />
                          <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                            {selectedCompanion.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-1">{selectedCompanion.name} is {companionStatus.mood}</h3>
                      <p className="text-sm text-muted-foreground mb-6">Energy level: {companionStatus.energy}%</p>
                      
                      <div className="space-y-4 text-center">
                        <Button className="w-full">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Play with {selectedCompanion.name}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Image className="h-4 w-4 mr-2" />
                          Customize Appearance
                        </Button>
                      </div>
                    </div>
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
