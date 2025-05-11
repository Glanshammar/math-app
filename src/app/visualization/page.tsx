'use client';

import React from 'react';
import Link from 'next/link';
import ParametricSurface from '../components/3d-visualization/ParametricSurface';

export default function VisualizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              3D Visualization
            </h1>
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Return Home
            </Link>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Explore mathematical concepts through interactive 3D visualizations
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Parametric Surface Plotting
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <ParametricSurface width={500} height={400} />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Default Sphere Parameterization
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This example shows a parametric surface where:
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md font-mono text-sm mb-6">
                  x(u,v) = sin(u)cos(v)<br />
                  y(u,v) = sin(u)sin(v)<br />
                  z(u,v) = cos(u)
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  You can rotate, zoom, and pan using mouse controls:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
                  <li>Left-click + drag: Rotate</li>
                  <li>Scroll: Zoom in/out</li>
                  <li>Right-click + drag: Pan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Cross-Section Analysis",
                description: "Slice 3D objects to reveal 2D cross-sections with real-time volume calculations.",
              },
              {
                title: "Vector Fields",
                description: "Visualize vector fields with interactive force direction and magnitude representations.",
              },
              {
                title: "Differential Geometry",
                description: "Explore curvature, normal vectors, and other differential geometry concepts.",
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