import React from 'react';
import { Compass, Shield, Clock, Heart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const FeaturesSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const features = [
    {
      icon: Compass,
      title: 'Smart Planning',
      description: 'AI-powered itineraries tailored to your preferences and budget',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your payments and personal data are protected with industry-leading security',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance wherever your journey takes you',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Heart,
      title: 'Local Experiences',
      description: 'Discover hidden gems and authentic experiences recommended by locals',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Handpicked accommodations and services that exceed expectations',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book flights, hotels, and activities in seconds with our streamlined process',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">WanderWise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge technology with human expertise to deliver travel experiences that exceed your expectations
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 relative overflow-hidden">
                {/* Ripple Effect Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-700`} />
                </div>

                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;