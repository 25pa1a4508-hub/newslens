import React, { useState } from 'react';
import { Newspaper, ViewTab } from '../types';
import { Search, Sparkles, BookOpen, Layers, GitCompare, BookmarkCheck, TrendingUp, Calendar, Globe2, FileText, ChevronRight, SlidersHorizontal, Sun, Moon, Volume2 } from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedNewspaper: string | null;
  onSelectNewspaper: (id: string | null) => void;
  newspapers: Newspaper[];
  onOpenQuickDigest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedNewspaper,
  onSelectNewspaper,
  newspapers,
  onOpenQuickDigest
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-40 shadow-xl">
      {/* Top Meta Bar */}
      <div className="border-b border-white/[0.08] bg-[#070707] px-4 py-1.5 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 font-medium text-gray-200">
              <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
              Friday, November 14, 2026
            </span>
            <span className="hidden sm:inline-block text-neutral-700">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-400">
              <Globe2 className="w-3.5 h-3.5 text-gray-500" />
              Global Broadsheet Intelligence Network
            </span>
            <span className="hidden md:inline-block text-neutral-700">|</span>
            <span className="hidden md:inline-block font-mono-code text-[11px] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2 py-0.5 rounded">
              Morning Synchronized Edition • Vol. CXLII
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQuickDigest}
              className="inline-flex items-center gap-1 text-xs font-semibold text-black bg-[#c5a059] hover:bg-[#d4af37] px-2.5 py-1 rounded transition-colors shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-black" />
              AI Daily Briefing
            </button>
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono-code">
              <span>INDEX: <strong className="text-emerald-400">+1.4%</strong></span>
              <span className="text-neutral-700">•</span>
              <span>CARBON: <strong className="text-[#c5a059]">€74.20</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Broadsheet Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Sub-tagline */}
          <div className="cursor-pointer" onClick={() => onTabChange('frontpage')}>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c5a059]">
                Multi-Perspective Broadsheet AI
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-white leading-none mt-1">
              NEWSLENS
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 italic font-editorial mt-1">
              "Veritas in Diversitate" — Objective Truth Synthesized Across Global Journalism
            </p>
          </div>

          {/* Quick Newspaper Selector Filter */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1 hidden lg:inline">
              Mastheads:
            </span>
            <button
              onClick={() => onSelectNewspaper(null)}
              className={`text-xs px-2.5 py-1 rounded-sm transition-all border ${
                selectedNewspaper === null
                  ? 'bg-[#c5a059] text-black border-[#c5a059] font-medium shadow-xs'
                  : 'bg-[#141414] text-gray-400 border-white/10 hover:bg-[#202020] hover:text-white'
              }`}
            >
              All Outlets
            </button>
            {newspapers.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectNewspaper(p.id === selectedNewspaper ? null : p.id)}
                className={`text-xs px-2 py-1 rounded-sm transition-all flex items-center gap-1 border ${
                  selectedNewspaper === p.id
                    ? 'bg-[#c5a059] text-black border-[#c5a059] font-medium shadow-xs'
                    : 'bg-[#141414] text-gray-400 border-white/10 hover:bg-[#202020] hover:text-white'
                }`}
                title={`${p.name} (${p.stance})`}
              >
                <span className="font-semibold text-[10px]">{p.shortCode}</span>
                <span className="hidden xl:inline">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Navigation Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs sm:text-sm">
            <button
              onClick={() => onTabChange('frontpage')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                currentTab === 'frontpage'
                  ? 'bg-[#c5a059] text-black shadow-xs font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Front Page
            </button>

            <button
              onClick={() => onTabChange('compare')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                currentTab === 'compare'
                  ? 'bg-[#c5a059] text-black shadow-xs font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              Perspective Radar
            </button>

            <button
              onClick={() => onTabChange('tracker')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                currentTab === 'tracker'
                  ? 'bg-[#c5a059] text-black shadow-xs font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Topic Threads
            </button>

            <button
              onClick={() => onTabChange('analyze')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                currentTab === 'analyze'
                  ? 'bg-[#c5a059] text-black shadow-xs font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              AI Broadsheet Analyzer
            </button>

            <button
              onClick={() => onTabChange('archive')}
              className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                currentTab === 'archive'
                  ? 'bg-[#c5a059] text-black shadow-xs font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Editions Archive
            </button>
          </nav>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search broadsheet stories & topics..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#141414] border border-white/10 rounded text-white placeholder-gray-500 focus:bg-[#1a1a1a] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </header>
  );
};
