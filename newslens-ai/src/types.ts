export interface Newspaper {
  id: string;
  name: string;
  shortCode: string;
  logoText: string;
  stance: 'Center' | 'Center-Left' | 'Center-Right' | 'Market-Oriented' | 'Progressive' | 'Institutional';
  color: string;
  country: string;
  founded: number;
}

export interface PerspectiveComparison {
  outletId: string;
  outletName: string;
  stance: string;
  headline: string;
  keyAngle: string;
  tone: 'Critical' | 'Optimistic' | 'Neutral-Analytical' | 'Cautionary' | 'Urgent';
  sentimentScore: number; // -1.0 to 1.0
  featuredQuote: string;
  focusKeywords: string[];
}

export interface Article {
  id: string;
  newspaperId: string;
  newspaperName: string;
  kicker: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  edition: string;
  readTime: string;
  category: 'World Affairs' | 'Economy & Trade' | 'Climate & Energy' | 'Technology & AI' | 'Governance' | 'Science';
  imageUrl: string;
  imageCaption: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  keyQuotes: {
    quote: string;
    speaker: string;
    context: string;
  }[];
  perspectiveTag: string;
  sentiment: 'Positive' | 'Neutral' | 'Mixed' | 'Critical';
  sentimentScore: number; // -100 to +100
  factDensityScore: number; // 0 to 100
  framingAnalysis: {
    primaryFrame: string;
    biasAssessment: string;
    omittedAngles: string;
    corroborationScore: number;
  };
  relatedTopicId: string;
  isLeadStory?: boolean;
}

export interface TopicThread {
  id: string;
  title: string;
  category: string;
  summary: string;
  startDate: string;
  lastUpdated: string;
  velocity: 'Surging' | 'Developing' | 'Stable' | 'Cooling';
  sentimentTrajectory: number[]; // 7 data points
  articlesCount: number;
  outletsCovering: number;
  keyEntities: string[];
  consensusPoints: string[];
  polarizingDebates: string[];
  aiExecutiveBrief: string;
}

export type ViewTab = 'frontpage' | 'compare' | 'tracker' | 'archive' | 'article-detail' | 'analyze';
