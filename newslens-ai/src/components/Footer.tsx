import React from 'react';
import { Newspaper } from '../types';
import { Globe, ShieldCheck, Scale, Award, BookOpen } from 'lucide-react';

interface FooterProps {
  newspapers: Newspaper[];
}

export const Footer: React.FC<FooterProps> = ({ newspapers }) => {
  return (
    <footer className="mt-16 bg-[#0a0a0a] text-gray-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Top Footer Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-editorial text-2xl font-bold tracking-tight text-[#c5a059]">
              NEWSLENS AI
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md font-sans-ui">
              The broadsheet intelligence platform dedicated to cross-auditing international press coverage, neutralizing narrative polarization, and delivering multi-perspective clarity for decision-makers.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                Independent Multi-Source Indexing
              </span>
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#c5a059]" />
                Zero-Partisan Algorithmic Standard
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-mono-code font-semibold uppercase tracking-wider text-[#e5c178]">
              Indexed Mastheads
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              {newspapers.map((n) => (
                <li key={n.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{n.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono-code">{n.stance}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-mono-code font-semibold uppercase tracking-wider text-[#e5c178]">
              Editorial Standards
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>Corroboration Probability Index</li>
              <li>Fact vs. Opinion Ratio Metric</li>
              <li>Loaded Terminology Detector</li>
              <li>Omitted Angle Identification</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 NewsLens Syndicate • Synchronized Broadsheet Architecture
          </div>
          <div className="font-mono-code text-[11px] text-[#c5a059]">
            Server Status: Operational • Latency: 18ms • AI Integrity: 99.4%
          </div>
        </div>

      </div>
    </footer>
  );
};
