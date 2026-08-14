import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowLeft, Bookmark, Share2, Volume2, VolumeX, Sparkles, GitCompare, ZoomIn, ZoomOut, Type, ShieldCheck, CheckCircle2, AlertCircle, Quote, Clock, ExternalLink } from 'lucide-react';

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
  onOpenCompare: (topicId: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onOpenCompare
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSerif, setIsSerif] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>('framing');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSizeClass = 
    fontSize === 'xlarge' ? 'text-xl leading-relaxed' :
    fontSize === 'large' ? 'text-lg leading-relaxed' :
    'text-base leading-relaxed';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Navigation and Reader Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 bg-[#0d0d0d] p-4 rounded-sm shadow-xl border">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#c5a059] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Frontpage
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {/* Audio Simulator */}
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className={`text-xs px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors border ${
              isPlayingAudio ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold' : 'bg-[#141414] text-gray-400 border-white/10 hover:bg-[#202020] hover:text-white'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#c5a059]" />}
            {isPlayingAudio ? 'Pause Narration' : 'Listen to Audio Dispatch'}
          </button>

          {/* Typography Controls */}
          <div className="flex items-center gap-1 border-l border-r border-white/10 px-2">
            <button
              onClick={() => setIsSerif(!isSerif)}
              className={`p-1.5 text-xs font-bold rounded ${
                isSerif ? 'bg-[#c5a059] text-black font-bold' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
              title="Toggle Serif / Sans Font"
            >
              <Type className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal')}
              className="p-1.5 text-xs text-gray-400 hover:bg-[#1a1a1a] hover:text-white rounded"
              title="Cycle Font Size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compare Button */}
          <button
            onClick={() => onOpenCompare(article.relatedTopicId)}
            className="text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d4af37] px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <GitCompare className="w-3.5 h-3.5" />
            Cross-Audit Mastheads
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="text-xs text-gray-400 hover:text-[#c5a059] p-1.5"
            title="Copy Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          {copied && <span className="text-[11px] text-[#c5a059] font-medium font-mono-code">Copied!</span>}
        </div>
      </div>

      {/* Audio Playback Indicator Bar */}
      {isPlayingAudio && (
        <div className="bg-[#0d0d0d] text-white p-3.5 rounded-sm flex items-center justify-between text-xs border border-white/10 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-1 h-3 bg-[#c5a059] animate-pulse"></span>
              <span className="w-1 h-5 bg-[#c5a059] animate-pulse delay-75"></span>
              <span className="w-1 h-2 bg-[#c5a059] animate-pulse delay-150"></span>
            </div>
            <span>Synthesized Broadsheet Narrator: <em className="text-[#e5c178]">"{article.title}"</em></span>
          </div>
          <span className="text-gray-400 font-mono-code">01:24 / 04:30</span>
        </div>
      )}

      {/* Main Article & Perspective Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Article Content (8 cols) */}
        <div className="lg:col-span-8 bg-[#0d0d0d] p-6 sm:p-10 border border-white/10 rounded-sm shadow-xl space-y-6">
          
          {/* Masthead Header */}
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono-code">
              <span className="font-bold text-[#e05656] uppercase">{article.kicker}</span>
              <span>{article.edition}</span>
            </div>

            <div className="text-sm font-serif font-bold text-[#c5a059] tracking-wide uppercase mb-3">
              {article.newspaperName}
            </div>

            <h1 className={`font-editorial font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4`}>
              {article.title}
            </h1>

            <p className="font-editorial text-lg sm:text-xl text-gray-400 italic leading-relaxed mb-4">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 pt-3 border-t border-white/10">
              <div>
                <span className="font-semibold text-gray-200">By {article.author}</span>
                <span className="mx-2 text-neutral-700">•</span>
                <span>{article.authorRole}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono-code">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>{article.date} ({article.readTime})</span>
              </div>
            </div>
          </div>

          {/* Hero Media */}
          <div className="space-y-2">
            <div className="overflow-hidden rounded-xs bg-[#141414] border border-white/5">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-96 object-cover opacity-90"
              />
            </div>
            <p className="text-xs text-gray-400 italic border-b border-white/10 pb-2">
              {article.imageCaption}
            </p>
          </div>

          {/* Article Body */}
          <div className={`space-y-5 text-gray-300 ${isSerif ? 'font-editorial' : 'font-sans-ui'} ${fontSizeClass}`}>
            <p className="first-letter:text-6xl first-letter:font-bold first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:text-[#c5a059] first-letter:leading-none font-medium">
              {article.leadParagraph}
            </p>

            {article.bodyParagraphs.map((para, idx) => (
              <p key={idx} className="text-gray-300 leading-relaxed">
                {para}
              </p>
            ))}

            {/* Key Quotes Pullouts */}
            {article.keyQuotes.length > 0 && (
              <div className="my-8 space-y-4">
                {article.keyQuotes.map((q, idx) => (
                  <blockquote
                    key={idx}
                    className="p-5 bg-[#141414] border-l-4 border-[#c5a059] rounded-r text-gray-200 italic border-t border-r border-b border-white/5"
                  >
                    <Quote className="w-5 h-5 text-[#c5a059] mb-2" />
                    <p className="text-base sm:text-lg mb-2">"{q.quote}"</p>
                    <cite className="not-italic text-xs font-sans-ui font-semibold text-[#e5c178] block">
                      — {q.speaker}, <span className="font-normal text-gray-400">{q.context}</span>
                    </cite>
                  </blockquote>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#141414] p-4 rounded border border-white/5">
            <div className="text-xs text-gray-400">
              Archived under <strong className="text-white">{article.category}</strong> • Dispatch ID: <code className="font-mono-code text-[11px] text-[#c5a059]">{article.id}</code>
            </div>
            <button
              onClick={() => onOpenCompare(article.relatedTopicId)}
              className="text-xs font-semibold text-black bg-[#c5a059] hover:bg-[#d4af37] px-4 py-2 rounded flex items-center gap-2 transition-colors shadow-xs"
            >
              <GitCompare className="w-3.5 h-3.5" />
              Compare with 3 Alternate Perspectives
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Broadsheet AI Framing Audit & Margin Annotations (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Framing Audit Card */}
          <div className="bg-[#0d0d0d] text-white p-5 rounded-sm border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#e5c178]">
                  Broadsheet Framing Audit
                </h3>
              </div>
              <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Score: {article.framingAnalysis.corroborationScore}% Verified
              </span>
            </div>

            {/* Framing Spectrum */}
            <div className="space-y-2 text-xs">
              <span className="text-gray-400 font-mono-code block">Primary Narrative Lens:</span>
              <p className="text-gray-200 bg-[#141414] p-3 rounded leading-relaxed border-l-2 border-[#c5a059] border-t border-r border-b border-white/5">
                {article.framingAnalysis.primaryFrame}
              </p>
            </div>

            {/* Bias Assessment */}
            <div className="space-y-1.5 text-xs">
              <span className="text-gray-400 font-mono-code block">Editorial Tone & Stance:</span>
              <p className="text-gray-300 bg-[#141414] p-2.5 rounded leading-relaxed border border-white/5">
                {article.framingAnalysis.biasAssessment}
              </p>
            </div>

            {/* Omitted Angles Alert */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[#ff8080] font-mono-code flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#ff8080]" />
                Counter-Angles Not Emphasized:
              </span>
              <p className="text-gray-300 bg-[#141414] p-2.5 rounded leading-relaxed border border-white/5">
                {article.framingAnalysis.omittedAngles}
              </p>
            </div>
          </div>

          {/* Fact Density & Metrics */}
          <div className="bg-[#0d0d0d] p-5 border border-white/10 rounded-sm shadow-md space-y-4">
            <h3 className="font-editorial text-base font-bold text-white border-b border-white/10 pb-2">
              Linguistic & Editorial Metrics
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-gray-400 mb-1 font-mono-code">
                  <span>Fact Density Index:</span>
                  <span className="font-bold text-[#c5a059]">{article.factDensityScore}/100</span>
                </div>
                <div className="w-full bg-[#141414] h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-[#c5a059] h-full"
                    style={{ width: `${article.factDensityScore}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 mb-1 font-mono-code">
                  <span>Corroboration Probability:</span>
                  <span className="font-bold text-emerald-400">{article.framingAnalysis.corroborationScore}%</span>
                </div>
                <div className="w-full bg-[#141414] h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${article.framingAnalysis.corroborationScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Perspective Suggestion Box */}
          <div className="bg-[#0d0d0d] p-5 rounded-sm border border-white/10 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <h4 className="text-xs font-bold text-[#e5c178] uppercase tracking-wider">
                Explore Contrasting Viewpoints
              </h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Read how <em>The Financial Chronicle</em> and <em>The Global Dispatch</em> framed this identical development with differing economic and ecological emphases.
            </p>
            <button
              onClick={() => onOpenCompare(article.relatedTopicId)}
              className="w-full text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d4af37] py-2 rounded transition-colors text-center shadow-xs"
            >
              Open Perspective Radar
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
