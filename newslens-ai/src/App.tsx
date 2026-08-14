/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Article, ViewTab } from './types';
import { MOCK_ARTICLES, MOCK_NEWSPAPERS, MOCK_TOPICS } from './data/mockNews';
import { Header } from './components/Header';
import { FrontPageView } from './components/FrontPageView';
import { CompareView } from './components/CompareView';
import { TopicTrackerView } from './components/TopicTrackerView';
import { ArticleDetailView } from './components/ArticleDetailView';
import { UploadAnalyzeView } from './components/UploadAnalyzeView';
import { ArchiveView } from './components/ArchiveView';
import { Footer } from './components/Footer';
import { QuickDigestModal } from './components/QuickDigestModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('frontpage');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-carbon-accord');
  const [selectedNewspaper, setSelectedNewspaper] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sections');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isQuickDigestOpen, setIsQuickDigestOpen] = useState<boolean>(false);

  // Filtered articles based on newspaper filter and search
  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter((article) => {
      if (selectedNewspaper && article.newspaperId !== selectedNewspaper) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesSubtitle = article.subtitle.toLowerCase().includes(q);
        const matchesKicker = article.kicker.toLowerCase().includes(q);
        const matchesAuthor = article.author.toLowerCase().includes(q);
        const matchesLead = article.leadParagraph.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesKicker && !matchesAuthor && !matchesLead) {
          return false;
        }
      }
      return true;
    });
  }, [selectedNewspaper, searchQuery]);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentTab('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCompare = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleByTopic = (topicId: string, outletId?: string) => {
    const found = MOCK_ARTICLES.find(
      (a) => a.relatedTopicId === topicId && (!outletId || a.newspaperId === outletId)
    ) || MOCK_ARTICLES.find((a) => a.relatedTopicId === topicId) || MOCK_ARTICLES[0];
    
    handleSelectArticle(found);
  };

  const handleOpenArticleById = (articleId: string) => {
    const found = MOCK_ARTICLES.find((a) => a.id === articleId) || MOCK_ARTICLES[0];
    handleSelectArticle(found);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex flex-col justify-between font-sans-ui selection:bg-[#c5a059]/30 selection:text-[#e5c178]">
      {/* Broadsheet Masthead Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedNewspaper={selectedNewspaper}
        onSelectNewspaper={setSelectedNewspaper}
        newspapers={MOCK_NEWSPAPERS}
        onOpenQuickDigest={() => setIsQuickDigestOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'frontpage' && (
          <FrontPageView
            articles={filteredArticles}
            topics={MOCK_TOPICS}
            newspapers={MOCK_NEWSPAPERS}
            onSelectArticle={handleSelectArticle}
            onOpenCompare={handleOpenCompare}
            onOpenTopic={handleOpenTopic}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {currentTab === 'compare' && (
          <CompareView
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
            onSelectArticleByTopic={handleSelectArticleByTopic}
          />
        )}

        {currentTab === 'tracker' && (
          <TopicTrackerView
            topics={MOCK_TOPICS}
            onOpenTopicCompare={handleOpenCompare}
            onSelectTopicDispatch={handleOpenTopic}
          />
        )}

        {currentTab === 'article-detail' && selectedArticle && (
          <ArticleDetailView
            article={selectedArticle}
            onBack={() => setCurrentTab('frontpage')}
            onOpenCompare={handleOpenCompare}
          />
        )}

        {currentTab === 'analyze' && (
          <UploadAnalyzeView />
        )}

        {currentTab === 'archive' && (
          <ArchiveView
            onOpenArticleById={handleOpenArticleById}
          />
        )}
      </main>

      {/* Broadsheet Footer */}
      <Footer newspapers={MOCK_NEWSPAPERS} />

      {/* Quick Executive AI Digest Modal */}
      <QuickDigestModal
        isOpen={isQuickDigestOpen}
        onClose={() => setIsQuickDigestOpen(false)}
        topics={MOCK_TOPICS}
        onOpenTopicCompare={handleOpenCompare}
      />
    </div>
  );
}
