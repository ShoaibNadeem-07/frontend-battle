import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'WanderWise made our European adventure absolutely magical. The AI recommendations were spot-on, and every detail was perfectly planned. We discovered hidden gems we never would have found on our own!',
      trip: 'European Adventure',
      date: '2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco, USA',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The level of personalization was incredible. From the moment we booked until we returned home, everything was seamless. The 24/7 support team was there whenever we needed them.',
      trip: 'Asian Cultural Tour',
      date: '2024'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Miami, USA',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'As a solo female traveler, I felt completely safe and supported throughout my journey. The local connections and authentic experiences were beyond my expectations.',
      trip: 'Solo Adventure in Morocco',
      date: '2023'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'London, UK',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Planning our honeymoon was stress-free thanks to WanderWise. Every romantic detail was thoughtfully arranged, from sunset dinners to private excursions. Pure perfection!',
      trip: 'Honeymoon in Santorini',
      date: '2024'
    },
    {
      id: 5,
      name: 'Anna Kowalski',
      location: 'Berlin, Germany',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The family-friendly itinerary was perfect for our kids. Educational, fun, and engaging activities kept everyone happy. The best family vacation we\'ve ever had!',
      trip: 'Family Adventure in Costa Rica',
      date: '2023'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travelers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real travelers who have experienced the magic of WanderWise
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative h-96 md:h-80">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden">
                  {/* Background Quote */}
                  <Quote className="absolute top-4 right-4 h-16 w-16 text-blue-100 opacity-50" />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <motion.img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-gray-600">
                          {testimonials[currentIndex].location}
                        </p>
                        <div className="flex items-center mt-1">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 font-medium">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                  </div>

                  {/* Trip Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                      <span className="text-sm font-semibold text-blue-800">
                        {testimonials[currentIndex].trip}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {testimonials[currentIndex].date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={() => paginate(-1)}
              className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </motion.button>

            {/* Testimonial Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </motion.button>
          </div>

          {/* Small Testimonial Preview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? 'opacity-100 scale-105'
                    : 'opacity-60 hover:opacity-80'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-center text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-center text-gray-600 truncate">
                    {testimonial.trip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;