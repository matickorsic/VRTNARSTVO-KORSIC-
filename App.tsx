import React, { useEffect, useState } from 'react';
import { AboutPage } from './components/AboutPage';
import { Benefits } from './components/Benefits';
import { Catalog } from './components/Catalog';
import { CategoryPage } from './components/CategoryPage';
import { CompanyDetailsPage } from './components/CompanyDetailsPage';
import { CookieConsent } from './components/CookieConsent';
import { CookiesPage } from './components/CookiesPage';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlantDoctor } from './components/PlantDoctor';
import { Preloader } from './components/Preloader';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { SocialCta } from './components/SocialCta';
import { TermsPage } from './components/TermsPage';
import { Testimonials } from './components/Testimonials';
import { Category } from './types';

export type Page = 'home' | 'about' | 'category' | 'company-details' | 'terms' | 'privacy-policy' | 'cookies';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const handleBackFromCategory = () => {
    setSelectedCategory(null);
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Preloader isLoading={isLoading} />

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Header onNavigate={handleNavigate} currentPage={currentPage} />

        <main>
          {currentPage === 'category' && selectedCategory ? (
            <CategoryPage category={selectedCategory} onBack={handleBackFromCategory} />
          ) : currentPage === 'about' ? (
            <AboutPage />
          ) : currentPage === 'company-details' ? (
            <CompanyDetailsPage />
          ) : currentPage === 'terms' ? (
            <TermsPage />
          ) : currentPage === 'privacy-policy' ? (
            <PrivacyPolicyPage />
          ) : currentPage === 'cookies' ? (
            <CookiesPage />
          ) : (
            <>
              <Hero onNavigate={handleNavigate} onVideoLoaded={handleVideoLoaded} />
              <Features />
              <Catalog onSelectCategory={handleCategorySelect} />
              <Benefits />
              <Gallery />
              <Testimonials />
              <SocialCta />
            </>
          )}
        </main>

        <CookieConsent onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} onSelectCategory={handleCategorySelect} />
        <PlantDoctor />
      </div>
    </div>
  );
}

export default App;
