import React, { useState } from 'react';
import { TopicThread } from '../types';
import { TrendingUp, Activity, GitCompare, ArrowUpRight, Search, Plus, CheckCircle2, Clock, Globe } from 'lucide-react';

interface TopicTrackerViewProps {
  topics: TopicThread[];
  onOpenTopicCompare: (topicId: string) => void;
  onSelectTopicDispatch: (topicId: string) => void;
}

export const TopicTrackerView: React.FC<TopicTrackerViewProps> = ({
  topics,
  onOpenTopicCompare,
  onSelectTopicDispatch,
}) => {
  const [search, setSearch] = useState('');
  const [customTopicModal, setCustomTopicModal] = useState(false);
  const [newTopicQuery, setNewTopicQuery] = useState('');

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.keyEntities.some((e) => e.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Bar */}
      <div className="bg-[#0d0d0d] p-6 border border-white/10 rounded-sm shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#c5a059]" />
            <h2 className="font-editorial text-2xl font-bold text-white">
              Topic Thread Velocity & Narrative Trajectory
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-editorial italic">
            Continuous multi-day monitoring of evolving global stories, outlet consensus, and sentiment shifts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter tracked threads..."
              className="pl-8 pr-3 py-1.5 text-xs bg-[#141414] border border-white/10 rounded text-white placeholder-gray-500 focus:bg-[#1a1a1a] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
            />
          </div>

          <button
            onClick={() => setCustomTopicModal(true)}
            className="text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d4af37] px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Track New Thread
          </button>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTopics.map((topic) => {
          const velocityColor = 
            topic.velocity === 'Surging' ? 'bg-[#3b1212] text-[#ff8080] border border-[#5c1c1c]' :
            topic.velocity === 'Developing' ? 'bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30' :
            'bg-[#171717] text-gray-400 border border-white/5';

          return (
            <div
              key={topic.id}
              className="bg-[#0d0d0d] border border-white/10 rounded-sm p-6 space-y-4 shadow-md hover:border-[#c5a059]/60 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <span className="text-xs font-mono-code font-bold uppercase text-[#c5a059]">
                    {topic.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {topic.lastUpdated}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${velocityColor}`}>
                      {topic.velocity}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-xl font-bold text-white leading-snug mt-3 mb-2">
                  {topic.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {topic.summary}
                </p>

                {/* 7-Day Trajectory Sparkline Graphic */}
                <div className="bg-[#141414] p-3.5 rounded border border-white/10 mb-4">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2 font-mono-code">
                    <span>7-Day Sentiment Trajectory</span>
                    <span className="font-bold text-[#c5a059]">
                      {topic.sentimentTrajectory[topic.sentimentTrajectory.length - 1]}% Favorability
                    </span>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="h-12 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                      <defs>
                        <linearGradient id={`grad-${topic.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c5a059" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#c5a059" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Trajectory Path */}
                      <path
                        d={topic.sentimentTrajectory.map((val, idx) => {
                          const x = (idx / (topic.sentimentTrajectory.length - 1)) * 100;
                          const y = 40 - (val / 100) * 35;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#c5a059"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Data Dots */}
                      {topic.sentimentTrajectory.map((val, idx) => {
                        const x = (idx / (topic.sentimentTrajectory.length - 1)) * 100;
                        const y = 40 - (val / 100) * 35;
                        return (
                          <circle
                            key={idx}
                            cx={x}
                            cy={y}
                            r="2.5"
                            fill="#e5c178"
                            className="hover:r-4 transition-all"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Key Entities */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1.5 uppercase">
                    Key Stakeholders & Entities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.keyEntities.map((ent, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 px-2 py-0.5 rounded font-mono-code"
                      >
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="text-gray-400">
                  <strong className="text-white">{topic.articlesCount}</strong> dispatches • <strong className="text-white">{topic.outletsCovering}</strong> mastheads
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTopicCompare(topic.id)}
                    className="text-xs font-semibold text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 hover:bg-[#c5a059]/20 px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    Cross-Audit
                  </button>
                  <button
                    onClick={() => onSelectTopicDispatch(topic.id)}
                    className="text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d4af37] px-2.5 py-1 rounded flex items-center gap-1 transition-colors shadow-xs"
                  >
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Custom Topic Modal */}
      {customTopicModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0d0d0d] rounded-sm p-6 max-w-md w-full border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-editorial text-lg font-bold text-white">
                Add Broadsheet Topic Monitor
              </h3>
              <button
                onClick={() => setCustomTopicModal(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Enter a subject, geopolitical policy, or company to track multi-perspective coverage across all indexed broadsheets.
            </p>

            <input
              type="text"
              value={newTopicQuery}
              onChange={(e) => setNewTopicQuery(e.target.value)}
              placeholder="e.g. Next-Generation Solid-State Electrolytes"
              className="w-full px-3 py-2 text-xs bg-[#141414] border border-white/10 text-white rounded focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCustomTopicModal(false)}
                className="px-3 py-1.5 text-xs text-gray-400 hover:bg-[#1a1a1a] rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newTopicQuery.trim()) {
                    alert(`Thread "${newTopicQuery}" added to real-time broadsheet ingestion monitor.`);
                    setNewTopicQuery('');
                    setCustomTopicModal(false);
                  }
                }}
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d4af37] rounded"
              >
                Start Monitoring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
