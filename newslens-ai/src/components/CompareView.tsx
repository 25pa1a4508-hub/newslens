import React, { useState } from 'react';
import { Article, PerspectiveComparison, TopicThread } from '../types';
import { MOCK_PERSPECTIVES, MOCK_TOPICS } from '../data/mockNews';
import { Sparkles, GitCompare, CheckCircle2, AlertTriangle, ShieldCheck, Scale, Quote, ArrowRight, ExternalLink, Sliders } from 'lucide-react';

interface CompareViewProps {
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onSelectArticleByTopic: (topicId: string, outletId?: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  selectedTopicId,
  onSelectTopic,
  onSelectArticleByTopic
}) => {
  const currentTopic = MOCK_TOPICS.find((t) => t.id === selectedTopicId) || MOCK_TOPICS[0];
  const perspectives = MOCK_PERSPECTIVES[currentTopic.id] || MOCK_PERSPECTIVES['topic-carbon-accord'] || [];
  
  const [selectedFilterTone, setSelectedFilterTone] = useState<string>('All');
  const [highlightKeyword, setHighlightKeyword] = useState<string | null>(null);

  const filteredPerspectives = perspectives.filter((p) => {
    if (selectedFilterTone !== 'All' && p.tone !== selectedFilterTone) return false;
    if (highlightKeyword && !p.focusKeywords.includes(highlightKeyword)) return false;
    return true;
  });

  // Extract all unique keywords for filter chips
  const allKeywords = Array.from(new Set(perspectives.flatMap((p) => p.focusKeywords)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Top Topic Switcher */}
      <div className="bg-[#0d0d0d] p-5 border border-white/10 rounded-sm shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-[#c5a059]" />
            <h2 className="font-editorial text-2xl font-bold text-white">
              Perspective Radar & Framing Cross-Audit
            </h2>
          </div>
          <span className="text-xs font-mono-code text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 px-2.5 py-1 rounded font-semibold">
            {perspectives.length} Mastheads Cross-Audited
          </span>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          {MOCK_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                onSelectTopic(topic.id);
                setHighlightKeyword(null);
              }}
              className={`text-xs px-3.5 py-2 rounded-sm font-medium whitespace-nowrap transition-all border ${
                topic.id === currentTopic.id
                  ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-xs font-semibold'
                  : 'bg-[#141414] text-gray-400 border-white/10 hover:bg-[#202020] hover:text-white'
              }`}
            >
              {topic.title.length > 45 ? topic.title.substring(0, 45) + '...' : topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Synthesis Executive Matrix (AI Analysis) */}
      <div className="bg-[#0d0d0d] text-white p-6 rounded-sm border border-white/10 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#e5c178]">
              Executive AI Synthesis: {currentTopic.title}
            </h3>
          </div>
          <span className="text-xs font-mono-code text-gray-400">
            Category: {currentTopic.category} • Velocity: {currentTopic.velocity}
          </span>
        </div>

        <p className="text-sm sm:text-base text-gray-300 font-editorial italic leading-relaxed">
          "{currentTopic.aiExecutiveBrief}"
        </p>

        {/* Split Grid: Consensus vs Contested Debates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Consensus */}
          <div className="bg-[#141414] p-4 rounded border-t-2 border-[#c5a059] border-r border-b border-l border-white/5">
            <div className="flex items-center gap-2 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Verified Consensus Points (Agreed Across All Outlets)
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {currentTopic.consensusPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#c5a059] font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contested Points */}
          <div className="bg-[#141414] p-4 rounded border-t-2 border-[#e05656] border-r border-b border-l border-white/5">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-4 h-4 text-[#ff8080]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff8080]">
                Polarizing Framing & Disputed Angles
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {currentTopic.polarizingDebates.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ff8080] font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Filter & Keyword Slicers */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0d0d] p-4 border border-white/10 rounded-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase mr-1">
            Filter Framing Tone:
          </span>
          {['All', 'Neutral-Analytical', 'Optimistic', 'Cautionary', 'Critical', 'Urgent'].map((tone) => (
            <button
              key={tone}
              onClick={() => setSelectedFilterTone(tone)}
              className={`text-xs px-2.5 py-1 rounded transition-colors border ${
                selectedFilterTone === tone
                  ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold'
                  : 'bg-[#141414] text-gray-400 border-white/5 hover:bg-[#202020] hover:text-white'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        {allKeywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-xs text-gray-400 font-medium mr-1">Highlight Focus:</span>
            {allKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => setHighlightKeyword(highlightKeyword === kw ? null : kw)}
                className={`text-[11px] px-2 py-0.5 rounded font-mono-code transition-all border ${
                  highlightKeyword === kw
                    ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                    : 'bg-[#c5a059]/10 text-[#c5a059] border-[#c5a059]/30 hover:bg-[#c5a059]/20'
                }`}
              >
                #{kw}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Side-by-Side Masthead Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPerspectives.map((persp) => {
          const isPositive = persp.sentimentScore > 0.2;
          const isNegative = persp.sentimentScore < -0.2;
          const toneBadgeColor = 
            persp.tone === 'Optimistic' ? 'bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30' :
            persp.tone === 'Cautionary' ? 'bg-[#3b1212] text-[#ff8080] border border-[#5c1c1c]' :
            persp.tone === 'Critical' ? 'bg-[#3b1212] text-[#ff8080] border border-[#5c1c1c]' :
            'bg-[#171717] text-gray-300 border border-white/10';

          return (
            <div
              key={persp.outletId}
              className="bg-[#0d0d0d] border border-white/10 rounded-sm p-5 flex flex-col justify-between shadow-md hover:border-[#c5a059]/60 transition-all"
            >
              <div>
                {/* Outlet Header & Stance */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <h4 className="font-editorial text-base font-bold text-[#c5a059]">
                      {persp.outletName}
                    </h4>
                    <span className="text-[11px] font-medium text-gray-400">
                      Stance: {persp.stance}
                    </span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${toneBadgeColor}`}>
                    {persp.tone}
                  </span>
                </div>

                {/* Outlet Headline */}
                <h3 className="font-editorial text-lg font-bold text-white leading-snug mb-3">
                  "{persp.headline}"
                </h3>

                {/* Primary Framing Angle */}
                <div className="mb-4 bg-[#141414] p-3 rounded text-xs text-gray-300 border-l-2 border-[#c5a059] border-t border-r border-b border-white/5">
                  <strong className="block text-white mb-1 font-sans-ui">Core Framing Angle:</strong>
                  {persp.keyAngle}
                </div>

                {/* Featured Quote */}
                <div className="mb-4 relative pl-3 border-l-2 border-white/20 italic text-xs text-gray-400 font-editorial">
                  <Quote className="w-3.5 h-3.5 text-gray-500 absolute -left-2 top-0" />
                  "{persp.featuredQuote}"
                </div>

                {/* Focus Keywords / Framing Tokens */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {persp.focusKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono-code border ${
                        highlightKeyword === kw
                          ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                          : 'bg-[#171717] text-gray-400 border-white/5'
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sentiment Score & Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">Sentiment:</span>
                  <span className={`font-mono-code font-bold ${
                    isPositive ? 'text-emerald-400' :
                    isNegative ? 'text-[#ff8080]' :
                    'text-gray-300'
                  }`}>
                    {persp.sentimentScore > 0 ? `+${persp.sentimentScore.toFixed(2)}` : persp.sentimentScore.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectArticleByTopic(currentTopic.id, persp.outletId)}
                  className="text-xs font-semibold text-[#c5a059] hover:text-[#e5c178] flex items-center gap-1"
                >
                  Read Dispatch
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
