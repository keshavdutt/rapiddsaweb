"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import {
  Moon,
  Sun,
  Code2,
  Target,
  Zap,
  BookOpenCheck,
  ChevronRight,
  GraduationCap,
  ArrowUpRight,
  PlayIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('preparation')

  const features = [
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Rapid Learning",
      description: "Accelerate your DSA skills with our laser-focused, efficient curriculum."
    },
    {
      icon: <Target className="w-10 h-10 text-primary" />,
      title: "Strategic Approach",
      description: "Targeted problem-solving techniques that align with top tech interview patterns."
    },
    {
      icon: <BookOpenCheck className="w-10 h-10 text-primary" />,
      title: "Interview-Optimized",
      description: "Comprehensive preparation that goes beyond theory to real-world problem-solving."
    }
  ]

  const reviews = [
    {
      name: "Sarah Kim",
      role: "SWE at Google",
      company: "Google",
      review: "RapidDSA completely transformed my interview prep. The strategic approach is absolutely game-changing.",
      image: "https://picsum.photos/80/80"
    },
    {
      name: "Alex Rodriguez",
      role: "Senior Engineer",
      company: "Amazon",
      review: "Incredibly intuitive platform that cuts through the noise and focuses on what truly matters in tech interviews.",
      image: "https://picsum.photos/80/80"
    },
    {
      name: "Emily Chen",
      role: "Tech Lead",
      company: "Meta",
      review: "Wish I had RapidDSA earlier in my career. It's the most efficient way to master DSA for tech interviews.",
      image: "https://picsum.photos/80/80"
    },
    {
      name: "Emily Chen",
      role: "Tech Lead",
      company: "Meta",
      review: "Wish I had RapidDSA earlier in my career. It's the most efficient way to master DSA for tech interviews.",
      image: "https://picsum.photos/80/80"
    }
  ]

  const learningTabs = [
    {
      key: 'preparation',
      title: 'Rapid Preparation',
      description: 'Structured learning path designed to fast-track your DSA mastery.',
      icon: <GraduationCap className="w-8 h-8 mr-2" />
    },
    {
      key: 'techniques',
      title: 'Advanced Techniques',
      description: 'Deep dive into problem-solving strategies used by top tech companies.',
      icon: <Code2 className="w-8 h-8 mr-2" />
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            {/* <Code2 className="w-8 h-8 text-primary" /> */}
            <span className="text-2xl font-bold">RapidDSA</span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4 mr-4">
              {/* <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a> */}
            </nav>
            <ThemeToggle />
            <Button size='sm' variant='default' >
              <Link href="/dashboard" className="flex items-center space-x-2">
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <section className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-primary/10 inline-block px-4 py-2 rounded-full text-primary font-medium text-sm">
              Elevate Your Tech Career
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Master DSA,
              <br />
              <span className="text-primary">Ace Tech Interviews</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              RapidDSA is your comprehensive platform for transforming data structures and algorithm skills into interview success. Learn, practice, and excel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group w-full sm:w-auto">
                Start Your Journey
                <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group"
              >
                <PlayIcon className="mr-2 h-5 w-5 text-primary group-hover:text-primary/80" />
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-lg opacity-75"></div>
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <img
                  // src="/api/placeholder/500/400"
                  src="https://picsum.photos/600/400"

                  alt="DSA Interview Preparation"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RapidDSA</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our unique approach combines cutting-edge learning techniques with real-world interview strategies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Approach Section */}
        <section className="py-16 bg-secondary/20 rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Learning Approach</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tailored learning paths that adapt to your skill level and interview goals.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b mb-6">
              {learningTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`
                    flex items-center px-4 py-2 border-b-2 
                    ${activeTab === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground'}
                    hover:text-primary transition-colors
                  `}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.icon}
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="px-4">
              {learningTabs.find(tab => tab.key === activeTab)?.description}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from professionals who've transformed their interview preparation with RapidDSA.
            </p>
          </div>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center space-x-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle>{review.name}</CardTitle>
                        <CardDescription>{review.role} at {review.company}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="italic text-muted-foreground">"{review.review}"</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/20 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Code2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">RapidDSA</span>
            </div>
            <p className="text-muted-foreground">
              Empowering tech professionals to excel in their software engineering interviews through strategic, rapid learning.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-sm hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Contact</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Blog</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">Resources</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 text-center border-t pt-4 text-muted-foreground">
          © 2024 RapidDSA. All rights reserved.
        </div>
      </footer>
    </div>
  )
}