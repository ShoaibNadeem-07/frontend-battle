import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationCarousel = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      price: '$1,299',
      description: 'Stunning sunsets and whitewashed buildings overlooking the Aegean Sea',
      features: ['Luxury Hotels', 'Wine Tours', 'Beach Access']
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      price: '$1,599',
      description: 'Ancient temples, traditional gardens, and authentic Japanese culture',
      features: ['Temple Tours', 'Cultural Experience', 'Traditional Cuisine']
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      price: '$899',
      description: 'Tropical paradise with lush rice terraces and pristine beaches',
      features: ['Beach Resorts', 'Spa Treatments', 'Adventure Tours']
    },
    {
      id: 4,
      name: 'Iceland',
      image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      price: '$1,899',
      description: 'Northern Lights, glaciers, and breathtaking natural wonders',
      features: ['Northern Lights', 'Glacier Tours', 'Hot Springs']
    },
    {
      id: 5,
      name: 'Patagonia, Chile',
      image: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      price: '$2,199',
      description: 'Dramatic landscapes and world-class trekking adventures',
      features: ['Hiking Trails', 'Wildlife Viewing', 'Photography Tours']
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, destinations.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="destinations" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Destinations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the world's most breathtaking destinations curated by our travel experts
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div
                  className="w-full h-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${destinations[currentIndex].image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-2xl">
                      <div className="flex items-center space-x-2 mb-4">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <span className="text-blue-400 font-medium">Featured Destination</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {destinations[currentIndex].name}
                      </h3>
                      
                      <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                        {destinations[currentIndex].description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        {destinations[currentIndex].features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-bold">{destinations[currentIndex].rating}</span>
                          </div>
                          <div className="text-2xl font-bold text-green-400">
                            {destinations[currentIndex].price}
                          </div>
                        </div>
                        
                        <motion.button
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full font-semibold transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-4 mt-8">
            {destinations.map((destination, index) => (
              <motion.button
                key={destination.id}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-4 ring-blue-400 scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </motion.button>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationCarousel;