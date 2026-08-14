import React, { useState } from 'react';
import { Article, Newspaper, TopicThread } from '../types';
import { Sparkles, GitCompare, Bookmark, Share2, ArrowRight, TrendingUp, CheckCircle2, AlertCircle, Quote, Clock, Filter, Eye, ChevronRight } from 'lucide-react';

interface FrontPageViewProps {
  articles: Article[];
  topics: TopicThread[];
  newspapers: Newspaper[];
  onSelectArticle: (article: Article) => void;
  onOpenCompare: (topicId: string) => void;
  onOpenTopic: (topicId: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES = [
  'All Sections',
  'Climate & Energy',
  'Technology & AI',
  'Economy & Trade',
  'Governance',
  'Science'
];

export const FrontPageView: React.FC<FrontPageViewProps> = ({
  articles,
  topics,
  newspapers,
  onSelectArticle,
  onOpenCompare,
  onOpenTopic,
  selectedCategory,
  onSelectCategory
}) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredArticles = articles.filter((a) => {
    if (selectedCategory === 'All Sections') return true;
    return a.category === selectedCategory;
  });

  const leadStory = filteredArticles.find((a) => a.isLeadStory) || filteredArticles[0] || articles[0];
  const secondaryStories = filteredArticles.filter((a) => a.id !== leadStory.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Category Section Filter Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 sm:gap-2">
          <Filter className="w-3.5 h-3.5 text-gray-500 mr-1 hidden sm:inline" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-xs px-3 py-1 rounded font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-xs font-semibold'
                  : 'bg-[#141414] text-gray-400 border-white/5 hover:bg-[#202020] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-500 font-mono-code hidden md:block">
          Displaying {filteredArticles.length} curated multi-source dispatches
        </div>
      </div>

      {/* Broadsheet 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT & CENTER: Main Broadsheet Lead + Secondary Stories (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Lead Article Hero */}
          {leadStory && (
            <article 
              onClick={() => onSelectArticle(leadStory)}
              className="group cursor-pointer bg-[#0d0d0d] p-5 sm:p-7 border border-white/10 rounded-sm hover:border-[#c5a059]/60 transition-all shadow-xl"
            >
              {/* Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono-code font-semibold uppercase tracking-wider text-[#e05656]">
                    {leadStory.kicker}
                  </span>
                  <span className="text-neutral-700">•</span>
                  <span className="font-semibold text-[#c5a059]">
                    {leadStory.newspaperName}
                  </span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    {leadStory.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 px-2 py-0.5 rounded">
                    {leadStory.perspectiveTag}
                  </span>
                  <button
                    onClick={(e) => toggleBookmark(e, leadStory.id)}
                    className="text-gray-400 hover:text-[#c5a059] p-1"
                    title="Bookmark Story"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds.has(leadStory.id) ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Lead Headline */}
              <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:text-[#e5c178] transition-colors leading-[1.15] mb-3">
                {leadStory.title}
              </h2>

              <p className="font-editorial text-base sm:text-lg text-gray-400 italic mb-5 leading-relaxed">
                {leadStory.subtitle}
              </p>

              {/* Author & Byline */}
              <div className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                <span className="font-medium text-gray-200">By {leadStory.author}</span>
                <span className="text-neutral-700">—</span>
                <span>{leadStory.authorRole}</span>
              </div>

              {/* Lead Image */}
              <div className="relative mb-5 overflow-hidden rounded-xs bg-[#141414] border border-white/5">
                <img
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-[1.01] transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="p-2 text-[11px] text-gray-400 bg-[#121212] border-t border-white/10 italic">
                  {leadStory.imageCaption}
                </div>
              </div>

              {/* Lead Paragraph with Classic Drop Cap */}
              <div className="text-gray-300 font-editorial text-base sm:text-lg leading-relaxed space-y-4">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:text-[#c5a059] first-letter:leading-none">
                  {leadStory.leadParagraph}
                </p>
                <p className="text-sm sm:text-base text-gray-400">
                  {leadStory.bodyParagraphs[0]}
                </p>
              </div>

              {/* Interactive Perspective & Comparison CTA Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#141414] p-3.5 rounded border border-white/5">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <GitCompare className="w-4 h-4 text-[#c5a059]" />
                  <span>
                    <strong className="text-white">4 Mastheads</strong> covering this thread with diverse viewpoints
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCompare(leadStory.relatedTopicId);
                    }}
                    className="text-xs font-semibold text-black bg-[#c5a059] hover:bg-[#d4af37] px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    Compare 4 Perspectives
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Secondary Broadsheet Dispatches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className="group cursor-pointer bg-[#0d0d0d] p-5 border border-white/10 rounded-sm hover:border-[#c5a059]/60 transition-all flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2 text-gray-400">
                    <span className="font-mono-code font-semibold uppercase text-[#c5a059]">
                      {story.kicker}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(e, story.id)}
                      className="p-1 hover:text-[#c5a059]"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.has(story.id) ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-white group-hover:text-[#e5c178] transition-colors leading-snug mb-2">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 font-editorial italic mb-3">
                    {story.subtitle}
                  </p>

                  <div className="overflow-hidden rounded-xs mb-3 bg-[#141414] border border-white/5">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    />
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {story.leadParagraph}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-medium text-[#c5a059]">
                    {story.newspaperName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCompare(story.relatedTopicId);
                      }}
                      className="text-[11px] font-semibold text-[#c5a059] hover:underline flex items-center gap-0.5"
                    >
                      Cross-Examine
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Broadsheet Intelligence Dossier & Live Perspectives (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Daily AI Intelligence Briefing Widget */}
          <div className="bg-[#0d0d0d] text-white p-5 rounded-sm shadow-xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#e5c178]">
                  Synthesized Morning Brief
                </h3>
              </div>
              <span className="text-[10px] font-mono-code text-gray-400 bg-[#171717] px-2 py-0.5 rounded border border-white/5">
                AI Cross-Audit
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans-ui">
              Today's editorial coverage centers heavily on the <strong className="text-white">Geneva Carbon Accord</strong> and emerging <strong className="text-white">quantum benchmarks</strong>. While market broadsheets warn of short-term industrial margin pressure, diplomatic journals spotlight historic multilateral consensus.
            </p>

            <div className="space-y-2.5">
              <div className="text-[11px] bg-[#141414] p-3 rounded border-l-2 border-[#c5a059] border-t border-r border-b border-white/5">
                <span className="font-semibold text-[#e5c178] block mb-0.5">Key Consensus:</span>
                <span className="text-gray-300">Universal measurement standards for steel and semiconductor carbon intensity finalized.</span>
              </div>

              <div className="text-[11px] bg-[#141414] p-3 rounded border-l-2 border-[#e05656] border-t border-r border-b border-white/5">
                <span className="font-semibold text-[#ff8080] block mb-0.5">Primary Friction Point:</span>
                <span className="text-gray-300">36-month compliance timeline versus emerging economy capital subsidies.</span>
              </div>
            </div>

            <button
              onClick={() => onOpenCompare('topic-carbon-accord')}
              className="w-full text-center text-xs font-semibold text-black bg-[#c5a059] hover:bg-[#d4af37] py-2 rounded transition-colors shadow-xs"
            >
              Examine Full Perspective Matrix
            </button>
          </div>

          {/* Active Topic Threads */}
          <div className="bg-[#0d0d0d] p-5 border border-white/10 rounded-sm shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-editorial text-lg font-bold text-white">
                Active Topic Threads
              </h3>
              <span className="text-xs text-[#c5a059] font-medium">Live Velocity</span>
            </div>

            <div className="divide-y divide-white/10">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => onOpenTopic(topic.id)}
                  className="py-3 group cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono-code uppercase font-semibold text-gray-500">
                      {topic.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                      topic.velocity === 'Surging' ? 'bg-[#3b1212] text-[#ff8080] border-[#5c1c1c]' :
                      topic.velocity === 'Developing' ? 'bg-[#c5a059]/10 text-[#c5a059] border-[#c5a059]/30' :
                      'bg-[#171717] text-gray-400 border-white/5'
                    }`}>
                      {topic.velocity}
                    </span>
                  </div>

                  <h4 className="font-editorial text-sm font-bold text-gray-200 group-hover:text-[#e5c178] transition-colors leading-snug">
                    {topic.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                    <span>{topic.articlesCount} Articles • {topic.outletsCovering} Outlets</span>
                    <span className="text-[#c5a059] group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Broadsheet Quote */}
          <div className="bg-[#0d0d0d] border border-white/10 p-4 rounded-sm">
            <Quote className="w-5 h-5 text-[#c5a059] mb-2" />
            <p className="font-editorial italic text-xs text-gray-400 leading-relaxed">
              "A free press is not one that eliminates disagreement, but one that equips citizens to evaluate differing interpretations with clarity and rigor."
            </p>
            <div className="mt-2 text-[11px] font-medium text-gray-300 text-right">
              — The Broadsheet Editorial Standard
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
