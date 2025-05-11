'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// Use dynamic import to prevent SSR issues with CodeMirror
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownLatexEditorProps {
  initialValue?: string;
}

const defaultValue = `# Markdown + LaTeX Document

## Basic Markdown

You can use **bold**, *italic*, and \`inline code\` as usual in Markdown.

- Lists work as expected
- With multiple items
  - And nested items
  
## LaTeX Math

Inline math expressions like $E = mc^2$ can be embedded within text.

Block math expressions:

$$
\\int_{0}^{\\pi} \\sin(x) dx = 2
$$

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
$$

## Examples

The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

Maxwell's equations:

$$
\\begin{aligned}
\\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\
\\nabla \\cdot \\vec{B} &= 0 \\\\
\\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\
\\nabla \\times \\vec{B} &= \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}
\\end{aligned}
$$
`;

const MarkdownLatexEditor: React.FC<MarkdownLatexEditorProps> = ({
  initialValue = defaultValue,
}) => {
  const [markdown, setMarkdown] = useState(initialValue);
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'split'>('split');

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-md ${
            viewMode === 'editor'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          onClick={() => setViewMode('editor')}
        >
          Editor
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            viewMode === 'preview'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          onClick={() => setViewMode('preview')}
        >
          Preview
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            viewMode === 'split'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          onClick={() => setViewMode('split')}
        >
          Split
        </button>

        {/* LaTeX Insert Buttons */}
        <div className="flex-grow"></div>
        <div className="flex flex-wrap gap-1">
          {[
            { label: 'Inline Math', template: '$E = mc^2$' },
            { label: 'Block Math', template: '\n$$\n\\frac{a}{b}\n$$\n' },
            { label: 'Matrix', template: '\n$$\n\\begin{pmatrix}\na & b \\\\\nc & d\n\\end{pmatrix}\n$$\n' },
          ].map((item, index) => (
            <button
              key={index}
              className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              onClick={() => setMarkdown(prev => prev + ' ' + item.template)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            <div className="p-0">
              <MDEditor
                value={markdown}
                onChange={(val) => setMarkdown(val || '')}
                preview="edit"
                height={600}
              />
            </div>
            <div className="p-6 overflow-auto h-[600px]">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  // This wrapper div applies Tailwind prose styles to the rendered Markdown
                  p: ({node, ...props}) => <p className="my-2" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                  li: ({node, ...props}) => <li className="my-1" {...props} />,
                  code: ({node, inline, ...props}: any) => 
                    inline 
                      ? <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded" {...props} />
                      : <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded my-2 overflow-auto" {...props} />
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {viewMode === 'editor' && (
          <div className="p-0">
            <MDEditor
              value={markdown}
              onChange={(val) => setMarkdown(val || '')}
              preview="edit"
              height={600}
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="p-6 overflow-auto h-[600px]">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                // This wrapper div applies Tailwind prose styles to the rendered Markdown
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                li: ({node, ...props}) => <li className="my-1" {...props} />,
                code: ({node, inline, ...props}: any) => 
                  inline 
                    ? <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded" {...props} />
                    : <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded my-2 overflow-auto" {...props} />
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Document Controls */}
      <div className="mt-4 flex justify-between">
        <div>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
            onClick={() => setMarkdown(defaultValue)}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
            onClick={() => setMarkdown('')}
          >
            Clear
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            onClick={() => {
              // In a real app, this would save the document
              alert('Document saved (simulated)');
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownLatexEditor; 