'use client';

import React, { useState } from 'react';
import * as mathjs from 'mathjs';

interface SymbolicCalculatorProps {
  initialExpression?: string;
}

const SymbolicCalculator: React.FC<SymbolicCalculatorProps> = ({ 
  initialExpression = 'derivative("x^2 + 2*x", "x")' 
}) => {
  const [expression, setExpression] = useState(initialExpression);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [operation, setOperation] = useState<string>('evaluate');

  const handleCalculate = () => {
    try {
      setError(null);
      let calculationResult;

      // Handle different symbolic operations
      switch (operation) {
        case 'evaluate':
          calculationResult = mathjs.evaluate(expression);
          break;
        case 'simplify':
          calculationResult = mathjs.simplify(expression);
          break;
        case 'expand':
          // Use simplify with specific rule set for expansion
          calculationResult = mathjs.simplify(expression, {context: {}, exactFractions: true});
          break;
        case 'factor':
          // Note: factor is not directly available in mathjs core
          setError('Factoring is not available in this version');
          return;
        case 'solve':
          // For solving equations, simple approach using parser and numeric solver
          try {
            // Extract parts from equation format "expr1 = expr2"
            if (expression.includes('=')) {
              const [leftSide, rightSide] = expression.split('=').map(side => side.trim());
              // Move everything to one side: expr1 - expr2 = 0
              const equationToSolve = `${leftSide} - (${rightSide})`;
              // For simple equations, try to use derivative-based approach
              const derivative = mathjs.derivative(equationToSolve, 'x');
              calculationResult = "Root-finding is limited. Consider using dedicated solvers.";
            } else {
              setError('For equation solving, use format: expr1 = expr2');
              return;
            }
          } catch (err) {
            setError('Could not solve equation. Try a simpler form.');
            return;
          }
          break;
        default:
          calculationResult = mathjs.evaluate(expression);
      }

      // Convert the result to a string representation
      if (calculationResult === undefined) {
        setError('Could not calculate result');
        setResult('');
      } else if (typeof calculationResult === 'function') {
        setResult('Function defined');
      } else {
        // Try to make the output more readable
        const resultStr = calculationResult.toString();
        setResult(resultStr);
      }
    } catch (err) {
      console.error('Calculation error:', err);
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setResult('');
    }
  };

  // Examples for different operations
  const examples = {
    evaluate: [
      { label: 'Basic', expr: '2 + 3 * 4' },
      { label: 'Powers', expr: '2^3 + 4^2' },
      { label: 'Trig', expr: 'sin(pi/4) + cos(pi/3)' },
      { label: 'Complex', expr: '(2+3i) * (1-i)' },
    ],
    simplify: [
      { label: 'Basic', expr: 'x + x' },
      { label: 'Fraction', expr: '(x^2 - 1)/(x - 1)' },
      { label: 'Trig', expr: 'sin(x)^2 + cos(x)^2' },
      { label: 'Expression', expr: '2x + 3x - 4 + 2' },
    ],
    expand: [
      { label: 'Basic', expr: '(x+1)^2' },
      { label: 'Binomial', expr: '(x+2)*(x-3)' },
      { label: 'Complex', expr: '(x+y)^3' },
    ],
    solve: [
      { label: 'Linear', expr: '2*x + 3 = 7' },
      { label: 'Quadratic', expr: 'x^2 - 5*x + 6 = 0' },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Operation Selection */}
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Symbolic Calculator</h3>
          
          {/* Operation Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            {['evaluate', 'simplify', 'expand', 'solve'].map((op) => (
              <button
                key={op}
                className={`py-2 px-4 capitalize ${
                  operation === op 
                    ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setOperation(op)}
              >
                {op}
              </button>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {operation === 'evaluate' ? 'Expression:' : 
               operation === 'simplify' ? 'Expression to Simplify:' :
               operation === 'expand' ? 'Expression to Expand:' :
               operation === 'solve' ? 'Equation to Solve:' : 'Expression:'}
            </label>
            <textarea
              className="w-full h-24 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder={operation === 'solve' ? 'Enter equation (e.g., 2*x + 3 = 7)' : 'Enter mathematical expression'}
            />
          </div>
          
          {/* Action Button */}
          <button
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            onClick={handleCalculate}
          >
            {operation === 'evaluate' ? 'Calculate' : 
             operation === 'simplify' ? 'Simplify' :
             operation === 'expand' ? 'Expand' :
             operation === 'solve' ? 'Solve' : 'Calculate'}
          </button>
          
          {/* Error Display */}
          {error && (
            <div className="mt-3 p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
              {error}
            </div>
          )}
        </div>
        
        {/* Result Display */}
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Result</h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 border rounded-md min-h-[100px] font-mono">
            {result || <span className="text-gray-400">Result will appear here</span>}
          </div>
        </div>
        
        {/* Examples */}
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
          <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Examples</h3>
          <div className="flex flex-wrap gap-2">
            {examples[operation as keyof typeof examples]?.map((example, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={() => setExpression(example.expr)}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolicCalculator; 