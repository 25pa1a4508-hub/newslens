import React from 'react';
import { Sparkles, X, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { TopicThread } from '../types';

interface QuickDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
  topics: TopicThread[];
  onOpenTopicCompare: (topicId: string) => void;
}

export const QuickDigestModal: React.FC<QuickDigestModalProps> = ({
  isOpen,
  onClose,
  topics,
  onOpenTopicCompare
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0d0d0d] text-gray-200 border border-white/10 rounded-sm max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-editorial text-2xl font-bold text-white">
              AI Broadsheet Executive Digest
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Summary */}
        <div className="bg-[#141414] p-4 rounded border-l-3 border-[#c5a059] border-t border-r border-b border-white/5 space-y-2">
          <div className="text-xs font-mono-code uppercase font-bold text-[#e5c178]">
            Today's Global Synchronized Snapshot
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-editorial">
            Diplomatic and technological pacts dominate today's frontpages. The <strong className="text-white">Geneva Carbon Accord</strong> has unified regulatory coverage across European and Island nations, while financial outlets emphasize industrial margin adaptation. In tech, <strong className="text-white">fault-tolerant quantum thresholds</strong> have cleared commercial verification.
          </p>
        </div>

        {/* Key Threads Highlights */}
        <div className="space-y-3">
          <div className="text-xs font-mono-code uppercase font-bold text-gray-400">
            Active High-Velocity Threads
          </div>
          <div className="space-y-2.5">
            {topics.slice(0, 3).map((topic) => (
              <div
                key={topic.id}
                onClick={() => {
                  onClose();
                  onOpenTopicCompare(topic.id);
                }}
                className="bg-[#141414] hover:bg-[#1f1f1f] p-3.5 rounded flex items-center justify-between gap-4 cursor-pointer transition-colors border border-white/5 hover:border-[#c5a059]/40"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono-code text-[#c5a059] mb-1">
                    <span>{topic.category}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-emerald-400">{topic.velocity}</span>
                  </div>
                  <h4 className="font-editorial text-sm font-bold text-white">
                    {topic.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-[#c5a059] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            Synthesized across 16 indexed broadsheets
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold bg-[#c5a059] hover:bg-[#d4af37] text-black px-4 py-1.5 rounded transition-colors shadow-xs"
          >
            Close Digest
          </button>
        </div>
      </div>
    </div>
  );
};
