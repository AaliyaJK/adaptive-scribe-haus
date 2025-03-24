
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
  ScanText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const WritingAssistance = () => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState('');
  const [corrections, setCorrections] = useState<Array<{original: string, corrected: string, explanation: string}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [copied, setCopied] = useState(false);
  
  // Settings
  const [settings, setSettings] = useState({
    spellCheck: true,
    grammarCheck: true,
    simplifyText: false,
    dyslexiaFont: false,
    highContrast: false,
  });
  
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
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would use the Web Speech API
    // For now, we'll just simulate recording
    
    // Simulate appending text from speech after a delay
    setTimeout(() => {
      setText(prev => prev + (prev ? ' ' : '') + "This is simulated speach-to-text. It might contain some erors and gramatical mistakes that will be corrected by the AI.");
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // In a real implementation, this would stop the Web Speech API recording
  };
  
  const processText = () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
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
      setSimplifiedText(
        "This is simulated speech-to-text. It might contain some errors and grammatical mistakes that will be corrected by the AI."
      );
      
      setIsProcessing(false);
      setActiveTab('corrections');
    }, 1500);
  };
  
  const applyCorrections = () => {
    let processedText = text;
    
    corrections.forEach(correction => {
      processedText = processedText.replace(correction.original, correction.corrected);
    });
    
    setText(processedText);
    setCorrections([]);
    setActiveTab('write');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(simplifiedText || text);
    setCopied(true);
  };
  
  const resetText = () => {
    setText('');
    setSimplifiedText('');
    setCorrections([]);
  };
  
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
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
              <CardTitle className="text-2xl font-heading">AI Writing Assistant</CardTitle>
              <CardDescription>
                Get real-time help with writing, spelling, and grammar
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
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
                    Check & Improve
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
                    Analyzing your text for improvements...
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
