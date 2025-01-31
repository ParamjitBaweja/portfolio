import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import ProjectCarousel from './components/ProjectCarousel';
import PhotoGallery from './components/PhotoGallery';
import Resume from './components/Resume';
import theme from './theme';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { projectsData } from './data/projects';
import { Photo, PhotoCategory } from './components/PhotoGallery';
import ProjectDetail from './components/ProjectDetail';
import { timelineData } from './data/projectsData';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.grid};
`;

const Section = styled.section<{ noOverflow?: boolean; isResume?: boolean }>`
  min-height: ${props => props.isResume ? '100vh' : '80vh'};
  padding: ${props => props.isResume ? '0 0 4.5rem 0' : '80px 0 3rem 0'};
  margin-top: ${props => props.isResume ? '0' : '-80px'};
  scroll-margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.typography.fontFamily};
  overflow: ${props => props.noOverflow ? 'hidden' : 'visible'};
  position: relative;
`;

const HomePage = styled(Section)`
  background: ${theme.colors.background};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  padding: 80px 0 0 0;
  margin-top: 0;
`;

const HeroText = styled(motion.h1)`
  font-size: 4.5rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const SubText = styled(motion.p)`
  font-size: 1.3rem;
  color: ${theme.colors.lightText};
  max-width: 900px;
  margin: 0 auto 3rem;
  font-family: ${theme.typography.monoSpace};
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const TimelineItem = styled.div`
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease-out forwards;
  animation-play-state: paused;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: ${theme.transitions.smooth};
  border: 2px solid transparent;
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 2rem;
  align-items: center;

  &.loaded {
    animation-play-state: running;
  }

  &:hover {
    border-color: ${theme.colors.accent};
    transform: translateY(-4px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${theme.transitions.smooth};
  }

  ${TimelineItem}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 150px;
  }
`;

const Year = styled.span`
  font-family: ${theme.typography.monoSpace};
  color: ${theme.colors.accent};
  font-size: 1.1rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.8rem;
  margin: 0.5rem 0;
`;

const TimelineDescription = styled.p`
  color: ${theme.colors.lightText};
  font-size: 1rem;
  line-height: 1.6;
`;

const TimelineProjects = styled.div`
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  font-family: ${theme.typography.monoSpace};
  color: ${theme.colors.accent};
  font-size: 0.9rem;
  text-decoration: none;
  margin-right: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DownArrow = styled(motion.div)`
  position: absolute;
  bottom: 6rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  cursor: pointer;
  color: ${theme.colors.accent};
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: 8rem;
  }
`;

const Footer = styled(Section)`
  min-height: auto;
  padding: 4rem 0;
  background: ${theme.colors.background};
  text-align: center;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.text};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const SocialLink = styled.a`
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: ${theme.typography.monoSpace};
  transition: ${theme.transitions.smooth};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }

  &:hover {
    color: ${theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${theme.colors.text};
`;

const photoGalleryData: readonly Photo[] = [
  {
    src: "./assets/images/hiking2.jpg",
    alt: "Summit view",
    category: "hiking" as PhotoCategory
  },
  {
    src: "./assets/images/hiking1.jpg",
    alt: "Summit view",
    category: "hiking" as PhotoCategory
  },
  {
    src: "./assets/images/hiking3.jpg",
    alt: "Summit view",
    category: "hiking" as PhotoCategory
  },
  {
    src: "./assets/images/travel1.jpg",
    alt: "City exploration",
    category: "travel" as PhotoCategory
  },
  {
    src: "./assets/images/travel2.jpg",
    alt: "Cultural site",
    category: "travel" as PhotoCategory
  },
  {
    src: "./assets/images/Sunset1.jpg",
    alt: "Farm sunset",
    category: "sunset" as PhotoCategory
  },
  // {
  //   src: "/assets/images/Sunset2.mp4",
  //   alt: "Airport sunset",
  //   category: "sunset" as PhotoCategory
  // },
  {
    src: "./assets/images/Sunset4.jpg",
    alt: "Airport sunset",
    category: "sunset" as PhotoCategory
  },
  {
    src: "./assets/images/Sunset3.jpeg",
    alt: "Mountain sunset",
    category: "sunset" as PhotoCategory
  }
];

// Add a new styled section specifically for Projects
const ProjectsSection = styled(Section)`
  min-height: 100vh; // Increased from 80vh to 100vh
  padding: 80px 0 6rem 0; // Increased bottom padding
`;

const CreditText = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.lightText};
  padding-top: 1.5rem;
  font-family: ${theme.typography.monoSpace};
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.smooth};
    
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .desktop-text {
      display: none;
    }
  }

  @media (min-width: ${theme.breakpoints.mobile}) {
    .mobile-text {
      display: none;
    }
  }
`;

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  
  const heroTexts = [
    "Building the future \nof robotics",
    "Bridging the gap between\nhealthcare and technology",
    "Innovating at the intersection of\nsoftware and hardware"
  ];

  // Add useEffect to detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= parseInt(theme.breakpoints.mobile));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    // Only set up the interval if not on mobile
    if (!isMobile) {
      const interval = setInterval(() => {
        setTextIndex((current) => (current + 1) % heroTexts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]); // Add isMobile to dependencies

  const scrollToJourney = () => {
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = (projectId: string) => {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
      setLastScrollPosition(window.scrollY);
      // Update the URL hash
      window.location.hash = `project/${projectId}`;
      // First scroll to top
      window.scrollTo(0, 0);
      // Then set the selected project
      requestAnimationFrame(() => {
        setSelectedProject(projectId);
        document.body.style.overflow = 'auto';
      });
    }
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    // Clear the hash
    window.location.hash = '';
    requestAnimationFrame(() => {
      window.scrollTo(0, lastScrollPosition);
    });
  };

  // Add a handler for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('project/')) {
        const projectId = hash.replace('project/', '');
        if (projectsData.some(p => p.id === projectId)) {
          handleProjectClick(projectId);
        }
      } else if (!hash && selectedProject) {
        handleBackToProjects();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [selectedProject]);

  if (selectedProject) {
    const project = projectsData.find(p => p.id === selectedProject);
    if (!project) return null;
    return <ProjectDetail project={project} onBack={handleBackToProjects} />;
  }

  return (
    <>
      <Navigation />
      
      <HomePage id="home">
        <Container>
          <HeroText
            key={isMobile ? 'static' : textIndex}
            initial={isMobile ? false : { opacity: 0, y: -20 }}
            animate={isMobile ? {} : { opacity: 1, y: 0 }}
            exit={isMobile ? {} : { opacity: 0, y: 20 }}
            transition={isMobile ? {} : { duration: 1.2, ease: "easeInOut" }}
          >
            {(isMobile ? heroTexts[0] : heroTexts[textIndex]).split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < heroTexts[textIndex].split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </HeroText>
          <SubText
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          >
            Hello! I'm Paramjit Singh Baweja, a Robotics Engineer aspiring to be a full-stack roboticist, building end-to-end robotic systems.
          </SubText>
          <DownArrow
            onClick={scrollToJourney}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </DownArrow>
        </Container>
      </HomePage>

      <Section id="journey">
        <Container>
          {/* <SectionTitle>My Journey</SectionTitle> */}
          <TimelineContainer>
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                className={isLoaded ? 'loaded' : ''}
                onClick={() => {
                  if (item.projectIds.length > 0) {
                    handleProjectClick(item.projectIds[0]);
                  }
                }}
              >
                <TimelineContent>
                  <Year>{item.year}</Year>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                  <TimelineProjects>
                    {item.projectIds.map((projectId, idx) => {
                      const project = projectsData.find(p => p.id === projectId);
                      return project ? (
                        <ProjectLink 
                          key={idx} 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(projectId);
                          }}
                        >
                          {project.title} →
                        </ProjectLink>
                      ) : null;
                    })}
                  </TimelineProjects>
                </TimelineContent>
                <TimelineImage>
                  {item.projectIds[0] && projectsData.find(p => p.id === item.projectIds[0])?.images[0] && (
                    <img 
                      src={projectsData.find(p => p.id === item.projectIds[0])?.images[0]} 
                      alt={item.title}
                    />
                  )}
                </TimelineImage>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Container>
      </Section>

      {/* <ProjectsSection id="projects" noOverflow>
        <ProjectCarousel projects={projectsData} onProjectClick={handleProjectClick} />
      </ProjectsSection> */}

      <Section id="resume" isResume>
        <Resume />
      </Section>

      <Section id="extracurriculars">
        <Container>
          <SectionTitle>Beyond Code</SectionTitle>
          <PhotoGallery photos={photoGalleryData} />
        </Container>
      </Section>

      <Footer id="contact">
        <Container>
          <ContactTitle>Get in Touch</ContactTitle>
          <SocialLinks>
            <SocialLink href="https://linkedin.com/in/paramjitbaweja" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} /> paramjitbaweja
            </SocialLink>
            <SocialLink href="https://github.com/paramjitbaweja" target="_blank" rel="noopener noreferrer">
              <Github size={24} /> paramjitbaweja
            </SocialLink>
            {/* <SocialLink href="https://instagram.com/paramjit.baweja" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} /> paramjit.baweja
            </SocialLink> */}
            <SocialLink href="mailto:paramjitbaweja@cmu.edu">
              <Mail size={24} /> paramjitbaweja@cmu.edu
            </SocialLink>
          </SocialLinks>
          <CreditText>
            <span className="desktop-text">
              Made with support from the amazing <a href="https://www.linkedin.com/in/insha-manowar/" target="_blank" rel="noopener noreferrer">Insha Manowar</a>
            </span>
            <span className="mobile-text">
              Made with support from <a href="https://www.linkedin.com/in/insha-manowar/" target="_blank" rel="noopener noreferrer">Insha</a>
            </span>
          </CreditText>
        </Container>
      </Footer>
    </>
  );
}

export default App; 