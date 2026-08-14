import React, { useState } from 'react';
import { Newspaper } from '../types';
import { MOCK_NEWSPAPERS } from '../data/mockNews';
import { Calendar, FileText, Download, ExternalLink, Filter, Archive, BookOpen, Layers } from 'lucide-react';

interface ArchiveViewProps {
  onOpenArticleById: (articleId: string) => void;
}

const ARCHIVED_EDITIONS = [
  {
    id: 'ed-2026-11-14',
    date: 'November 14, 2026',
    editionName: 'Geneva Summit Special Broadsheet',
    paper: 'The Continental Post',
    leadHeadline: 'Geneva Reaches Historic Carbon Border Accord After Marathon Talks',
    storiesCount: 28,
    category: 'World Affairs & Climate',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    articleId: 'art-lead-geneva'
  },
  {
    id: 'ed-2026-11-13',
    date: 'November 13, 2026',
    editionName: 'Pan-Asian Interbank Clearing Edition',
    paper: 'The Pacific Tribune',
    leadHeadline: 'Atomic Cross-Border Settlement Protocol Approved in Singapore',
    storiesCount: 22,
    category: 'Economy & Trade',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    articleId: 'art-monetary-settle'
  },
  {
    id: 'ed-2026-11-12',
    date: 'November 12, 2026',
    editionName: 'European Science & Quantum Special',
    paper: 'The Daily Standard',
    leadHeadline: 'Consortium Demonstrates 10,000 Fault-Tolerant Qubits in Cryogenic Milestone',
    storiesCount: 25,
    category: 'Technology & AI',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    articleId: 'art-quantum-tech'
  },
  {
    id: 'ed-2026-11-11',
    date: 'November 11, 2026',
    editionName: 'City Financial & Commodity Markets',
    paper: 'The Financial Chronicle',
    leadHeadline: 'Industrial Margins Braced for Shock as Border Levies Take Shape',
    storiesCount: 31,
    category: 'Economy & Trade',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    articleId: 'art-financial-tariff'
  },
  {
    id: 'ed-2026-11-10',
    date: 'November 10, 2026',
    editionName: 'Global Ecological Transition Edition',
    paper: 'The Global Dispatch',
    leadHeadline: 'Offshore Geothermal Supergrid Connects First 12 Gigawatts',
    storiesCount: 24,
    category: 'Climate & Energy',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
    articleId: 'art-clean-energy'
  }
];

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onOpenArticleById }) => {
  const [selectedOutlet, setSelectedOutlet] = useState<string>('All');
  const [filterMonth, setFilterMonth] = useState<string>('November 2026');

  const filteredEditions = ARCHIVED_EDITIONS.filter((ed) => {
    if (selectedOutlet !== 'All' && ed.paper !== selectedOutlet) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="bg-[#0d0d0d] p-6 border border-white/10 rounded-sm shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-[#c5a059]" />
            <h2 className="font-editorial text-2xl font-bold text-white">
              Historical Broadsheet Archive & Edition Binders
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-editorial italic">
            Chronological registry of synchronized global morning editions, frontpage scans, and historical lead stories.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedOutlet}
            onChange={(e) => setSelectedOutlet(e.target.value)}
            className="text-xs px-3 py-1.5 bg-[#141414] text-white border border-white/10 rounded focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
          >
            <option value="All">All Indexed Mastheads</option>
            {MOCK_NEWSPAPERS.map((n) => (
              <option key={n.id} value={n.name} className="bg-[#141414] text-white">
                {n.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEditions.map((ed) => (
          <div
            key={ed.id}
            className="bg-[#0d0d0d] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between shadow-md hover:border-[#c5a059]/60 transition-all group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-[#141414] border-b border-white/5">
                <img
                  src={ed.image}
                  alt={ed.leadHeadline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-2 left-2 bg-[#c5a059] text-black text-[10px] font-mono-code font-bold px-2 py-0.5 rounded shadow-xs">
                  {ed.paper}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono-code">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    {ed.date}
                  </span>
                  <span>{ed.storiesCount} Dispatches</span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-white group-hover:text-[#e5c178] transition-colors leading-snug">
                  {ed.leadHeadline}
                </h3>

                <p className="text-xs text-gray-400 font-editorial italic">
                  {ed.editionName}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onOpenArticleById(ed.articleId)}
                  className="text-xs font-semibold text-[#c5a059] hover:text-[#e5c178] flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read Archived Story
                </button>

                <span className="text-[10px] font-mono-code text-gray-400 bg-[#141414] border border-white/5 px-2 py-0.5 rounded">
                  {ed.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
