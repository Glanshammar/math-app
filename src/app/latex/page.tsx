'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MarkdownLatexEditor from '../components/latex/MarkdownLatexEditor';
import LatexEditor from '../components/latex/LatexEditor';

export default function LatexPage() {
  const [activeTab, setActiveTab] = useState<'document' | 'equation'>('document');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              LaTeX Ecosystem
            </h1>
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Return Home
            </Link>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Create and edit documents with LaTeX mathematical expressions and Markdown formatting
          </p>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'document'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('document')}
          >
            Document Editor
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'equation'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('equation')}
          >
            Equation Editor
          </button>
        </div>

        {/* Content */}
        {activeTab === 'document' ? (
          <section>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <MarkdownLatexEditor />
            </div>
          </section>
        ) : (
          <section>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <LatexEditor />
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Markdown + LaTeX",
                description: "Combine the simplicity of Markdown with the power of LaTeX for mathematical expressions.",
              },
              {
                title: "Real-time Preview",
                description: "See your formatted document and rendered equations instantly as you type.",
              },
              {
                title: "Equation Editor",
                description: "Dedicated equation editor for creating complex mathematical expressions.",
              },
              {
                title: "Customizable Templates",
                description: "Quick-insert common structures like matrices, fractions, and integrals.",
              },
              {
                title: "Export Options",
                description: "Export your document in various formats including PDF and HTML.",
              },
              {
                title: "Collaborative Editing",
                description: "Work together on documents with real-time collaboration (coming soon).",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 