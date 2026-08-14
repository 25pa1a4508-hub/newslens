import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Copy, Check, BookOpen } from 'lucide-react';

const PRESET_ARTICLES = [
  {
    title: 'Offshore Geothermal Supergrid Energizes North Sea',
    text: `OSLO — Harnessing subterranean kinetic heat from deep marine trenches, the Northern Supergrid Consortium energized its first 12 gigawatts of continuous baseload capacity this morning. Project leaders hailed the zero-carbon milestone, projecting that continuous subsea thermal generators will eliminate the need for fossil-fueled peaking units. However, industrial consumer advocates expressed wariness regarding capital amortization surcharges added to monthly utility tariffs.`
  },
  {
    title: 'Autonomous Lunar Mining Accord Signed in Tokyo',
    text: `TOKYO — A multilateral space commerce treaty signed today establishes property rights for private lunar regolith extraction. Supporters argue the framework will unleash hundreds of billions in private aerospace investment. Conversely, sovereign legal scholars warned that the unilateral treaty bypasses the UN Outer Space Treaty principles, risking diplomatic friction over contested mineral deposits at the Lunar South Pole.`
  },
  {
    title: 'Central Banks Pioneer Cross-Border Atomic Ledgers',
    text: `SINGAPORE — Global central banks announced the launch of synchronized cryptographic ledgers designed to settle foreign exchange in real-time. Proponents celebrated the elimination of $1.4 trillion in tied-up collateral buffers. Detractors raised alarm over potential single points of failure in cloud-hosted ledger consensus engines.`
  }
];

export const UploadAnalyzeView: React.FC = () => {
  const [inputText, setInputText] = useState(PRESET_ARTICLES[0].text);
  const [articleTitle, setArticleTitle] = useState(PRESET_ARTICLES[0].title);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    tone: string;
    framing: string;
    biasScore: number; // 0 to 100
    factRatio: number;
    loadedWords: string[];
    omissions: string[];
    neutralRewrite: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    // Simulate high-fidelity AI deep audit with realistic metrics
    setTimeout(() => {
      // Analyze text characteristics
      const isTech = inputText.toLowerCase().includes('lunar') || inputText.toLowerCase().includes('space');
      const isFinance = inputText.toLowerCase().includes('central bank') || inputText.toLowerCase().includes('collateral');
      
      let tone = 'Optimistic / Technological Triumph';
      let framing = 'Highlights engineering breakthroughs while delegating economic risk to secondary paragraphs.';
      let biasScore = 32;
      let factRatio = 86;
      let loadedWords = ['Hailed', 'Milestone', 'Eliminate', 'Wariness'];
      let omissions = [
        'Detailed breakdown of levelized capital costs over 30-year lifecycle.',
        'Ecological impact assessments on surrounding marine ecosystems.'
      ];
      let neutralRewrite = `The Northern Supergrid Consortium commenced operations of a 12-gigawatt geothermal power system today in the North Sea. The facility provides baseload electricity without carbon emissions during generation. Utility representatives noted the technical achievement, while consumer groups noted that capital financing costs will be recovered through adjusted tariff structures.`;

      if (isTech) {
        tone = 'Venture-Driven / Sovereign Friction';
        framing = 'Frames private commercial extraction as economic imperative versus sovereign treaty compliance.';
        biasScore = 48;
        factRatio = 79;
        loadedWords = ['Unleash', 'Unilateral', 'Contested'];
        omissions = [
          'Direct commentary from international space law tribunals.',
          'Clarification on ecological planetary protection guidelines.'
        ];
        neutralRewrite = `Representatives from participating nations concluded a commercial framework governing lunar resource extraction today in Tokyo. The accord defines property rights for extracted regolith. Industry participants stated this establishes investment certainty, while international legal specialists highlighted ongoing jurisdictional debates regarding prior multinational space treaties.`;
      } else if (isFinance) {
        tone = 'Institutional / Market Efficiency';
        framing = 'Emphasizes capital efficiency while noting cybersecurity stress vulnerabilities.';
        biasScore = 24;
        factRatio = 91;
        loadedWords = ['Pioneer', 'Elimination', 'Alarm'];
        omissions = [
          'Impact on private non-bank foreign exchange intermediaries.',
          'Jurisdictional liability in cases of network downtime.'
        ];
        neutralRewrite = `Central banking authorities have introduced a cryptographic ledger protocol for instant cross-border foreign exchange settlement. The initiative aims to reduce settlement times and collateral requirements. Financial analysts cite efficiency benefits alongside considerations regarding infrastructure resilience.`;
      }

      setAnalysisResult({
        tone,
        framing,
        biasScore,
        factRatio,
        loadedWords,
        omissions,
        neutralRewrite
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleCopyRewrite = () => {
    if (analysisResult?.neutralRewrite) {
      navigator.clipboard.writeText(analysisResult.neutralRewrite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="bg-[#0d0d0d] p-6 border border-white/10 rounded-sm shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#c5a059]" />
          <h2 className="font-editorial text-2xl font-bold text-white">
            AI Broadsheet Text & Perspective Analyzer
          </h2>
        </div>
        <p className="text-xs text-gray-400 font-editorial italic">
          Audit any news article, press wire, or transcript for hidden rhetorical spin, omitted viewpoints, and fact-to-opinion ratios.
        </p>
      </div>

      {/* Input / Ingestion Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input (6 cols) */}
        <div className="lg:col-span-6 bg-[#0d0d0d] p-6 border border-white/10 rounded-sm shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-editorial text-base font-bold text-white">
              Article Ingestion Source
            </h3>
            <span className="text-[11px] text-gray-400">Paste or load preset</span>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase block">
              Load Preset Broadsheet Sample:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_ARTICLES.map((sample, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setArticleTitle(sample.title);
                    setInputText(sample.text);
                    setAnalysisResult(null);
                  }}
                  className="text-xs bg-[#141414] hover:bg-[#202020] text-gray-300 hover:text-[#c5a059] border border-white/10 px-2.5 py-1 rounded transition-colors"
                >
                  Preset {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Article Title / Headline:
            </label>
            <input
              type="text"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#141414] border border-white/10 text-white rounded focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
              placeholder="e.g. Summit Signs Historic Clean Energy Framework"
            />
          </div>

          {/* Body Text Area */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Article Body / Excerpt Text:
            </label>
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 text-xs bg-[#141414] border border-white/10 text-white rounded focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] font-editorial leading-relaxed"
              placeholder="Paste article paragraphs here..."
            ></textarea>
          </div>

          {/* Analyze CTA */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full bg-[#c5a059] hover:bg-[#d4af37] disabled:opacity-50 text-black py-2.5 rounded font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Auditing Rhetorical Framing & Omissions...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run Broadsheet Perspective Audit
              </>
            )}
          </button>
        </div>

        {/* Right Output Analysis (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              
              {/* Scorecard Box */}
              <div className="bg-[#0d0d0d] text-white p-6 rounded-sm border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#e5c178]">
                      Audit Breakdown & Metric Scores
                    </h4>
                  </div>
                  <span className="text-xs font-mono-code text-gray-400">
                    Fact Ratio: <strong className="text-white">{analysisResult.factRatio}%</strong>
                  </span>
                </div>

                {/* Framing & Tone */}
                <div className="space-y-2 text-xs">
                  <span className="text-gray-400 font-mono-code uppercase block">Detected Framing:</span>
                  <p className="text-gray-200 bg-[#141414] p-3 rounded leading-relaxed border-l-2 border-[#c5a059] border-t border-r border-b border-white/5">
                    {analysisResult.framing}
                  </p>
                </div>

                {/* Loaded Rhetorical Words */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-gray-400 font-mono-code uppercase block">Loaded Terminology Identified:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.loadedWords.map((w, idx) => (
                      <span key={idx} className="bg-[#3b1212] text-[#ff8080] border border-[#5c1c1c] text-[11px] px-2 py-0.5 rounded font-mono-code font-semibold">
                        "{w}"
                      </span>
                    ))}
                  </div>
                </div>

                {/* Omitted Perspectives */}
                <div className="space-y-1.5 text-xs pt-1">
                  <span className="text-[#ff8080] font-mono-code uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#ff8080]" />
                    Omitted Counter-Perspectives:
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-300 pl-2">
                    {analysisResult.omissions.map((om, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#ff8080] font-bold">•</span>
                        <span>{om}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Synthesized Neutral Rewrite Box */}
              <div className="bg-[#0d0d0d] p-6 border border-white/10 rounded-sm shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#c5a059]" />
                    <h4 className="font-editorial text-base font-bold text-white">
                      Neutral Broadsheet Rewrite (Zero-Spin)
                    </h4>
                  </div>
                  <button
                    onClick={handleCopyRewrite}
                    className="text-xs text-[#c5a059] hover:text-[#e5c178] flex items-center gap-1 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>
                </div>

                <p className="font-editorial text-sm sm:text-base text-gray-200 leading-relaxed italic bg-[#141414] p-4 rounded border-l-2 border-[#c5a059] border-t border-r border-b border-white/5">
                  "{analysisResult.neutralRewrite}"
                </p>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-[#0d0d0d] border border-white/10 rounded-sm text-center text-gray-400 space-y-3">
              <Sparkles className="w-8 h-8 text-neutral-600" />
              <h4 className="font-editorial text-lg font-bold text-white">
                Audit Results Will Appear Here
              </h4>
              <p className="text-xs text-gray-400 max-w-sm">
                Paste any news excerpt on the left and click "Run Broadsheet Perspective Audit" to discover framing spin and generate a neutralized broadsheet edition.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
