"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, Code2, ArrowUpRight, PlayIcon, CheckCircle2 } from "lucide-react"
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function SimplifiedHomePage() {
  const features = [
    { icon: CheckCircle2, text: "Comprehensive DSA Curriculum" },
    { icon: CheckCircle2, text: "Interview-Focused Practice" },
    { icon: CheckCircle2, text: "Real-World Problem Solving" }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold">RapidDSA</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button size='sm' variant='default'>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex justify-center items-center">
        <section className="container mx-auto px-4 py-16 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none ">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] scale-150 dark:bg-[radial-gradient(#fff_1px,transparent_1px)]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <div className="bg-primary/10 inline-block px-4 py-2 rounded-full text-primary font-medium text-sm animate-pulse-slow">
                Elevate Your Tech Career
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                Master DSA,
                <br />
                <span className="text-primary">Ace Tech Interviews</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                RapidDSA is your comprehensive platform for transforming data structures and algorithm skills into interview success.
              </p>
              
              {/* Feature Bullets */}
              <div className="space-y-3 pt-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="text-primary w-6 h-6" />
                    <span className="text-md text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
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
            
            {/* Image Section */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl">
                  <img
                    //  src="https://picsum.photos/600/400"
                    src="../../dsaprep.jpeg"
                    alt="DSA Interview Preparation"
                    className="object-cover w-[600px] h-[400px] brightness-90 group-hover:brightness-100 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-75 group-hover:opacity-50 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/20 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2024 RapidDSA. All rights reserved.
        </div>
      </footer>
    </div>
  )
}