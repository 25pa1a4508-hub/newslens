import { Article, Newspaper, PerspectiveComparison, TopicThread } from '../types';

export const MOCK_NEWSPAPERS: Newspaper[] = [
  {
    id: 'continental-post',
    name: 'The Continental Post',
    shortCode: 'TCP',
    logoText: 'THE CONTINENTAL POST',
    stance: 'Center',
    color: '#000666',
    country: 'International / Geneva',
    founded: 1884,
  },
  {
    id: 'financial-chronicle',
    name: 'The Financial Chronicle',
    shortCode: 'TFC',
    logoText: 'FINANCIAL CHRONICLE',
    stance: 'Market-Oriented',
    color: '#1a237e',
    country: 'United Kingdom / London',
    founded: 1892,
  },
  {
    id: 'global-dispatch',
    name: 'The Global Dispatch',
    shortCode: 'TGD',
    logoText: 'THE GLOBAL DISPATCH',
    stance: 'Center-Left',
    color: '#27378a',
    country: 'United States / New York',
    founded: 1912,
  },
  {
    id: 'daily-standard',
    name: 'The Daily Standard',
    shortCode: 'TDS',
    logoText: 'THE DAILY STANDARD',
    stance: 'Institutional',
    color: '#181b23',
    country: 'Germany / Frankfurt',
    founded: 1948,
  },
  {
    id: 'pacific-tribune',
    name: 'The Pacific Tribune',
    shortCode: 'TPT',
    logoText: 'PACIFIC TRIBUNE',
    stance: 'Center-Right',
    color: '#4858ab',
    country: 'Singapore / Tokyo',
    founded: 1965,
  },
];

export const MOCK_TOPICS: TopicThread[] = [
  {
    id: 'topic-carbon-accord',
    title: 'Geneva Global Carbon Tariff Accord Reached in Overnight Summit',
    category: 'Climate & Energy',
    summary: 'Representatives from 44 nations have signed the Geneva Border Carbon Adjustment Protocol, establishing the first standardized carbon border tariff mechanism starting next fiscal year.',
    startDate: 'October 12, 2026',
    lastUpdated: '18 minutes ago',
    velocity: 'Surging',
    sentimentTrajectory: [45, 30, 20, 55, 62, 70, 68],
    articlesCount: 38,
    outletsCovering: 16,
    keyEntities: ['WTO', 'UN Climate Envoy', 'European Council', 'Alliance of Island Nations', 'Ministry of Heavy Industries'],
    consensusPoints: [
      'Universal baseline measurement standard established for heavy metal exports.',
      'Phase-in timeline scheduled over 36 months starting January 2027.',
      'Revenue will fund developing nation clean-grid transition infrastructure.',
    ],
    polarizingDebates: [
      'Exemption thresholds for emerging manufacturing hubs remain contested.',
      'Concerns regarding retaliatory trade duties on agricultural exports.',
      'Disputes over third-party automated emissions verification protocols.',
    ],
    aiExecutiveBrief: 'The multilateral pact represents a historic shift from voluntary emissions targets to enforceable market-based trade mechanisms. Coverage is split between economic risk framing in market outlets and ecological breakthrough narratives in progressive mastheads.',
  },
  {
    id: 'topic-quantum-compute',
    title: 'Commercial Fault-Tolerant Quantum Processor Clears Industrial Benchmarks',
    category: 'Technology & AI',
    summary: 'A public-private consortium has demonstrated a 10,000 physical qubit system exhibiting sustained logical qubit fidelity across complex cryptography and battery chemistry simulations.',
    startDate: 'November 4, 2026',
    lastUpdated: '2 hours ago',
    velocity: 'Developing',
    sentimentTrajectory: [60, 65, 80, 82, 85, 88, 91],
    articlesCount: 24,
    outletsCovering: 12,
    keyEntities: ['CERN Supercomputing Node', 'National Science Foundation', 'Semiconductor Alliance', 'Global Cryptographic Council'],
    consensusPoints: [
      'Error correction threshold maintained for over 4.2 hours continuous operation.',
      'Immediate implications for materials science and high-capacity battery molecular modeling.',
    ],
    polarizingDebates: [
      'Urgency of post-quantum financial encryption transitions.',
      'Export restrictions and strategic sovereign tech containment.',
    ],
    aiExecutiveBrief: 'Consensus across technical editors confirms a generational benchmark. Mainstream mastheads emphasize national security implications, while financial broadsheets project market cap shifts in precision chemistry.',
  },
  {
    id: 'topic-monetary-pivot',
    title: 'Central Banks Harmonize Digital Reserve Asset Framework',
    category: 'Economy & Trade',
    summary: 'Trilateral central banking conference agrees on atomic cross-border settlement rails for wholesale interbank transfers, bypassing legacy SWIFT latency.',
    startDate: 'November 8, 2026',
    lastUpdated: '4 hours ago',
    velocity: 'Stable',
    sentimentTrajectory: [50, 48, 52, 58, 64, 60, 63],
    articlesCount: 29,
    outletsCovering: 14,
    keyEntities: ['Bank for International Settlements', 'Federal Reserve', 'European Central Bank', 'Monetary Authority of Singapore'],
    consensusPoints: [
      'Wholesale settlement only; no retail tracking or consumer account intrusion.',
      'Interbank liquidity reconciliation reduced from T+2 days to instantaneous atomic finality.',
    ],
    polarizingDebates: [
      'Sovereignty of currency pegging mechanisms during volatility crises.',
      'Potential friction with traditional commercial banking intermediary fee structures.',
    ],
    aiExecutiveBrief: 'Market commentary is broadly favorable toward liquidity efficiency, while editorial columns scrutinize central governance oversight and cybersecurity stress-testing protocols.',
  },
  {
    id: 'topic-space-station',
    title: 'International Lunar Gateway Core Module Completes In-Orbit Docking',
    category: 'Science',
    summary: 'The multinational lunar research orbital facility has successfully latched its primary habitat and power generation array in a high rectilinear halo orbit.',
    startDate: 'November 1, 2026',
    lastUpdated: 'Yesterday',
    velocity: 'Cooling',
    sentimentTrajectory: [80, 85, 88, 87, 85, 82, 80],
    articlesCount: 19,
    outletsCovering: 9,
    keyEntities: ['Artemis Coalition', 'JAXA', 'ESA', 'NASA Deep Space Command'],
    consensusPoints: [
      'Docking was executed 100% autonomously using optical sensor telemetry.',
      'Habitation module pressurization confirmed stable with zero thermal leaks.',
    ],
    polarizingDebates: [
      'Cost distribution among partner nations versus private launch contractors.',
    ],
    aiExecutiveBrief: 'Unified positive coverage across all major dailies, celebrating an era of collaborative deep-space exploration and sustained scientific presence.',
  }
];

export const MOCK_PERSPECTIVES: Record<string, PerspectiveComparison[]> = {
  'topic-carbon-accord': [
    {
      outletId: 'continental-post',
      outletName: 'The Continental Post',
      stance: 'Centrist / Diplomatic',
      headline: 'A Fragile Consensus: 44 Nations Draft Compromise on Border Carbon Levies',
      keyAngle: 'Multi-lateral compromise balanced against enforcement bottlenecks.',
      tone: 'Neutral-Analytical',
      sentimentScore: 0.15,
      featuredQuote: 'The true test of the Geneva pact lies not in the signatures gathered in Switzerland, but in whether national customs authorities can reliably calibrate emissions auditing without sparking tariff retaliation.',
      focusKeywords: ['Border adjustment', 'Diplomatic compromise', 'Auditing standards', 'Transition fund']
    },
    {
      outletId: 'financial-chronicle',
      outletName: 'The Financial Chronicle',
      stance: 'Market-Oriented',
      headline: 'Carbon Tariff Treaty Stirs Supply Chain Friction and Inflation Warnings',
      keyAngle: 'Cost pressures on industrial manufacturing and potential trade friction.',
      tone: 'Cautionary',
      sentimentScore: -0.35,
      featuredQuote: 'Industrial margins will absorb a direct 4.2% cost escalation in the medium term unless clean energy subsidies match the regulatory speed of enforcement.',
      focusKeywords: ['Supply chain impact', 'Manufacturing cost', 'Trade friction', 'Competitiveness']
    },
    {
      outletId: 'global-dispatch',
      outletName: 'The Global Dispatch',
      stance: 'Center-Left / Ecological',
      headline: 'Historic Milestone: Wealthy Nations Commit Direct Revenue to Climate Justice',
      keyAngle: 'Ecological accountability and redistribution of tariff revenues to vulnerable states.',
      tone: 'Optimistic',
      sentimentScore: 0.65,
      featuredQuote: 'By earmarking 70% of border carbon revenues directly for developing nation green grids, the Geneva summit has redefined international climate accountability.',
      focusKeywords: ['Climate justice', 'Clean energy transition', 'Equitable funding', 'Emissions reduction']
    },
    {
      outletId: 'pacific-tribune',
      outletName: 'The Pacific Tribune',
      stance: 'Pacific Rim / Trade Focus',
      headline: 'Asia-Pacific Exporters Seek Extended Grace Period on Geneva Directives',
      keyAngle: 'Impact on maritime logistics and regional sovereign industrial development.',
      tone: 'Critical',
      sentimentScore: -0.20,
      featuredQuote: 'Regional logistics operators demand transparent parity with domestic European producers before new border audits are enacted at sea terminals.',
      focusKeywords: ['Export competitiveness', 'Grace period', 'Regional trade pacts', 'Port customs']
    }
  ],
  'topic-quantum-compute': [
    {
      outletId: 'daily-standard',
      outletName: 'The Daily Standard',
      stance: 'Institutional / Security',
      headline: 'Quantum Milestone Sparks Urgent Call for National Infrastructure Hardening',
      keyAngle: 'Defense implications and vulnerability of municipal & financial cryptographic backbones.',
      tone: 'Urgent',
      sentimentScore: -0.10,
      featuredQuote: 'Sovereign security mandates that post-quantum cryptographic standards must be integrated into power grids and water telemetry within twelve calendar months.',
      focusKeywords: ['Infrastructure security', 'Encryption standard', 'Sovereignty', 'Defense']
    },
    {
      outletId: 'financial-chronicle',
      outletName: 'The Financial Chronicle',
      stance: 'Market-Oriented',
      headline: 'Precision Chemistry and Battery Stocks Rally on Fault-Tolerant Quantum Breakthrough',
      keyAngle: 'Industrial monetization, solid-state battery patents, and venture capital flows.',
      tone: 'Optimistic',
      sentimentScore: 0.80,
      featuredQuote: 'Simulating complex catalyst reactions in hours rather than decades opens an estimated $380 billion market for solid-state electrochemical storage.',
      focusKeywords: ['Electrochemical storage', 'Commercial valuation', 'Venture capital', 'Patent surge']
    },
    {
      outletId: 'continental-post',
      outletName: 'The Continental Post',
      stance: 'Centrist / Scientific',
      headline: 'The 10,000-Qubit Threshold: How International Laboratories Achieved Coherence',
      keyAngle: 'Peer-reviewed scientific methodology, helium-3 cooling techniques, and academic collaboration.',
      tone: 'Neutral-Analytical',
      sentimentScore: 0.40,
      featuredQuote: 'A triumph of precision photonics and cryogenic engineering, turning theoretical physics into an operational industrial tool.',
      focusKeywords: ['Logical qubits', 'Cryogenic engineering', 'Coherence time', 'Peer review']
    }
  ]
};

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-lead-geneva',
    newspaperId: 'continental-post',
    newspaperName: 'The Continental Post',
    kicker: 'SUMMIT ACCORD // GLOBAL REGULATION',
    title: 'Geneva Reaches Historic Carbon Border Accord After Marathon 36-Hour Talks',
    subtitle: 'Delegates from 44 nations agree on standardized emissions accounting and direct funding mechanisms for developing industrial sectors.',
    author: 'Eleanor Vance',
    authorRole: 'Chief Diplomatic Correspondent, Geneva',
    date: 'Friday, November 14, 2026',
    edition: 'Morning Global Edition • Vol. CXLII No. 48,192',
    readTime: '6 min read',
    category: 'Climate & Energy',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The Palais des Nations main plenary assembly hall at sunrise following the conclusion of the final tariff harmonization voting round.',
    leadParagraph: 'GENEVA — In what international trade observers are terming the most consequential realignment of customs policy since the 1994 Marrakesh Agreement, 44 sovereign delegations reached a binding consensus at 4:18 AM Friday on the Geneva Border Carbon Adjustment Protocol.',
    bodyParagraphs: [
      'The treaty establishes a uniform carbon-equivalent pricing mechanism applied directly at maritime ports and border terminals. Under the finalized formula, heavy manufactured goods including primary steel, aluminum, semiconductor wafer substrates, and cement will be levied proportional to the certified greenhouse gas emissions produced during manufacturing.',
      'Crucially, the contentious debate over revenue allocation was resolved through the establishment of the "Equitable Transition Facility"—a multilateral fund that will recycle 70% of collected import duties back into clean energy infrastructure loans for emerging market exporters.',
      '"We have transitioned from an era of voluntary targets to an architecture of market transparency," remarked Dr. Hans-Peter Lindqvist, Lead Negotiator for the European Delegation. "Those who invest in clean production will find open harbors; those who rely on high-carbon legacy techniques will absorb the true ecological cost at the frontier."',
      'Industry reactions, however, reflect deep regional divisions. Automotive and heavy machinery executives in North America praised the leveled playing field, while manufacturing confederations across Southeast Asia warned that the 36-month compliance window provides insufficient lead time for heavy industrial retrofits without substantial capital grants.',
      'The treaty now proceeds to national legislatures for formal ratification, with the first standardized emissions reporting phase set to inaugurate on January 1st of the upcoming fiscal year.'
    ],
    keyQuotes: [
      {
        quote: 'We have transitioned from an era of voluntary targets to an architecture of market transparency.',
        speaker: 'Dr. Hans-Peter Lindqvist',
        context: 'Lead European Negotiator, Press Briefing'
      },
      {
        quote: 'The 36-month compliance window provides insufficient lead time without direct capital co-investment.',
        speaker: 'Suriya Thanawat',
        context: 'ASEAN Manufacturing Council Spokesperson'
      }
    ],
    perspectiveTag: 'Balanced Multilateral Framing',
    sentiment: 'Positive',
    sentimentScore: 42,
    factDensityScore: 89,
    framingAnalysis: {
      primaryFrame: 'Diplomatic breakthrough with institutional mechanisms and balanced stakeholder scrutiny.',
      biasAssessment: 'Centrist institutional perspective. Gives voice to both European regulatory architects and developing nations concerns.',
      omittedAngles: 'Less focus on short-term commodity price spikes for everyday consumer goods.',
      corroborationScore: 94
    },
    relatedTopicId: 'topic-carbon-accord',
    isLeadStory: true
  },
  {
    id: 'art-financial-tariff',
    newspaperId: 'financial-chronicle',
    newspaperName: 'The Financial Chronicle',
    kicker: 'MARKETS & COMMODITIES',
    title: 'Industrial Margins Braced for Shock as Border Carbon Levies Take Shape',
    subtitle: 'Heavy manufacturers warn of an immediate 4.2% cost escalation; steel and aluminum futures see volatile early morning trading.',
    author: 'Julian Sterling',
    authorRole: 'Senior Industrial Markets Editor, London',
    date: 'Friday, November 14, 2026',
    edition: 'City Final • Issue 42,881',
    readTime: '4 min read',
    category: 'Economy & Trade',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Trading terminals in London reacting to the early-morning Geneva announcement.',
    leadParagraph: 'LONDON — Global manufacturing indices face an immediate reckoning following the overnight ratification of the Geneva Carbon Adjustment Protocol, with analysts warning of margin contraction across heavy industry and automotive supply chains.',
    bodyParagraphs: [
      'European and Asian steel benchmarks saw immediate intraday swings of up to 5.4%, as market participants scrambled to price in compliance liabilities for non-certified foundries.',
      'According to models published this morning by Goldman Sachs commodities division, primary steel producers operating in jurisdictions with carbon intensity exceeding 1.8 tons CO2 per ton of steel will face effective tariff barriers of between $84 and $120 per metric ton.',
      '"This is not merely an environmental treaty; it is a structural supply chain re-engineering," noted Marcus Holloway, Head of Quantitative Strategy at Mercer Capital. "Capital expenditure will be forcefully redirected toward hydrogen reduction facilities."'
    ],
    keyQuotes: [
      {
        quote: 'Capital expenditure will be forcefully redirected toward hydrogen reduction facilities.',
        speaker: 'Marcus Holloway',
        context: 'Mercer Capital Strategy Note'
      }
    ],
    perspectiveTag: 'Market Cost & Supply Risk Framing',
    sentiment: 'Critical',
    sentimentScore: -35,
    factDensityScore: 84,
    framingAnalysis: {
      primaryFrame: 'Financial burden on corporate balance sheets and market volatility.',
      biasAssessment: 'Pro-market stance focused on enterprise costs and inflationary friction.',
      omittedAngles: 'Environmental externalities and public health dividends resulting from reduced particulate pollution.',
      corroborationScore: 91
    },
    relatedTopicId: 'topic-carbon-accord'
  },
  {
    id: 'art-quantum-tech',
    newspaperId: 'daily-standard',
    newspaperName: 'The Daily Standard',
    kicker: 'FRONTIER COMPUTING // SECURITY',
    title: 'Consortium Demonstrates 10,000 Fault-Tolerant Qubits in Cryogenic Breakthrough',
    subtitle: 'System achieves 4.2 hours of sustained coherence, clearing the threshold for commercial molecular modeling and cryptography applications.',
    author: 'Dr. Klaus Richter',
    authorRole: 'Science & Technology Bureau, Frankfurt',
    date: 'Friday, November 14, 2026',
    edition: 'European Standard Edition • No. 12,409',
    readTime: '5 min read',
    category: 'Technology & AI',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The dilution refrigerator assembly housing the 10,000-qubit topological core at -273.14°C.',
    leadParagraph: 'FRANKFURT — In a landmark milestone for computational physics, a research consortium spanning seven sovereign laboratories has successfully sustained logical quantum coherence across a 10,000 physical qubit array for over four consecutive hours.',
    bodyParagraphs: [
      'The milestone, published concurrently in Nature Physics this morning, confirms that surface-code quantum error correction can scale linearly without thermal breakdown in sub-millikelvin environments.',
      'Unlike previous noisy intermediate-scale quantum (NISQ) demonstrations, the new architecture achieved zero logical errors during complex molecular matrix inversion calculations used in next-generation cathode synthesis.',
      'Security agencies in Berlin, London, and Washington immediately renewed warnings for banking institutions to expedite their migration to post-quantum lattice-based encryption algorithms.'
    ],
    keyQuotes: [
      {
        quote: 'The threshold between laboratory curiosity and industrial engine has officially been crossed.',
        speaker: 'Prof. Amara Osei',
        context: 'Lead Quantum Architecture Investigator'
      }
    ],
    perspectiveTag: 'Scientific Benchmark & Security Urgency',
    sentiment: 'Neutral',
    sentimentScore: 50,
    factDensityScore: 95,
    framingAnalysis: {
      primaryFrame: 'Rigorous scientific triumph coupled with sovereign cryptographic vigilance.',
      biasAssessment: 'High factual precision, institutional national security lens.',
      omittedAngles: 'Geopolitical race tensions with non-signatory nations.',
      corroborationScore: 96
    },
    relatedTopicId: 'topic-quantum-compute'
  },
  {
    id: 'art-monetary-settle',
    newspaperId: 'pacific-tribune',
    newspaperName: 'The Pacific Tribune',
    kicker: 'CENTRAL BANKING // SETTLEMENT',
    title: 'Atomic Cross-Border Settlement Protocol Approved by Trilateral Banking Forum',
    subtitle: 'Singapore, Tokyo, and Zurich establish instant interbank liquidity rails, bypassing legacy clearing latency.',
    author: 'Mei-Ling Chen',
    authorRole: 'Senior Financial Affairs Reporter, Singapore',
    date: 'Thursday, November 13, 2026',
    edition: 'Pan-Asian Broadsheet Edition',
    readTime: '4 min read',
    category: 'Governance',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The financial district skyline of Singapore, where the multilateral banking forum concluded deliberations.',
    leadParagraph: 'SINGAPORE — Clearing friction that has characterized cross-border capital flows for over half a century took a monumental step toward obsolescence today, as central bank governors finalized the Sovereign Atomic Settlement Architecture (SASA).',
    bodyParagraphs: [
      'The system utilizes synchronized cryptographic ledgers to execute multi-currency foreign exchange settlement in sub-second timeframes, eliminating the counterparty settlement risks inherent in traditional T+2 day correspondent banking.',
      'Commercial banking groups welcomed the release of locked-up buffer collateral, estimated at over $1.4 trillion across Asian financial centers.'
    ],
    keyQuotes: [
      {
        quote: 'Eliminating settlement latency unlocks immense working capital for real-economy trade financing.',
        speaker: 'Kenji Takahashi',
        context: 'Governor, Interbank Clearing Directorate'
      }
    ],
    perspectiveTag: 'Asian Regional Financial Modernization',
    sentiment: 'Positive',
    sentimentScore: 68,
    factDensityScore: 90,
    framingAnalysis: {
      primaryFrame: 'Efficiency gains and liquidity expansion in Pan-Asian financial corridors.',
      biasAssessment: 'Optimistic regional development perspective.',
      omittedAngles: 'Impact on smaller intermediary foreign exchange brokerages.',
      corroborationScore: 92
    },
    relatedTopicId: 'topic-monetary-pivot'
  },
  {
    id: 'art-clean-energy',
    newspaperId: 'global-dispatch',
    newspaperName: 'The Global Dispatch',
    kicker: 'DECARBONIZATION INITIATIVE',
    title: 'Offshore Geothermal Supergrid Connects First 12 Gigawatts to Continental Power',
    subtitle: 'Subsea high-voltage DC trunk lines deliver baseload zero-carbon energy directly to industrial coastal clusters.',
    author: 'Aria Thorne',
    authorRole: 'Energy Infrastructure Bureau, Oslo',
    date: 'Wednesday, November 12, 2026',
    edition: 'Global Dispatch Daily • Issue 33,120',
    readTime: '5 min read',
    category: 'Climate & Energy',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Offshore substation platform anchoring the deep-sea volcanic thermal tap in the North Atlantic.',
    leadParagraph: 'OSLO — Harnessing the subterranean kinetic heat of deep marine trenches, the Northern Supergrid Consortium energized its first 12 gigawatts of continuous baseload capacity this morning, feeding directly into coastal manufacturing grids.',
    bodyParagraphs: [
      'Unlike intermittent wind or solar generation, the subsea geothermal array provides unyielding 24/7 power at a levelized cost of under $34 per megawatt-hour.',
      'The engineering achievement signals an accelerating departure from fossil-fired peaking plants along the North Sea littoral.'
    ],
    keyQuotes: [
      {
        quote: 'Baseload clean energy is no longer a theoretical ambition—it is flowing into heavy industrial furnaces right now.',
        speaker: 'Lars Erikson',
        context: 'Project Director, Northern Supergrid'
      }
    ],
    perspectiveTag: 'Ecological & Engineering Optimism',
    sentiment: 'Positive',
    sentimentScore: 82,
    factDensityScore: 88,
    framingAnalysis: {
      primaryFrame: 'Technological triumph in accelerating industrial decarbonization.',
      biasAssessment: 'Progressive energy focus highlighting environmental solutions.',
      omittedAngles: 'Long-term marine ecology thermal impact monitoring requirements.',
      corroborationScore: 90
    },
    relatedTopicId: 'topic-carbon-accord'
  }
];

export const MOCK_EDITORIAL_QUOTES = [
  {
    quote: 'Journalism is the first rough draft of history—broadsheet analysis turns the draft into informed civil discernment.',
    author: 'Editorial Board',
    paper: 'The Continental Post'
  },
  {
    quote: 'A market without transparent data is an echo chamber; a society without cross-examined news is blind.',
    author: 'Economic Council',
    paper: 'The Financial Chronicle'
  },
  {
    quote: 'The true power of perspective is not in choosing a side, but in understanding every lens simultaneously.',
    author: 'Global Intelligence Digest',
    paper: 'NewsLens Syndicate'
  }
];
