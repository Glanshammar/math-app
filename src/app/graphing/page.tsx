'use client';

import React from 'react';
import Link from 'next/link';
import FunctionPlotter from '../components/graphing/FunctionPlotter';

export default function GraphingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              Advanced Graphing
            </h1>
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Return Home
            </Link>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Create, analyze, and manipulate 2D graphs with advanced coordinate systems
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Function Plotter
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <FunctionPlotter />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Polar Coordinates",
                description: "Plot functions in polar form, like r = f(θ), with animation support.",
              },
              {
                title: "Inequality Shading",
                description: "Visualize systems of inequalities with automatic region shading.",
              },
              {
                title: "Graph Transformations",
                description: "Use interactive sliders to dynamically modify function parameters.",
              },
              {
                title: "Data Plotting",
                description: "Plot empirical data points with regression analysis and curve fitting.",
              },
              {
                title: "Multivariable Functions",
                description: "Visualize functions of multiple variables with contour plots and heat maps.",
              },
              {
                title: "Differential Equations",
                description: "Graph solutions to differential equations with direction fields.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
                <span className="inline-block mt-4 text-blue-500 text-sm">Coming Soon</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 