'use client'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import snippets from '@/data/snippets.json';

export default function Home() {
  const [search, setSearch] = useState('');
  const [filteredSnippets, setFilteredSnippets] = useState(snippets);
  const [activeTab, setActiveTab] = useState('JavaScript');

  useEffect(() => {
    setFilteredSnippets(
      snippets.filter(snippet => 
        snippet.category === activeTab &&
        (snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.category.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, activeTab]);

  return (
    <>
      <Head>
        <title>Code Snippet Library</title>
        <meta name="description" content="A library of useful code snippets for developers." />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Code Snippet Library</h1>
        <div className="mb-4">
          <button 
            onClick={() => setActiveTab('JavaScript')} 
            className={`px-4 py-2 rounded-t ${activeTab === 'JavaScript' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            JavaScript
          </button>
          <button 
            onClick={() => setActiveTab('React')} 
            className={`px-4 py-2 rounded-t ${activeTab === 'React' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            React
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Search snippets..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSnippets.map((snippet,index) => (
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition" key={index}>
              <h2 className="text-xl font-semibold mb-2">{snippet.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{snippet.category}</p>
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">{snippet.code}</pre>
              <button 
                onClick={() => navigator.clipboard.writeText(snippet.code)}
                className="mt-2 bg-blue-500 text-white rounded p-1 text-sm hover:bg-blue-600 transition"
              >
                Copy to Clipboard
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
