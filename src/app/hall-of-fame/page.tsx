"use client"

import React, { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Search, CheckCircle2, Circle, X, Heart, Trophy, Star } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Supporters Data
const supportersData = [
    {
        id: 1,
        name: "Alex Thompson",
        contribution: 50,
        tier: "Gold",
        background: "Software Engineer at Google",
        message: "Helping aspiring engineers level up their DSA skills!",
        date: "2024-01-15"
    },
    {
        id: 2,
        name: "Emily Rodriguez",
        contribution: 25,
        tier: "Silver",
        background: "Computer Science Student",
        message: "RapidDSA helped me crack my tech interviews!",
        date: "2024-02-20"
    },
    {
        id: 3,
        name: "Michael Chen",
        contribution: 100,
        tier: "Platinum",
        background: "Senior Software Architect",
        message: "Investing in the next generation of tech talent.",
        date: "2024-03-10"
    },
    {
        id: 4,
        name: "Sarah Kumar",
        contribution: 75,
        tier: "Gold",
        background: "Startup Founder",
        message: "Proud to support learning and growth in tech.",
        date: "2024-04-05"
    }
]

// Tier color mapping
const tierColors = {
    Platinum: "bg-gradient-to-r from-gray-300 to-gray-500 text-white",
    Gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
    Silver: "bg-gradient-to-r from-gray-200 to-gray-400 text-white"
}

export default function Page() {
    // Use state for client-side rendering
    const [searchTerm, setSearchTerm] = useState("")
    const [isMounted, setIsMounted] = useState(false)

    // Ensure the component only renders on the client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Filter supporters based on search term
    const filteredSupporters = isMounted 
        ? supportersData.filter((supporter) =>
            supporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supporter.background.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supporter.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : []

    // Safely format date on client-side
    const formatDate = (dateString: string) => {
        if (!isMounted) return ''
        return new Date(dateString).toLocaleDateString()
    }

    // Prevent rendering until mounted
    if (!isMounted) {
        return null
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                {/* Main Content */}
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <Trophy className="h-8 w-8 text-primary" />
                                <h2 className="text-2xl font-semibold">Hall of Fame</h2>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="h-5 w-5 text-red-500" />
                                <span>Your support keeps RapidDSA running</span>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                placeholder="Search supporters, backgrounds, or messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Supporters Table */}
                        <div className="rounded-lg border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="w-16 text-center font-semibold">Tier</TableHead>
                                        <TableHead className="font-semibold">Name</TableHead>
                                        <TableHead className="font-semibold">Background</TableHead>
                                        <TableHead className="font-semibold w-1/3">Message</TableHead>
                                        <TableHead className="font-semibold">Contribution</TableHead>
                                        <TableHead className="font-semibold">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSupporters.length > 0 ? (
                                        filteredSupporters.map((supporter) => (
                                            <TableRow
                                                key={supporter.id}
                                                className="hover:bg-muted/50 transition-colors duration-200"
                                            >
                                                <TableCell className="text-center">
                                                    <div
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${tierColors[supporter.tier]}`}
                                                    >
                                                        {supporter.tier}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {supporter.name}
                                                        {supporter.tier === 'Platinum' && <Star className="h-4 w-4 text-primary" />}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="text-xs font-normal">
                                                        {supporter.background}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground italic">
                                                    "{supporter.message}"
                                                </TableCell>
                                                <TableCell className="font-semibold text-primary">
                                                    ${supporter.contribution}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatDate(supporter.date)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                className="h-24 text-center text-muted-foreground"
                                            >
                                                No supporters found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 text-center">
                            <Button className="group">
                                Support RapidDSA
                                <Heart className="ml-2 h-5 w-5 group-hover:fill-red-500 transition-colors" />
                            </Button>
                            <p className="text-sm text-muted-foreground mt-2">
                                Help us continue providing free DSA resources to aspiring developers
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}