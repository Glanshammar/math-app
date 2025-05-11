'use client';

import React, { useState, useEffect } from 'react';
import Plotly, { ScatterData, Layout } from 'plotly.js';
import * as mathjs from 'mathjs';

interface FunctionPlotterProps {
  initialFunction?: string;
  xRange?: [number, number];
  yRange?: [number, number];
}

const FunctionPlotter: React.FC<FunctionPlotterProps> = ({ 
  initialFunction = 'x^2', 
  xRange = [-10, 10], 
  yRange = [-10, 10]
}) => {
  const [functionExpression, setFunctionExpression] = useState(initialFunction);
  const [error, setError] = useState<string | null>(null);
  const [plotContainer, setPlotContainer] = useState<HTMLDivElement | null>(null);

  // Generate points for the plot
  const generatePoints = (func: string, xMin: number, xMax: number, numPoints = 1000) => {
    try {
      // Parse the function using mathjs
      const expression = mathjs.compile(func);
      
      // Create x values
      const step = (xMax - xMin) / numPoints;
      const xValues = Array.from({ length: numPoints + 1 }, (_, i) => xMin + i * step);
      
      // Evaluate the function at each x value
      const yValues = xValues.map((x) => {
        try {
          const result = expression.evaluate({ x });
          // Check if the result is a valid number
          return !isNaN(result) && isFinite(result) ? result : null;
        } catch (err) {
          return null;
        }
      });
      
      return { xValues, yValues };
    } catch (err) {
      console.error('Function parsing error:', err);
      setError('Invalid function expression');
      return { xValues: [], yValues: [] };
    }
  };

  // Create or update the plot
  useEffect(() => {
    if (!plotContainer) return;
    
    try {
      setError(null);
      
      // Generate the data points
      const { xValues, yValues } = generatePoints(functionExpression, xRange[0], xRange[1]);
      
      // Check if we have valid data
      if (xValues.length === 0 || yValues.every(y => y === null)) {
        setError('Unable to plot function');
        return;
      }
      
      // Create the plot data
      const trace: Partial<ScatterData> = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        type: 'scatter',
        line: { color: '#0088FF', width: 2 }
      };
      
      // Layout configuration
      const layout: Partial<Layout> = {
        title: { text: `y = ${functionExpression}` },
        xaxis: {
          title: { text: 'x' },
          range: xRange,
          zeroline: true,
          zerolinecolor: '#000000',
          gridcolor: '#EEEEEE'
        },
        yaxis: {
          title: { text: 'y' },
          range: yRange,
          zeroline: true,
          zerolinecolor: '#000000',
          gridcolor: '#EEEEEE'
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
        margin: { l: 50, r: 20, t: 50, b: 50 },
        autosize: true
      };
      
      // Create the plot
      Plotly.newPlot(plotContainer, [trace], layout);
    } catch (err) {
      console.error('Plotting error:', err);
      setError('Error creating plot');
    }
    
    // Cleanup on unmount or before re-render
    return () => {
      if (plotContainer) {
        Plotly.purge(plotContainer);
      }
    };
  }, [functionExpression, xRange, yRange, plotContainer]);

  // Common function examples
  const functionExamples = [
    { label: 'Quadratic', func: 'x^2' },
    { label: 'Cubic', func: 'x^3' },
    { label: 'Sine', func: 'sin(x)' },
    { label: 'Exponential', func: 'exp(x)' },
    { label: 'Logarithm', func: 'log(x)' },
    { label: 'Complex', func: 'sin(x) * exp(-x/5) * cos(x)' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Function Input */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 mb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <label htmlFor="function-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Function f(x) =
            </label>
            <input
              id="function-input"
              type="text"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={functionExpression}
              onChange={(e) => setFunctionExpression(e.target.value)}
              placeholder="Enter a mathematical expression (e.g. x^2, sin(x))"
            />
          </div>
          <div>
            <button
              className="w-full md:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              onClick={() => {
                // Re-plot with the current function
                if (plotContainer) {
                  Plotly.purge(plotContainer);
                  const { xValues, yValues } = generatePoints(functionExpression, xRange[0], xRange[1]);
                  if (xValues.length > 0 && !yValues.every(y => y === null)) {
                    const trace: Partial<ScatterData> = {
                      x: xValues, 
                      y: yValues, 
                      mode: 'lines', 
                      type: 'scatter'
                    };
                    const layout: Partial<Layout> = {
                      title: { text: `y = ${functionExpression}` },
                      xaxis: { title: { text: 'x' }, range: xRange },
                      yaxis: { title: { text: 'y' }, range: yRange }
                    };
                    Plotly.newPlot(plotContainer, [trace], layout);
                  }
                }
              }}
            >
              Plot
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>
      
      {/* Function Examples */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Examples:</h3>
        <div className="flex flex-wrap gap-2">
          {functionExamples.map((example, index) => (
            <button
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setFunctionExpression(example.func)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Plot Container */}
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
        <div 
          ref={setPlotContainer}
          className="w-full h-[400px]"
        />
      </div>
    </div>
  );
};

export default FunctionPlotter; 