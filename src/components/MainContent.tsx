"use client";

import { useEffect, useState } from 'react';
import styles from './MainContent.module.css'; // CSS module for styling
import interviewQuestions from '../../public/questions'; // Import mock data

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
  };

  const [data, setData] = useState({ interviewQuestions: loadData() });
  const [filters, setFilters] = useState({
    difficulty: '',
    patterns: '',
    companies: '',
    solved: '',
  });

  // Effect to sync minimal statuses with localStorage
  useEffect(() => {
    const questionStatuses = data.interviewQuestions.reduce((acc, question) => {
      acc[question.id] = { selected: question.selected, lastSolved: question.lastSolved };
      return acc;
    }, {});
    if (typeof window !== "undefined") {
      localStorage.setItem('questionStatuses', JSON.stringify(questionStatuses));
    }
  }, [data]);

  // Handler to toggle checkbox selection
  const handleCheckboxChange = (id) => {
    setData((prevData) => {
      const updatedQuestions = prevData.interviewQuestions.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
            lastSolved: !item.selected ? new Date().toLocaleDateString() : "", // Set or reset the date
          };
        }
        return item;
      });
      return { interviewQuestions: updatedQuestions };
    });
  };

  // Handle filter change
  const handleFilterChange = (e, filterType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: e.target.value,
    }));
  };

  // Filtered data
  const filteredQuestions = data.interviewQuestions.filter((item) => {
    const patternMatch = filters.patterns ? item.patterns.includes(filters.patterns) : true;
    const difficultyMatch = filters.difficulty ? item.difficulty === filters.difficulty : true;
    const companyMatch = filters.companies ? item.companies.includes(filters.companies) : true;
    const solvedMatch = filters.solved === 'solved' ? item.lastSolved !== "" : (filters.solved === 'unsolved' ? item.lastSolved === "" : true);
    return patternMatch && difficultyMatch && companyMatch && solvedMatch;
  });

  return (
    <main className="main_content">
      <div className="full_content">
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>
                <select style={{ margin: 'unset', width: '100%', marginTop: '5px' }} onChange={(e) => handleFilterChange(e, 'solved')} value={filters.solved}>
                  <option value="">All</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                </select>
              </th>
              <th>Questions</th>
              <th>Solution</th>
              <th>Patterns
                <select style={{ margin: 'unset', width: '100%', marginTop: '5px' }} onChange={(e) => handleFilterChange(e, 'patterns')} value={filters.patterns}>
                  <option value="">All</option>
                  {[Array.from(new Set(data.interviewQuestions.flatMap(item => item.patterns)))].map((pattern, idx) => (
                    <option key={idx} value={pattern}>{pattern}</option>
                  ))}
                </select>
              </th>
              <th>Difficulty
                <select style={{ margin: 'unset', width: '100%', marginTop: '5px' }} onChange={(e) => handleFilterChange(e, 'difficulty')} value={filters.difficulty}>
                  <option value="">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </th>
              <th>Companies
                <select style={{ margin: 'unset', width: '100%', marginTop: '5px' }} onChange={(e) => handleFilterChange(e, 'companies')} value={filters.companies}>
                  <option value="">All</option>
                  {[Array.from(new Set(data.interviewQuestions.flatMap(item => item.patterns)))].map((company, idx) => (
                    <option key={idx} value={company}>{company}</option>
                  ))}
                </select>
              </th>
              <th style={{ width: '125px' }}>
                Last Solved On
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleCheckboxChange(item.id)}
                    style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                    }}
                  />
                </td>
                <td>{item.question}</td>
                <td><a href={item.solutionLink} target="_blank" rel="noopener noreferrer">🔗</a></td>
                <td>
                  {item.patterns.map((pattern, idx) => (
                    <span key={idx} className={styles.tag}>{pattern}</span>
                  ))}
                </td>
                <td>
                  <span className={`${styles.difficulty} ${styles[item.difficulty.toLowerCase()]}`}>
                    {item.difficulty}
                  </span>
                </td>
                <td>{item.companies.join(', ')}</td>
                <td>{item.lastSolved || "Unsolved"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MainContent;
