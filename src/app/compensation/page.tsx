"use client"

import React, { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Search, CheckCircle2, Circle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Enhanced Sample Data with completed status
const initialData = [
  {
    id: 1,
    question: "Nearest Greatest Element to Right",
    topic: "Stack",
    difficulty: "Hard",
    companies: ["Amazon", "Microsoft", "Google"],
    link: "https://example.com/nge-right",
  },
  {
    id: 2,
    question: "Two Sum Problem",
    topic: "Hash Map",
    difficulty: "Medium",
    companies: ["Facebook", "Apple", "Amazon"],
    link: "https://example.com/two-sum",
  },
  {
    id: 3,
    question: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    companies: ["Google", "Microsoft"],
    link: "https://example.com/binary-search",
  },
  {
    id: 4,
    question: "Kth Largest Element in an Array",
    topic: "Heap",
    difficulty: "Hard",
    companies: ["Meta", "Uber", "LinkedIn"],
    link: "https://example.com/kth-largest",
  },
  {
    id: 5,
    question: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "Microsoft"],
    link: "https://example.com/valid-parentheses",
  },
  {
    id: 6,
    question: "LRU Cache",
    topic: "Hash Map",
    difficulty: "Hard",
    companies: ["Microsoft", "Amazon", "Apple"],
    link: "https://example.com/lru-cache",
  },
]

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 text-xs px-2 py-0.5",
  Medium: "bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5",
  Hard: "bg-red-100 text-red-800 text-xs px-2 py-0.5",
}

const STORAGE_KEY = 'algorithmQuestionsCompleted'

export default function Page() {
  const [data] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [completedQuestions, setCompletedQuestions] = useState(new Set())
  const [isInitialized, setIsInitialized] = useState(false)

  // Load completed questions from localStorage on initial render
  useEffect(() => {
    try {
      const savedCompletedQuestions = localStorage.getItem(STORAGE_KEY)
      if (savedCompletedQuestions) {
        // Parse the JSON and create a new Set from the array
        const parsedQuestions = JSON.parse(savedCompletedQuestions)
        if (Array.isArray(parsedQuestions)) {
          setCompletedQuestions(new Set(parsedQuestions))
        }
      }
    } catch (error) {
      console.error('Error loading completed questions:', error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save to localStorage whenever completedQuestions changes
  useEffect(() => {
    // Only save after initial load to prevent overwriting with empty set
    if (isInitialized) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(Array.from(completedQuestions))
        )
      } catch (error) {
        console.error('Error saving completed questions:', error)
      }
    }
  }, [completedQuestions, isInitialized])

  // Get unique topics and companies for filters
  const topics = [...new Set(data.map(item => item.topic))]
  const companies = [...new Set(data.flatMap(item => item.companies))]

  // Toggle completed status with error handling
  const toggleCompleted = (id) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Enhanced filtering functionality
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companies.some(company =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDifficulty = selectedDifficulty ?
      item.difficulty === selectedDifficulty : true

    const matchesTopic = selectedTopic ?
      item.topic === selectedTopic : true

    const matchesCompany = selectedCompany ?
      item.companies.includes(selectedCompany) : true

    return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany
  })

  // Prevent rendering until initial load is complete
  if (!isInitialized) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Compensation</h2>
              <div className="flex gap-2">
                {/* Topic Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      Topic
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedTopic("")}>
                      All Topics
                    </DropdownMenuItem>
                    {topics.map((topic) => (
                      <DropdownMenuItem
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        {topic}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Difficulty Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      Difficulty
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedDifficulty("")}>
                      All Difficulties
                    </DropdownMenuItem>
                    {["Easy", "Medium", "Hard"].map((diff) => (
                      <DropdownMenuItem
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                      >
                        {diff}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Company Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2">
                      <Filter className="h-4 w-4" />
                      Company
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCompany("")}>
                      All Companies
                    </DropdownMenuItem>
                    {companies.sort().map((company) => (
                      <DropdownMenuItem
                        key={company}
                        onClick={() => setSelectedCompany(company)}
                      >
                        {company}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search questions, companies, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Enhanced Table */}
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-16 text-center font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Question</TableHead>
                    <TableHead className="font-semibold">Topic</TableHead>
                    <TableHead className="font-semibold">Difficulty</TableHead>
                    <TableHead className="font-semibold">Companies</TableHead>
                    <TableHead className="font-semibold w-20">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`hover:bg-muted/50 transition-colors duration-200 ${completedQuestions.has(item.id)
                            ? "bg-green-50 dark:bg-green-200/50"
                            : ""
                          }`}
                      >
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full hover:bg-muted/80 transition-colors duration-200"
                            onClick={() => toggleCompleted(item.id)}
                          >
                            {completedQuestions.has(item.id) ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{item.question}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-normal">
                            {item.topic}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full inline-flex items-center justify-center ${difficultyColors[item.difficulty]}`}
                          >
                            {item.difficulty}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.companies.map((company, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800 ${selectedCompany === company ? "ring-2 ring-blue-500" : ""
                                  }`}
                              >
                                {company}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-700 p-0 h-auto font-normal hover:bg-transparent"
                            asChild
                          >
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No results found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

              </Table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}