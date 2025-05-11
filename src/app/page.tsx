import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Advanced Math Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive mathematical toolkit for visualization, computation, and collaboration
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3D Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              3D Visualization
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Interactive 3D modeling, parametric surfaces, and dynamic graph visualization.
            </p>
            <Link
              href="/visualization"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Explore
            </Link>
          </div>

          {/* LaTeX Ecosystem */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              LaTeX Ecosystem
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Collaborative equation editing, document creation, and smart LaTeX automation.
            </p>
            <Link
              href="/latex"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create
            </Link>
          </div>

          {/* Graphing Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Advanced Graphing
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              2D graphs with polar/parametric support, inequality shading, and dynamic transformations.
            </p>
            <Link
              href="/graphing"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Graph
            </Link>
          </div>

          {/* Symbolic Math */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Symbolic Computation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              CAS features including symbolic calculus, number theory, and advanced algebra.
            </p>
            <Link
              href="/symbolic"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Compute
            </Link>
          </div>

          {/* Collaboration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Collaborative Whiteboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Multi-user workspaces, session recording, and team problem-solving tools.
            </p>
            <Link
              href="/collaborate"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Collaborate
            </Link>
          </div>

          {/* AI Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              AI-Powered Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Adaptive learning, personalized tutoring, and intelligent problem generation.
            </p>
            <Link
              href="/ai-learning"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Learn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
