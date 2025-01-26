import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  images: string[];
  bullets: string[];
  brag: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextProject = useCallback(() => {
    setDirection(1);
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(nextIndex);
    window.location.hash = projects[nextIndex].id;
  }, [currentIndex, projects]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(prevIndex);
    window.location.hash = projects[prevIndex].id;
  }, [currentIndex, projects]);

  const goToProject = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    window.location.hash = projects[index].id;
  }, [currentIndex, projects]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const projectIndex = projects.findIndex(p => p.id === hash);
    if (projectIndex !== -1) {
      setCurrentIndex(projectIndex);
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      const newIndex = projects.findIndex(p => p.id === newHash);
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevProject();
      } else if (e.key === 'ArrowRight') {
        nextProject();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects, nextProject, prevProject]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextProject();
      } else {
        prevProject();
      }
      setTouchStart(null);
    }
  };

  const project = projects[currentIndex];

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

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-7xl mx-auto px-4 select-none min-h-screen flex items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="w-full space-y-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
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
            className="grid md:grid-cols-2 gap-8 p-12"
          >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full">
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover rounded-xl shadow-lg"
                style={{ objectPosition: 'center' }}
              />
              {project.images[1] && (
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  src={project.images[1]}
                  alt={`${project.title} secondary`}
                  className="absolute bottom-4 right-4 w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
                />
              )}
            </div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{project.title}</h3>
                <p className="text-blue-600 font-medium text-lg mt-2">{project.year}</p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>

              <div>
                <h4 className="font-bold text-gray-800 text-xl mb-4">Key Achievements:</h4>
                <ul className="space-y-3">
                  {project.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-3 text-lg">•</span>
                      <span className="text-gray-600 text-lg">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="font-bold text-gray-800 text-xl mb-4">The Brag:</h4>
                <p className="text-gray-600 italic text-lg">{project.brag}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-3">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevProject}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 shadow-lg transition-colors rounded-r-xl backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextProject}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 shadow-lg transition-colors rounded-l-xl backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </motion.button>
    </div>
  );
};

export default ProjectCarousel; 