"use client"

import Header from '@/components/Header';
import Nav from '@/components/Nav';
import React, { useState } from 'react';
import styles from './TopicsTable.module.css';

export default function Index() {
  const articles = [
    { title: "Dynamic Programming Patterns", topic: "Dynamic Programming", link: "https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns" },
    { title: "Dynamic Programming Discussion", topic: "Dynamic Programming", link: "https://leetcode.com/discuss/interview-question/1986802/Dynamic-Programming" },
    { title: "DP for Beginners", topic: "Dynamic Programming", link: "https://leetcode.com/discuss/general-discussion/662866/DP-for-Beginners-Problems-or-Patterns-or-Sample-Solutions" },
    { title: "Solved All DP Problems", topic: "Dynamic Programming", link: "https://leetcode.com/discuss/general-discussion/1000929/solved-all-dynamic-programming-dp-problems-in-7-months#:~:text=There are total 241 dp,only solved the public ones.&text=Then I started to solve,my monthly problem list here.&text=The average pace was about 1 problem per day" },
    { title: "Become Master in Linked List", topic: "Linked List", link: "https://leetcode.com/discuss/study-guide/1800120/Become-Master-In-Linked-List" },
    { title: "Linked List Study Guide", topic: "Linked List", link: "https://leetcode.com/discuss/study-guide/2725900/Linked-list-study-guide" },
    { title: "Solved All Two Pointers Problems", topic: "Two Pointers", link: "https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days" },
    { title: "Master in Two Pointer", topic: "Two Pointers", link: "https://leetcode.com/discuss/study-guide/1905453/master-in-two-pointer" },
    { title: "General Approach to Stack Problems", topic: "Stack & Queue", link: "https://leetcode.com/discuss/study-guide/3168516/A-general-approach-to-stack-problems-in-C%2B%2B-or-Generic-Template" },
    { title: "Templates for Monotonic Stacks and Queues", topic: "Stack & Queue", link: "https://leetcode.com/discuss/study-guide/5085517/Templates-for-monotonic-stacks-and-queues-(with-solved-problems)/" },
    { title: "Graph Algorithms Problems", topic: "Graphs", link: "https://leetcode.com/discuss/study-guide/1326900/graph-algorithms-problems-to-practice" },
    { title: "Master Graph Algorithms", topic: "Graphs", link: "https://leetcode.com/discuss/study-guide/2360573/become-master-in-graph" },
    { title: "Union Find Guide", topic: "Graphs", link: "https://leetcode.com/discuss/general-discussion/1072418/Disjoint-Set-Union-(DSU)Union-Find-A-Complete-Guide" },
    { title: "Detailed Explanation of Math Behind O(n) Solution", topic: "Prefix Sum", link: "https://leetcode.com/problems/subarray-sum-equals-k/solutions/867435/detailed-explanation-of-math-behind-o-n-solution-python3/" },
    { title: "Maximum Sliding Window Cheatsheet Template", topic: "Sliding Window", link: "https://leetcode.com/problems/frequency-of-the-most-frequent-element/solutions/1175088/C++-Maximum-Sliding-Window-Cheatsheet-Template/" },
    { title: "Backtracking for Beginners", topic: "Backtracking", link: "https://leetcode.com/discuss/study-guide/2244368/backtracking-for-beginners-problems" },
    { title: "General Approach to Backtracking", topic: "Backtracking", link: "https://leetcode.com/discuss/general-discussion/680269/a-general-approach-to-backtracking-problems-in-cexhaustive-searching" },
    { title: "Tree Question Pattern", topic: "Tree", link: "https://leetcode.com/discuss/study-guide/1337373/Tree-question-pattern-oror2021-placement" },
    { title: "Master Tree Patterns", topic: "Tree", link: "https://leetcode.com/discuss/study-guide/5020529/Master-Tree-Patterns/" },
    { title: "Binary Trees Study Guide", topic: "Tree", link: "https://leetcode.com/discuss/study-guide/1212004/Binary-Trees-study-guide" },
    { title: "Become Master in Recursion", topic: "Recursion", link: "https://leetcode.com/discuss/study-guide/1733447/Become-Master-In-Recursion" },
    { title: "Master Heap by Solving 23 Questions", topic: "Heap", link: "https://leetcode.com/discuss/general-discussion/1127238/master-heap-by-solving-23-questions-in-4-pattern-categories" },
    { title: "Important Patterns in Heap", topic: "Heap", link: "https://leetcode.com/discuss/study-guide/2773740/Important-Patterns-in-HeapPriority-Queue-with-link-to-problems" },
    { title: "A Noob’s Guide to Binary Search", topic: "Binary Search", link: "https://leetcode.com/discuss/study-guide/1233854/a-noobs-guide-to-the-binary-search-algorithm" },
    { title: "Ultimate Binary Search Template", topic: "Binary Search", link: "https://leetcode.com/discuss/study-guide/786126/Python-Powerful-Ultimate-Binary-Search-Template.-Solved-many-problems" },
    { title: "ABCs of Greedy", topic: "Greedy", link: "https://leetcode.com/discuss/general-discussion/1061059/ABCs-of-Greedy" },
    { title: "Patterns for Bits Manipulations", topic: "Bits Manipulation", link: "https://leetcode.com/discuss/interview-question/3695233/all-types-of-patterns-for-bits-manipulations-and-how-to-use-it" },
    { title: "Collections of Important String Questions", topic: "Strings", link: "https://leetcode.com/discuss/interview-question/2001789/collections-of-important-string-questions-pattern" },
    { title: "The Only Lists You Need for Interview Preparation", topic: "Interview Prep", link: "https://leetcode.com/discuss/interview-question/2069641/the-only-lists-you-need-for-your-interview-preparation" },
    { title: "Complete System Design Case Studies", topic: "System Design", link: "https://leetcode.com/discuss/study-guide/3611301/Complete-System-Design-Case-Studies-%3A-Bookmark-it" },
    { title: "System Design Template That Landed Me Google", topic: "System Design", link: "https://leetcode.com/discuss/general-discussion/2340482/system-design-template-that-landed-me-to-google" },
    { title: "Object-Oriented Design Template for Google", topic: "System Design", link: "https://leetcode.com/discuss/general-discussion/2341201/object-oriented-design-template-that-landed-me-to-google" }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // All unique topics available
  const allTopics = [...new Set(articles.map(article => article.topic))];

  // Toggle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Update selected topics
  const handleTopicChange = (topic) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)  // Remove topic if already selected
      : [...selectedTopics, topic];  // Add topic if not selected

    setSelectedTopics(updatedTopics);

    // Filter articles based on updated topics
    setFilteredArticles(
      updatedTopics.length === 0
        ? articles
        : articles.filter(article => updatedTopics.includes(article.topic))
    );
  };


  return (
    <>
      <Header />
      <Nav />
      <main className={styles.main_content}>
        <div className="full_content" style={{ marginTop: 60 }}>
          <h3>Leetcode Gems</h3>
          <table className={styles.topics_table}>
            <thead>
              <tr>
                <th>Article</th>
                <th>
                  Topic
                  {/* <button onClick={openModal} className={styles.iconButton}>
                    📋 
                  </button> */}
                </th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article, index) => (
                <tr key={index}>
                  <td>{article.title}</td>
                  <td>{article.topic}</td>
                  <td>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      Click here
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for topic selection */}
        {/* {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h4>Select Topics to Filter</h4>
              <button className={styles.closeButton} onClick={closeModal}>✖️</button>
              <ul>
                {allTopics.map((topic, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                      />
                      {topic}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={closeModal}>Apply Filters</button>
            </div>
          </div>
        )} */}
      </main>
    </>
  );

}
