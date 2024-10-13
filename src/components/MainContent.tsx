// app/components/MainContent.tsx
"use client"; // This directive makes this component a Client Component

import { useEffect, useState } from 'react';

const MainContent = () => {
  const [data, setData] = useState({ interviewQuestions: [], dsaByTopics: [], popularAlgorithm: [], systemDesign: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <main className="main_content">
      <div className="full_content">
        {/* First Section */}
        {/* <div className="list_section">
          <div className="grid_container">
            {data.interviewQuestions.map((item, index) => (
              <div className="grid_item" key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <p>{item.title}</p>
                  <span>Last Updated: {item.lastUpdated}</span>
                </a>
              </div>
            ))}
          </div>
        </div> */}

        {/* Second Section */}
        <div className="culumns">
          <div className="list_content">
            <div className="culumn_heading">
              <h2>Learn DSA by Topics</h2>
            </div>
            {data.dsaByTopics.map((form, index) => (
              <article key={index}>
                <p>
                  <a href={form.url}>{form.title}</a>
                  {form.isNew && <span className="badge">New</span>}
                </p>
              </article>
            ))}
          </div>

          <div className="list_content">
            <div className="culumn_heading">
              <h2>Learn Algorithim</h2>
            </div>
            {data.popularAlgorithm.map((card, index) => (
              <article key={index}>
                <p><a href={card.url}>{card.title}</a></p>
              </article>
            ))}
          </div>
        </div>


        <div className="culumns">
          <div className="list_content">
            <div className="culumn_heading">
              <h2>System Design</h2>
            </div>
            {data.systemDesign.map((form, index) => (
              <article key={index}>
                <p>
                  <a href={form.url}>{form.title}</a>
                  {form.isNew && <span className="badge">New</span>}
                </p>
              </article>
            ))}
          </div>

          <div className="list_content">
            <div className="culumn_heading">
              <h2>Best Resources</h2>
            </div>
            {data.popularAlgorithm.map((card, index) => (
              <article key={index}>
                <p><a href={card.url}>{card.title}</a></p>
              </article>
            ))}
          </div>
        </div>



      </div>
    </main>
  );
};

export default MainContent;

  