import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const DestinationCarousel = lazy(() => import('./components/DestinationCarousel'));
const StatsSection = lazy(() => import('./components/StatsSection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <main id="main-content" role="main">
              <Hero />
              <FeaturesSection />
              <Suspense fallback={<LoadingSpinner />}>
                <DestinationCarousel />
                <StatsSection />
                <TestimonialsSection />
              </Suspense>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;