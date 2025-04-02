import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  FileText, 
  Check, 
  Wand2, 
  Sparkles,
  LoaderCircle,
  RefreshCw,
  Clipboard,
  CopyCheck,
  ScanText,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { processTextWithGemini, TextCorrection } from '@/utils/geminiApi';

const WritingAssistance = () => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState('');
  const [corrections, setCorrections] = useState<TextCorrection[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Web Speech API
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  // Settings
  const [settings, setSettings] = useState({
    spellCheck: true,
    grammarCheck: true,
    simplifyText: true,
    dyslexiaFont: false,
    highContrast: false,
    useAI: true,
  });
  
  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setText((prev) => {
          // Only replace text if we're starting fresh, otherwise append
          if (prev.trim() === '') {
            return transcript;
          } else {
            // Find the last sentence ending to avoid cutting off words
            const lastSentenceIndex = Math.max(
              prev.lastIndexOf('.'), 
              prev.lastIndexOf('!'), 
              prev.lastIndexOf('?')
            );
            
            // If no sentence ending found, just keep everything
            if (lastSentenceIndex === -1) {
              return transcript;
            }
            
            // Keep everything up to the last sentence ending, then add the new transcript
            return prev.substring(0, lastSentenceIndex + 1) + ' ' + transcript;
          }
        });
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);
  
  // Reset the copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  
  const toggleRecording = () => {
    if (!recognition) {
      toast({
        title: "Feature Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const startRecording = () => {
    try {
      recognition?.start();
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Start speaking clearly into your microphone.",
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast({
        title: "Could not start recording",
        description: "There was an error starting the speech recognition.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    try {
      recognition?.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Speech-to-text conversion complete.",
      });
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };
  
  const processText = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      if (settings.useAI) {
        // Use Gemini API
        const result = await processTextWithGemini(text);
        
        if (result.error) {
          setError(result.error);
          toast({
            title: "AI Processing Error",
            description: result.error,
            variant: "destructive"
          });
        } else {
          setCorrections(result.corrections);
          setSimplifiedText(result.simplifiedText);
          
          if (result.corrections.length > 0) {
            setActiveTab('corrections');
            toast({
              title: "Analysis Complete",
              description: `Found ${result.corrections.length} suggestions for improvement.`,
            });
          } else {
            toast({
              title: "Analysis Complete",
              description: "No corrections needed. Your text looks good!",
            });
          }
        }
      } else {
        // Simulate processing with fake data (as in the original implementation)
        setTimeout(() => {
          // Simulate spell check and grammar corrections
          setCorrections([
            {
              original: "speach-to-text",
              corrected: "speech-to-text",
              explanation: "The correct spelling is 'speech' rather than 'speach'."
            },
            {
              original: "erors",
              corrected: "errors",
              explanation: "The correct spelling is 'errors' with double 'r'."
            },
            {
              original: "gramatical",
              corrected: "grammatical",
              explanation: "The correct spelling is 'grammatical' with double 'm'."
            }
          ]);
          
          // Simulate simplified text
          setSimplifiedText(text);
          
          setActiveTab('corrections');
        }, 1500);
      }
    } catch (error) {
      console.error('Error processing text:', error);
      setError(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
      toast({
        title: "Error",
        description: "An unexpected error occurred while processing your text.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const applyCorrections = () => {
    let processedText = text;
    
    corrections.forEach(correction => {
      processedText = processedText.replace(correction.original, correction.corrected);
    });
    
    setText(processedText);
    setCorrections([]);
    setActiveTab('write');
    
    toast({
      title: "Corrections Applied",
      description: "All suggested corrections have been applied to your text.",
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(simplifiedText || text);
    setCopied(true);
    
    toast({
      title: "Copied to Clipboard",
      description: "Text has been copied to your clipboard.",
    });
  };
  
  const resetText = () => {
    setText('');
    setSimplifiedText('');
    setCorrections([]);
    setError(null);
    
    toast({
      title: "Reset Complete",
      description: "All text and corrections have been cleared.",
    });
  };
  
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Setting Updated",
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1')} has been ${settings[setting] ? 'disabled' : 'enabled'}.`,
    });
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="write">Write & Edit</TabsTrigger>
          <TabsTrigger value="corrections" disabled={!corrections.length && !isProcessing}>
            Corrections {corrections.length > 0 && `(${corrections.length})`}
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">
                <span className="flex items-center">
                  <Sparkles className="h-6 w-6 text-primary mr-2" />
                  AI Writing Assistant
                </span>
              </CardTitle>
              <CardDescription>
                {settings.useAI 
                  ? "Get AI-powered help with writing, spelling, and grammar using Google's Gemini API"
                  : "Get real-time help with writing, spelling, and grammar"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="relative">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or use speech-to-text..."
                    className={`min-h-[200px] p-4 text-base ${settings.dyslexiaFont ? 'font-mono' : ''} ${settings.highContrast ? 'bg-white text-black' : ''}`}
                  />
                  
                  <div className="absolute bottom-3 right-3 flex space-x-2">
                    <Button
                      size="icon"
                      variant={isRecording ? "destructive" : "secondary"}
                      onClick={toggleRecording}
                      className="h-8 w-8 rounded-full"
                    >
                      {isRecording ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {isRecording && (
                  <div className="flex items-center justify-center py-2 px-3 bg-primary/10 text-primary text-sm rounded-md animate-pulse">
                    <Mic className="h-4 w-4 mr-2" />
                    <span>Listening...</span>
                  </div>
                )}
                
                {simplifiedText && (
                  <div className="border rounded-lg p-4 bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm font-medium">
                        <Wand2 className="h-4 w-4 mr-1 text-primary" />
                        <span>AI Improved Version</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <CopyCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Clipboard className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className={`text-sm ${settings.dyslexiaFont ? 'font-mono' : ''} ${settings.highContrast ? 'text-black' : ''}`}>
                      {simplifiedText}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between space-x-2 border-t pt-6">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={resetText} disabled={!text}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!text}>
                  {copied ? (
                    <>
                      <CopyCheck className="h-3.5 w-3.5 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <Button onClick={processText} disabled={!text || isProcessing}>
                {isProcessing ? (
                  <>
                    <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ScanText className="h-4 w-4 mr-2" />
                    {settings.useAI ? "AI Check & Improve" : "Check & Improve"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="corrections">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Suggested Corrections</CardTitle>
              <CardDescription>
                Review and apply the suggested improvements to your text
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isProcessing ? (
                <div className="py-12 flex flex-col items-center justify-center">
                  <LoaderCircle className="h-10 w-10 text-primary animate-spin mb-4" />
                  <p className="text-center text-muted-foreground">
                    {settings.useAI ? "AI is analyzing your text..." : "Analyzing your text for improvements..."}
                  </p>
                </div>
              ) : corrections.length > 0 ? (
                <div className="space-y-6">
                  {corrections.map((correction, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-secondary/50">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-sm font-medium text-destructive line-through">
                          {correction.original}
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary">
                          <Check className="h-4 w-4 mr-1" />
                          {correction.corrected}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 bg-background/80 p-2 rounded">
                          {correction.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center">
                  <Check className="h-10 w-10 text-primary mb-4" />
                  <p className="text-center text-muted-foreground">
                    No corrections needed. Your text looks good!
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between space-x-2 border-t pt-6">
              <Button variant="outline" onClick={() => setActiveTab('write')}>
                Return to Editor
              </Button>
              <Button
                onClick={applyCorrections}
                disabled={corrections.length === 0 || isProcessing}
              >
                <Check className="h-4 w-4 mr-2" />
                Apply All Corrections
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Accessibility Settings</CardTitle>
              <CardDescription>
                Customize the writing assistant to fit your needs
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Use Gemini AI</Label>
                    <p className="text-sm text-muted-foreground">
                      Use Google's Gemini API for AI-powered text improvements
                    </p>
                  </div>
                  <Switch
                    checked={settings.useAI}
                    onCheckedChange={() => toggleSetting('useAI')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Spell Check</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check and correct spelling mistakes
                    </p>
                  </div>
                  <Switch
                    checked={settings.spellCheck}
                    onCheckedChange={() => toggleSetting('spellCheck')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Grammar Check</Label>
                    <p className="text-sm text-muted-foreground">
                      Check for grammatical errors and suggest corrections
                    </p>
                  </div>
                  <Switch
                    checked={settings.grammarCheck}
                    onCheckedChange={() => toggleSetting('grammarCheck')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Simplify Text</Label>
                    <p className="text-sm text-muted-foreground">
                      Rewrite complex sentences into simpler language
                    </p>
                  </div>
                  <Switch
                    checked={settings.simplifyText}
                    onCheckedChange={() => toggleSetting('simplifyText')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dyslexia-Friendly Font</Label>
                    <p className="text-sm text-muted-foreground">
                      Use monospaced font for improved readability
                    </p>
                  </div>
                  <Switch
                    checked={settings.dyslexiaFont}
                    onCheckedChange={() => toggleSetting('dyslexiaFont')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    checked={settings.highContrast}
                    onCheckedChange={() => toggleSetting('highContrast')}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="justify-center border-t pt-6">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('write')} 
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Return to Editor
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WritingAssistance;
