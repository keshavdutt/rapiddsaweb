"use client"
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Link } from 'lucide-react';
import interviewQuestions from '../../public/questions';

const MainContent = () => {
  // Load initial data with minimal statuses from localStorage
  const loadData = () => {
    if (typeof window !== "undefined") {
      const storedStatuses = JSON.parse(localStorage.getItem('questionStatuses')) || {};
      return interviewQuestions.map((question) => ({
        ...question,
        selected: storedStatuses[question.id]?.selected || false,
        lastSolved: storedStatuses[question.id]?.lastSolved || "",
      }));
    }
    return interviewQuestions;
  };

  const [questions, setQuestions] = useState(loadData());
  const [filters, setFilters] = useState({
    difficulty: '',
    patterns: '',
    companies: '',
    solved: '',
  });

  // Sync with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const questionStatuses = questions.reduce((acc, question) => {
        acc[question.id] = { 
          selected: question.selected, 
          lastSolved: question.lastSolved 
        };
        return acc;
      }, {});
      localStorage.setItem('questionStatuses', JSON.stringify(questionStatuses));
    }
  }, [questions]);

  // Toggle question solved status
  const toggleQuestionSolved = (id) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === id 
          ? { 
              ...q, 
              selected: !q.selected, 
              lastSolved: !q.selected ? new Date().toLocaleDateString() : "" 
            }
          : q
      )
    );
  };

  // Filtered and processed questions
  const processedQuestions = questions.filter(item => {
    const patternMatch = filters.patterns === 'all' 
      ? true 
      : item.patterns.includes(filters.patterns);
    const difficultyMatch = filters.difficulty === 'all' 
      ? true 
      : item.difficulty === filters.difficulty;
    const companyMatch = filters.companies === 'all' 
      ? true 
      : item.companies.includes(filters.companies);
    const solvedMatch = filters.solved === 'solved' 
      ? item.lastSolved !== "" 
      : (filters.solved === 'unsolved' 
          ? item.lastSolved === "" 
          : true);
    
    return patternMatch && difficultyMatch && companyMatch && solvedMatch;
  });

  // Get unique filter options
  const uniquePatterns = [...new Set(questions.flatMap(q => q.patterns))];
  const uniqueCompanies = [...new Set(questions.flatMap(q => q.companies))];

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-2">
        {/* Solved Status Filter */}
        <Select 
          onValueChange={(value) => setFilters(prev => ({ ...prev, solved: value || 'all' }))}
          value={filters.solved || 'all'}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Solve Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="solved">Solved</SelectItem>
            <SelectItem value="unsolved">Unsolved</SelectItem>
          </SelectContent>
        </Select>

        {/* Patterns Filter */}
        <Select 
          onValueChange={(value) => setFilters(prev => ({ ...prev, patterns: value || 'all' }))}
          value={filters.patterns || 'all'}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Patterns" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Patterns</SelectItem>
            {uniquePatterns.map(pattern => (
              <SelectItem key={pattern} value={pattern}>{pattern}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Difficulty Filter */}
        <Select 
          onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value || 'all' }))}
          value={filters.difficulty || 'all'}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        {/* Companies Filter */}
        <Select 
          onValueChange={(value) => setFilters(prev => ({ ...prev, companies: value || 'all' }))}
          value={filters.companies || 'all'}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {uniqueCompanies.map(company => (
              <SelectItem key={company} value={company}>{company}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Filters Button */}
        <Button 
          variant="outline" 
          onClick={() => setFilters({ difficulty: 'all', patterns: 'all', companies: 'all', solved: 'all' })}
        >
          Reset Filters
        </Button>
      </div>

      <Table>
        <TableCaption>Interview Questions Tracker</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Solved</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Solution</TableHead>
            <TableHead>Patterns</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Companies</TableHead>
            <TableHead>Last Solved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedQuestions.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={item.selected}
                  onCheckedChange={() => toggleQuestionSolved(item.id)}
                />
              </TableCell>
              <TableCell>{item.question}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" asChild>
                  <a href={item.solutionLink} target="_blank" rel="noopener noreferrer">
                    <Link className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {item.patterns.map((pattern) => (
                    <Badge key={pattern} variant="secondary">
                      {pattern}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={`
                    ${item.difficulty === 'Easy' && 'text-green-600 border-green-600'}
                    ${item.difficulty === 'Medium' && 'text-yellow-600 border-yellow-600'}
                    ${item.difficulty === 'Hard' && 'text-red-600 border-red-600'}
                  `}
                >
                  {item.difficulty}
                </Badge>
              </TableCell>
              <TableCell>{item.companies.join(', ')}</TableCell>
              <TableCell>{item.lastSolved || "Not Solved"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MainContent;