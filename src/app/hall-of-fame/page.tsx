"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Dummy Donor Data
const donors = [
  {
    id: 1,
    name: "John Doe",
    message: "Keep up the good work!",
    social: "https://twitter.com/johndoe",
    amount: "$1000",
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "Supporting a great cause.",
    social: "https://linkedin.com/in/janesmith",
    amount: "$700",
  },
  {
    id: 3,
    name: "Emily Johnson",
    message: "Proud to be part of this journey.",
    social: "https://github.com/emilyjohnson",
    amount: "$500",
  },
  {
    id: 4,
    name: "Anonymous",
    message: "Happy to help!",
    social: null,
    amount: "$400",
  },
  {
    id: 5,
    name: "Mark Wilson",
    message: "Let’s make this happen!",
    social: "https://twitter.com/markwilson",
    amount: "$300",
  },
];

export default function HallOfFameTable() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered Data
  const filteredDonors = donors.filter((donor) =>
    [donor.name, donor.message, donor.amount]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="p-6 bg-muted/50 min-h-screen">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">Hall of Fame</h1>
            <p className="text-lg text-muted-foreground">
              Celebrating those who have contributed to the growth of RapidDSA.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, message, or amount..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Donor Table */}
          <div className="bg-card p-4 rounded-lg shadow-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-left">Name</TableHead>
                  <TableHead className="font-semibold text-left">Message</TableHead>
                  <TableHead className="font-semibold text-center">Social Links</TableHead>
                  <TableHead className="font-semibold text-center">Amount Donated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <TableRow key={donor.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{donor.name}</TableCell>
                      <TableCell>{donor.message}</TableCell>
                      <TableCell className="text-center">
                        {donor.social ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-700"
                            asChild
                          >
                            <a href={donor.social} target="_blank" rel="noopener noreferrer">
                              View Profile
                            </a>
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold text-green-600">
                        {donor.amount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No donors found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
