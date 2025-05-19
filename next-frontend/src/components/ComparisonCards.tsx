import React from 'react'

const ComparisonCards = () => {
  return (
   <div className="border border-white/10 m-10 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Original Document */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Original Document</h3>
      <div className="aspect-[3/2] rounded-lg border border-white/10 bg-black/50 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
          <span className="text-xs text-muted-foreground ml-2">Financial_Report_2024.pdf</span>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
            <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
            <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse"></div>
            <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
            <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse"></div>
            <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
            <div className="h-3 w-3/4 bg-white/5 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    {/* AI Summary */}
    <div>
      <h3 className="text-xl font-semibold mb-4">AI Summary</h3>
      <div className="aspect-[3/2] rounded-lg border border-white/10 bg-black/50 flex flex-col overflow-hidden relative">
        <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-brain-circuit h-4 w-4 text-blue-400"
          >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M9 13a4.5 4.5 0 0 0 3-4" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M12 13h4" />
            <path d="M12 18h6a2 2 0 0 1 2 2v1" />
            <path d="M12 8h8" />
            <path d="M16 8V5a2 2 0 0 1 2-2" />
            <circle cx="16" cy="13" r=".5" />
            <circle cx="18" cy="3" r=".5" />
            <circle cx="20" cy="21" r=".5" />
            <circle cx="20" cy="8" r=".5" />
          </svg>
          <span className="text-xs text-muted-foreground">Executive Summary</span>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Key Financial Highlights</h4>
            <ul className="text-xs text-muted-foreground space-y-2 pl-4">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Revenue increased by 23% to $1.2B in FY2024</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Operating margins improved to 18.2%</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                <span>Cash reserves at $340M, up 15% YoY</span>
              </li>
            </ul>

            <h4 className="text-sm font-medium mt-4">Strategic Initiatives</h4>
            <p className="text-xs text-muted-foreground">
              The company launched 3 new product lines, expanding market share in APAC region by 12%. R&amp;D investments increased to 15% of revenue, focusing on AI integration.
            </p>

            <h4 className="text-sm font-medium mt-4">Risk Factors</h4>
            <p className="text-xs text-muted-foreground">
              Supply chain disruptions remain a concern, with mitigation strategies in place. Foreign exchange volatility expected to impact Q1 2025 results.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
      </div>
    </div>
  </div>
</div>

  )
}

export default ComparisonCards