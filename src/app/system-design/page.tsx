"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { FixedSizeList as VirtualizedList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Search, CheckCircle2, Circle, X } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Type definition for question item
interface QuestionItem {
    id: number;
    question: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    companies: string[];
    link: string;
}

// Difficulty color mapping
const difficultyColors = {
    Easy: "bg-green-100 text-green-800 text-xs px-2 py-0.5",
    Medium: "bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5",
    Hard: "bg-red-100 text-red-800 text-xs px-2 py-0.5",
}

const STORAGE_KEY = 'algorithmQuestionsCompleted'
const PAGE_SIZE = 20 // Number of items to load per page

export default function Page() {
    // State for managing questions and filtering
    const [questions, setQuestions] = useState<QuestionItem[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("")
    const [selectedTopic, setSelectedTopic] = useState("")
    const [selectedCompany, setSelectedCompany] = useState("")
    const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set())
    const [isInitialized, setIsInitialized] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // Load questions (simulated - in real app, this would be an API call)
    useEffect(() => {
        const fetchQuestions = async () => {
            // Simulate large dataset
            const largeDataset: QuestionItem[] = Array.from({ length: 5000 }, (_, i) => ({
                id: i + 1,
                question: `Question ${i + 1}`,
                topic: i % 3 === 0 ? "Stack" : i % 3 === 1 ? "Hash Map" : "Binary Search",
                difficulty: i % 3 === 0 ? "Easy" : i % 3 === 1 ? "Medium" : "Hard",
                companies: ["Amazon", "Google", "Microsoft"],
                link: `https://example.com/question-${i + 1}`
            }));

            setQuestions(largeDataset);
        };

        fetchQuestions();
    }, []);

    // Load completed questions from localStorage
    useEffect(() => {
        try {
            const savedCompletedQuestions = localStorage.getItem(STORAGE_KEY)
            if (savedCompletedQuestions) {
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

    // Save completed questions to localStorage
    useEffect(() => {
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

    // Memoized filtering of questions
    const filteredQuestions = useMemo(() => {
        return questions.filter((item) => {
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
    }, [questions, searchTerm, selectedDifficulty, selectedTopic, selectedCompany])

    // Paginated and filtered questions
    const paginatedQuestions = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE
        return filteredQuestions.slice(startIndex, startIndex + PAGE_SIZE)
    }, [filteredQuestions, currentPage])

    // Toggle completed status
    const toggleCompleted = useCallback((id: number) => {
        setCompletedQuestions(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }, [])

    // Get unique topics and companies for filters
    const topics = useMemo(() => [...new Set(questions.map(item => item.topic))], [questions])
    const companies = useMemo(() => [...new Set(questions.flatMap(item => item.companies))], [questions])

    // Pagination controls
    const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE)

    // Prevent rendering until initial load is complete
    if (!isInitialized) {
        return null
    }


    // Filter summary component
    const FilterSummary = () => {
        // Collect active filters
        const activeFilters = [
            selectedTopic && { type: 'Topic', value: selectedTopic, clear: () => setSelectedTopic('') },
            selectedDifficulty && { type: 'Difficulty', value: selectedDifficulty, clear: () => setSelectedDifficulty('') },
            selectedCompany && { type: 'Company', value: selectedCompany, clear: () => setSelectedCompany('') },
            searchTerm && { type: 'Search', value: searchTerm, clear: () => setSearchTerm('') }
        ].filter(Boolean); // Remove falsy values

        // If no filters are active, return null
        if (activeFilters.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="text-sm font-medium mr-2 self-center">Filters:</div>
                {activeFilters.map((filter, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-muted/50 rounded-lg px-3 py-1 text-sm gap-2"
                    >
                        <span className="font-semibold">{filter.type}:</span>
                        <span>{filter.value}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 p-0 hover:bg-muted/80"
                            onClick={filter.clear}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                {activeFilters.length > 1 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setSelectedTopic('');
                            setSelectedDifficulty('');
                            setSelectedCompany('');
                            setSearchTerm('');
                        }}
                        className="ml-2 text-destructive hover:bg-destructive/10"
                    >
                        Clear All
                    </Button>
                )}
            </div>
        );
    };


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">System Design</h2>
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

                        <FilterSummary />

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                placeholder="Search questions, companies, or topics..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1) // Reset to first page on new search
                                }}
                            />
                        </div>

                        {/* Virtualized Table */}
                        <div className="rounded-lg border bg-card" style={{ height: '600px'}}>
                        <div className="w-full h-full overflow-auto">
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
                                <TableBody className=" w-full">
                                    {paginatedQuestions.length > 0 ? (
        
                                        paginatedQuestions.map((item) => (
                                            <TableRow
                                            key={item.id}
                                            className={`hover:bg-muted/50 transition-colors duration-200 ${completedQuestions.has(item.id)
                                                ? "bg-green-50 dark:bg-green-200/50"
                                                : ""
                                                }`}
                                        >
                                            {/* Similar to original row rendering, but adapted for virtualization */}
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
                                                    className={`rounded-full inline-flex items-center justify-center ${difficultyColors[item.difficulty]
                                                        }`}
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

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center mt-4 space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}