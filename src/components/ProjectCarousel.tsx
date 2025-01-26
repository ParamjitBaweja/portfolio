import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  images: string[];
  bullets: string[];
  brag: string;
  role?: string;
  impact?: string;
  media?: { type: 'image' | 'video'; url: string; caption?: string }[];
  externalLink?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onProjectClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const project = projects[currentIndex];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-7xl mx-auto px-4 select-none h-[50vh] min-h-[calc(80vh-6rem)] flex flex-col justify-between pb-30 mt-[64px]"
      style={{ paddingTop: 'calc(80px + 3rem)' }}
    >
      <div className="w-full space-y-12">
        <div 
          className="bg-white shadow-xl rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          onClick={() => onProjectClick(project.id)}
        >
          <div
            key={currentIndex}
            className={`grid md:grid-cols-2 gap-8 md:p-12 p-6 transition-all duration-300 ease-in-out transform ${
              direction > 0 ? 'slide-in-right' : 'slide-in-left'
            }`}
          >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-500 ease-in-out"
                style={{ objectPosition: 'center' }}
              />
              {project.images[1] && (
                <img
                  src={project.images[1]}
                  alt={`${project.title} secondary`}
                  className="absolute bottom-4 right-4 w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg transition-all duration-500 ease-in-out delay-300 md:block hidden"
                />
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{project.title}</h3>
                <p className="text-blue-600 font-medium text-base md:text-lg mt-2">{project.year}</p>
              </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">{project.description}</p>

              {/* Mobile achievements section */}
              <div className="md:hidden">
                <h4 className="font-bold text-gray-800 text-lg mb-2">Key Achievements:</h4>
                <ul className="space-y-2">
                  {project.bullets.slice(0, 2).map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-2 text-base">•</span>
                      <span className="text-gray-600 text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desktop achievements section */}
              <div className="md:block hidden">
                <h4 className="font-bold text-gray-800 text-xl mb-4">Key Achievements:</h4>
                <ul className="space-y-3">
                  {project.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-3 text-lg">•</span>
                      <span className="text-gray-600 text-lg">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brag section - desktop only */}
              <div className="hidden md:block">
                <h4 className="font-bold text-gray-800 text-xl mb-4">The Brag:</h4>
                <p className="text-gray-600 italic text-lg">{project.brag}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-3 pb-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToProject(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevProject();
        }}
        className="absolute left-0 top-[75%] transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 md:p-4 p-2 shadow-lg transition-all duration-300 rounded-r-xl backdrop-blur-sm hover:scale-110 active:scale-90"
      >
        <ChevronLeft className="md:w-8 md:h-8 w-6 h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextProject();
        }}
        className="absolute right-0 top-[75%] transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 md:p-4 p-2 shadow-lg transition-all duration-300 rounded-l-xl backdrop-blur-sm hover:scale-110 active:scale-90"
      >
        <ChevronRight className="md:w-8 md:h-8 w-6 h-6" />
      </button>
    </div>
  );
};

export default ProjectCarousel; 