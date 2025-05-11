import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5EDE3] text-gray-800">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-400">LOGO</div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/visualization" className="text-gray-700 hover:text-gray-900">Visualization</Link>
          <Link href="/graphing" className="text-gray-700 hover:text-gray-900">Graphing</Link>
          <Link href="/symbolic" className="text-gray-700 hover:text-gray-900">Symbolic</Link>
          <Link href="/latex" className="text-gray-700 hover:text-gray-900">LaTeX</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/latex" className="px-4 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100">Document Editor</Link>
          <Link href="/visualization" className="px-4 py-2 bg-[#DDBA6F] rounded-full text-white hover:bg-[#C9A45F]">3D Math</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Section with Illustration */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative py-8">
            <div className="absolute top-0 left-0 w-full h-full bg-[#F5EDE3] rounded-br-[30%]"></div>
            <div className="relative z-10 flex justify-center">
              <div className="relative w-[80%] max-w-md">
                {/* Math teacher image placeholder with blackboard */}
                <div className="relative bg-[#F5EDE3] rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-[#654321] w-3/4 h-32 mx-auto mt-4 rounded-md relative">
                    {/* Blackboard with math equation */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                      <div>
                        <div className="mb-2">a² + b² = c²</div>
                        <div className="flex items-center">
                          <svg viewBox="0 0 100 100" className="w-12 h-12">
                            <path d="M10,50 L40,10 L40,90 Z" fill="white" />
                            <text x="25" y="45" fontSize="8" fill="white">a</text>
                            <text x="25" y="65" fontSize="8" fill="white">b</text>
                            <text x="15" y="55" fontSize="8" fill="white">c</text>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Character */}
                  <div className="flex justify-center pb-4">
                    <div className="relative w-32 h-64">
                      {/* Head */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#FFD3B4] rounded-full">
                        {/* Face */}
                        <div className="absolute top-3 left-3 w-4 h-1 bg-black rounded-full"></div>
                        <div className="absolute top-3 right-3 w-4 h-1 bg-black rounded-full"></div>
                        <div className="absolute top-8 left-6 w-4 h-2 bg-[#FF9191] rounded-full"></div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black rounded-full"></div>
                        
                        {/* Glasses */}
                        <div className="absolute top-3 left-2 w-12 h-3 border-t-2 border-black"></div>
                        <div className="absolute top-3 left-2 w-5 h-5 border-2 border-black rounded-full"></div>
                        <div className="absolute top-3 right-2 w-5 h-5 border-2 border-black rounded-full"></div>
                      </div>
                      
                      {/* Body */}
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-24 h-40 bg-[#8B4513] rounded-t-lg">
                        {/* Shirt */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-[#87CEEB] rounded"></div>
                        
                        {/* Book */}
                        <div className="absolute top-16 left-1 w-8 h-10 bg-[#F5DEB3] transform rotate-12 border border-black">
                          <div className="absolute top-1 left-1 w-6 h-1 bg-black"></div>
                          <div className="absolute top-3 left-1 w-6 h-1 bg-black"></div>
                          <div className="h-4 w-full bg-[#FFA500] absolute bottom-0 flex items-center justify-center">
                            <span className="text-[6px] font-bold">MATH</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Desk */}
                      <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-56 h-6 bg-[#D2B48C] rounded-md shadow-md"></div>
                      <div className="absolute top-62 left-44 w-3 h-12 bg-[#A0522D]"></div>
                      <div className="absolute top-62 right-44 w-3 h-12 bg-[#A0522D]"></div>
                      
                      {/* Items on desk */}
                      <div className="absolute top-52 left-24 w-8 h-4 bg-red-600 shadow-sm"></div>
                      <div className="absolute top-52 left-14 w-6 h-8 bg-blue-700 transform -rotate-12 shadow-sm"></div>
                      <div className="absolute top-52 right-14 w-5 h-6 bg-green-700 transform rotate-6 shadow-sm"></div>
                      <div className="absolute top-53 right-8 w-2 h-4 bg-yellow-500 rounded-t-sm shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section with Text */}
        <div className="w-full md:w-1/2 p-8 bg-[#BE9D7E] rounded-bl-[100px] text-white py-16">
          <div className="max-w-lg mx-auto">
            <h1 className="text-6xl font-bold mb-4">MATHEMATICS</h1>
            <h2 className="text-4xl font-bold mb-6">Mathematic Lessons</h2>
            <p className="mb-8">
              Explore advanced mathematical concepts with our interactive tools. Visualize complex functions, 
              work with symbolic computation, and create professional-quality documents with LaTeX.
            </p>
            <Link 
              href="/graphing" 
              className="inline-block px-8 py-3 bg-[#4EB89E] rounded-full text-white hover:bg-[#3EA88E] transition-colors"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="container mx-auto flex justify-center mt-4">
        <div className="flex space-x-2">
          <span className="w-2 h-2 bg-[#BE9D7E] rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>

      {/* Chat Bubble */}
      <div className="fixed bottom-8 right-8">
        <div className="w-12 h-12 bg-[#BE9D7E] rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
