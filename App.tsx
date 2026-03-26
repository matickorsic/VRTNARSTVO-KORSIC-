import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Features } from './components/Features';
import { Benefits } from './components/Benefits';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { SocialCta } from './components/SocialCta';
import { Footer } from './components/Footer';
import { PlantDoctor } from './components/PlantDoctor';
import { AboutPage } from './components/AboutPage';
import { CategoryPage } from './components/CategoryPage';
import { CompanyDetailsPage } from './components/CompanyDetailsPage';
import { TermsPage } from './components/TermsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { CookiesPage } from './components/CookiesPage';
import { CookieConsent } from './components/CookieConsent';
import { Category } from './types';

export type Page = 'home' | 'about' | 'category' | 'company-details' | 'terms' | 'privacy-policy' | 'cookies';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedCategory(null); // Clear category when navigating to main pages
    window.scrollTo(0, 0);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const handleBackFromCategory = () => {
    setSelectedCategory(null);
    setCurrentPage('home'); // Return to home where catalog is
    // Optional: scroll to catalog section
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
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
          /* Home Page */
          <>
            <Hero onNavigate={handleNavigate} />
            <Features />
            {/* Pass handleCategorySelect to Catalog */}
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
  );
}

export default App;