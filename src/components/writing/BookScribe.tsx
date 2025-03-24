
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Calendar as CalendarIcon,
  User, 
  BookText, 
  Clipboard, 
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

type ScribeType = {
  id: string;
  name: string;
  specialty: string;
  description: string;
  availability: string;
  image: string;
  rating: number;
};

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

const scribes: ScribeType[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    specialty: 'Academic Writing',
    description: 'Specializes in research papers, essays, and technical writing.',
    availability: 'Weekdays',
    image: '/placeholder.svg',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Creative Writing',
    description: 'Expert in narratives, stories, and creative content.',
    availability: 'Evenings & Weekends',
    image: '/placeholder.svg',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    specialty: 'Business Writing',
    description: 'Focused on reports, proposals, and professional correspondence.',
    availability: 'Flexible Hours',
    image: '/placeholder.svg',
    rating: 4.7
  }
];

const timeSlots: TimeSlot[] = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '1:00 PM', available: true },
  { id: '5', time: '2:00 PM', available: true },
  { id: '6', time: '3:00 PM', available: true },
  { id: '7', time: '4:00 PM', available: false },
  { id: '8', time: '5:00 PM', available: true }
];

export const BookScribe = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedScribe, setSelectedScribe] = useState<ScribeType | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    topic: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleScribeSelection = (scribe: ScribeType) => {
    setSelectedScribe(scribe);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && selectedScribe && selectedDate && selectedTime) {
      setStep(2);
    } else if (step === 2 && bookingDetails.name && bookingDetails.email) {
      setStep(3);
    } else if (step === 1) {
      toast({
        title: "Please complete selection",
        description: "Please select a scribe, date, and time to continue.",
        variant: "destructive"
      });
    } else if (step === 2) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and email to continue.",
        variant: "destructive"
      });
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      
      toast({
        title: "Booking Confirmed!",
        description: `Your session with ${selectedScribe?.name} has been booked for ${selectedDate} at ${selectedTime}.`,
      });
    }, 1500);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedScribe(null);
    setBookingDetails({
      name: '',
      email: '',
      topic: '',
      notes: ''
    });
    setIsConfirmed(false);
  };

  // Generate the next 14 available dates
  const generateAvailableDates = () => {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    
    // Calculate date 14 days from now
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    const maxDate = twoWeeksFromNow.toISOString().split('T')[0];
    
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = generateAvailableDates();

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Book Your Virtual Scribe Session
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
          Get personalized assistance with your writing projects from our expert scribes.
        </p>
      </div>

      {!isConfirmed ? (
        <div className="space-y-8">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="relative flex items-center max-w-md w-full">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <Calendar className="h-5 w-5" />
              </div>
              <div className={`h-1 flex-1 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <User className="h-5 w-5" />
              </div>
              <div className={`h-1 flex-1 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Step content */}
          <div className="bg-card border rounded-xl shadow-md overflow-hidden">
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <BookText className="h-5 w-5 mr-2 text-primary" />
                  Select Your Scribe & Time
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Choose a Scribe</h3>
                    <div className="space-y-4">
                      {scribes.map((scribe) => (
                        <div 
                          key={scribe.id}
                          onClick={() => handleScribeSelection(scribe)}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${
                            selectedScribe?.id === scribe.id 
                              ? 'bg-primary/10 border-primary border-2' 
                              : 'bg-card hover:bg-secondary border border-border'
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                              <User className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium">{scribe.name}</div>
                              <div className="text-sm text-primary">{scribe.specialty}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Available: {scribe.availability}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm mt-2">{scribe.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="date"
                            type="date"
                            min={minDate}
                            max={maxDate}
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      {selectedDate && (
                        <div>
                          <Label>Available Time Slots</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot.id}
                                variant={selectedTime === slot.time ? "default" : "outline"}
                                className={`justify-start ${!slot.available && "opacity-50 cursor-not-allowed"}`}
                                disabled={!slot.available}
                                onClick={() => handleTimeSelection(slot.time)}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                {slot.time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <Clipboard className="h-5 w-5 mr-2 text-primary" />
                  Your Details
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={bookingDetails.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="topic">Writing Topic</Label>
                    <Input 
                      id="topic" 
                      name="topic"
                      value={bookingDetails.topic}
                      onChange={handleInputChange}
                      placeholder="What would you like help with?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      name="notes"
                      value={bookingDetails.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or questions for your scribe?"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                  Confirm Your Booking
                </h2>
                
                <div className="bg-secondary/50 rounded-lg p-5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-base font-medium mb-3">Scribe Details</h3>
                      {selectedScribe && (
                        <div className="flex gap-3 items-center">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{selectedScribe.name}</div>
                            <div className="text-sm text-primary">{selectedScribe.specialty}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-3">Session Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Date: {selectedDate}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Time: {selectedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="text-base font-medium mb-3">Your Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Name:</span> {bookingDetails.name}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Email:</span> {bookingDetails.email}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Topic:</span> {bookingDetails.topic || 'Not specified'}
                        </div>
                      </div>
                    </div>
                    
                    {bookingDetails.notes && (
                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground">Notes:</div>
                        <div className="text-sm mt-1 bg-background p-2 rounded">
                          {bookingDetails.notes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 border-t bg-muted/30 flex flex-wrap gap-2 justify-between">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                >
                  Back
                </Button>
              )}
              
              {step === 1 && (
                <Button 
                  className="ml-auto" 
                  onClick={handleNextStep}
                  disabled={!selectedScribe || !selectedDate || !selectedTime}
                >
                  Next: Your Details
                </Button>
              )}
              
              {step === 2 && (
                <Button 
                  className="ml-auto" 
                  onClick={handleNextStep}
                  disabled={!bookingDetails.name || !bookingDetails.email}
                >
                  Review Booking
                </Button>
              )}
              
              {step === 3 && (
                <Button 
                  className="ml-auto"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-primary/40 shadow-lg animate-fade-in">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Booking Confirmed!</CardTitle>
            <CardDescription className="text-center text-primary-foreground/80">
              We've sent the details to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 px-6 text-center">
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg mx-auto max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium">Session with {selectedScribe?.name}</div>
                  <div className="text-sm text-muted-foreground">#{Math.floor(Math.random() * 10000)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedTime}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">What's Next?</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive a confirmation email with a link to join the virtual session.
                  Make sure to prepare any documents or questions you have for your scribe.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                <Button
                  variant="outline"
                  className="flex items-center"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button
                  variant="secondary"
                  className="flex items-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button 
              variant="ghost" 
              onClick={resetBooking}
            >
              Book Another Session
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
