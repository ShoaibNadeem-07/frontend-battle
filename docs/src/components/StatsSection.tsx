import React, { useEffect, useState } from 'react';
import { Users, MapPin, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const StatsSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [counts, setCounts] = useState({
    customers: 0,
    destinations: 0,
    rating: 0,
    awards: 0
  });

  const stats = [
    {
      icon: Users,
      label: 'Happy Travelers',
      value: 50000,
      suffix: '+',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      label: 'Destinations',
      value: 200,
      suffix: '+',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: 4.9,
      suffix: '/5',
      color: 'from-yellow-500 to-yellow-600',
      decimal: true
    },
    {
      icon: Award,
      label: 'Travel Awards',
      value: 25,
      suffix: '+',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const counters = stats.map((stat, index) => {
      const increment = stat.value / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(counters[index]);
        }

        setCounts(prev => ({
          ...prev,
          [Object.keys(prev)[index]]: stat.decimal ? Number(current.toFixed(1)) : Math.floor(current)
        }));
      }, interval);
    });

    return () => {
      counters.forEach(counter => clearInterval(counter));
    };
  }, [isInView]);

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
    hidden: { opacity: 0, y: 50, scale: 0.8 },
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
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Thousands</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join the growing community of travelers who have discovered the world with WanderWise
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <motion.div
                className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-10 w-10 text-white" />
              </motion.div>

              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {Object.values(counts)[index]}{stat.suffix}
              </motion.div>

              <div className="text-lg text-blue-200 font-medium">
                {stat.label}
              </div>

              {/* Progress Bar */}
              <motion.div
                className="w-full bg-white/20 rounded-full h-1 mt-4 overflow-hidden"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Chart Visualization */}
        <motion.div
          className="mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Customer Satisfaction Over Time</h3>
          {/** Fixed monthly satisfaction data (0-100 scale) */}
          {(() => {
            const satisfaction = [72, 80, 85, 90, 88, 92, 95, 97, 93, 89, 85, 90];
            const max = 100;
            return (
              <div className="grid grid-cols-12 gap-2 h-32 items-end">
                {satisfaction.map((value, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t cursor-pointer group"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${(value / max) * 100}%` } : { height: 0 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 18, delay: i * 0.08 }}
                    whileHover={{ scale: 1.08 }}
                    title={`Satisfaction: ${value}%`}
                  >
                    {/* Tooltip on hover */}
                    <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-blue-700 text-xs font-semibold px-2 py-1 rounded shadow-lg z-10">
                      {value}%
                    </span>
                  </motion.div>
                ))}
              </div>
            );
          })()}
          <div className="flex justify-between mt-4 text-sm text-blue-200">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;