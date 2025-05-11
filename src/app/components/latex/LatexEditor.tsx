'use client';

import React, { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from 'mathjax-react';

interface LatexEditorProps {
  initialValue?: string;
}

const LatexEditor: React.FC<LatexEditorProps> = ({ 
  initialValue = '\\int_{0}^{\\pi} \\sin(x) dx = 2' 
}) => {
  const [latex, setLatex] = useState(initialValue);
  const [rendered, setRendered] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  // Config for MathJax
  const config = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true,
      processEnvironments: true
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
    }
  };

  // Update the rendered output whenever latex changes
  useEffect(() => {
    // Add a slight delay to prevent rapid re-renders
    const timerId = setTimeout(() => {
      try {
        setRendered(latex);
        setError(null);
      } catch (err) {
        setError('Error rendering LaTeX');
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [latex]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LaTeX Input */}
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">LaTeX Editor</h3>
          <textarea 
            className="w-full h-64 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            placeholder="Enter LaTeX code here..."
          />
        </div>

        {/* Rendered Output */}
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Rendered Output</h3>
          <div className="w-full h-64 p-4 border rounded-md bg-gray-50 dark:bg-gray-700 overflow-auto">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <MathJaxContext config={config}>
                <MathJax>{rendered}</MathJax>
              </MathJaxContext>
            )}
          </div>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mt-6 p-4 border rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Quick Templates</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Integral', template: '\\int_{a}^{b} f(x) dx' },
            { label: 'Matrix', template: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
            { label: 'Fraction', template: '\\frac{a}{b}' },
            { label: 'Summation', template: '\\sum_{i=1}^{n} i^2' },
            { label: 'Limit', template: '\\lim_{x \\to \\infty} \\frac{1}{x}' },
          ].map((item, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
              onClick={() => setLatex(prevLatex => prevLatex + ' ' + item.template)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatexEditor; 