import Header from '@/components/Header';
import Nav from '@/components/Nav';
import React from 'react';
import styles from './TopicsTable.module.css';

export default function Index() {
  const topics = [
    { id: 1, title: 'Two Pointers Technique', Topics: 'Medium', link: 'https://example.com/two-pointers' },
    { id: 2, title: 'Binary Search', Topics: 'Easy', link: 'https://example.com/binary-search' },
    { id: 3, title: 'Dynamic Programming - Knapsack', Topics: 'Hard', link: 'https://example.com/knapsack' },
    { id: 4, title: 'Graph Traversals', Topics: 'Medium', link: 'https://example.com/graph-traversals' },
    { id: 5, title: 'Sliding Window', Topics: 'Medium', link: 'https://example.com/sliding-window' },
    { id: 6, title: 'Greedy Algorithms', Topics: 'Medium', link: 'https://example.com/greedy-algorithms' },
  ];

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
                <th>#</th>
                <th>Article</th>
                <th>Topics</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.id}>
                  <td>{topic.id}</td>
                  <td>{topic.title}</td>
                  <td>{topic.Topics}</td>
                  <td>
                    <a href={topic.link} target="_blank" rel="noopener noreferrer">
                      View Article
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
