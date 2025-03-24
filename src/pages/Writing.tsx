
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WritingAssistance from '@/components/writing/WritingAssistance';
import { BookScribe } from '@/components/writing/BookScribe';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Pen, BookText, Calendar, Users, Sparkles } from 'lucide-react';

const Writing = () => {
  const [activeTab, setActiveTab] = useState<'writing' | 'scribe'>('writing');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 pb-20">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-[calc(100vh-6rem)] w-full">
            <Sidebar>
              <SidebarHeader className="p-4">
                <h2 className="text-xl font-heading font-bold text-primary flex items-center">
                  <Pen className="h-5 w-5 mr-2" />
                  Writing Hub
                </h2>
              </SidebarHeader>
              
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Tools</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeTab === 'writing'} 
                        onClick={() => setActiveTab('writing')}
                        tooltip="AI-assisted writing tools"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Writing Assistant</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeTab === 'scribe'} 
                        onClick={() => setActiveTab('scribe')}
                        tooltip="Book a virtual scribe session"
                      >
                        <BookText className="h-4 w-4" />
                        <span>Book a Scribe</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                
                <SidebarGroup>
                  <SidebarGroupLabel>Resources</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#templates">
                          <Calendar className="h-4 w-4" />
                          <span>Writing Templates</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#community">
                          <Users className="h-4 w-4" />
                          <span>Community</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            
            <SidebarInset>
              <div className="container mx-auto px-4 py-8">
                <div className="flex items-center md:hidden mb-4">
                  <SidebarTrigger />
                  <h1 className="text-2xl font-heading font-bold ml-2">
                    {activeTab === 'writing' ? 'Writing Assistant' : 'Book a Scribe'}
                  </h1>
                </div>
                
                <div className="max-w-5xl mx-auto">
                  {activeTab === 'writing' ? (
                    <>
                      <div className="mb-8 text-center hidden md:block">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse-slow">
                          Writing & Text Assistance
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                          AI-powered tools to help with writing, reading, and text processing,
                          especially designed for learners with dyslexia and other text-related challenges.
                        </p>
                      </div>
                      <WritingAssistance />
                    </>
                  ) : (
                    <BookScribe />
                  )}
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Writing;
