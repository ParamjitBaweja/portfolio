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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.grid};
`;

const Section = styled.section<{ noOverflow?: boolean }>`
  min-height: 90vh;
  padding: ${theme.spacing.section} 0;
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
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineItem = styled.div`
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease-out forwards;
  animation-play-state: paused;

  &.loaded {
    animation-play-state: running;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Year = styled.span`
  font-family: ${theme.typography.monoSpace};
  color: ${theme.colors.accent};
  font-size: 1.2rem;
`;

const TimelineTitle = styled.h3`
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const TimelineDescription = styled.p`
  color: ${theme.colors.lightText};
  font-size: 1.1rem;
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

const timelineData = [
  {
    year: "2023-2024",
    title: "CMU & Medical Robotics",
    description: "Led development of navigation systems for Aethon's hospital logistics robots and contributed to robotic knee replacement surgery research at CMU.",
    projectIds: ["aethon-robot", "knee-surgery"]
  },
  {
    year: "2022",
    title: "University of Toronto & SickKids",
    description: "Worked on automated assists for Minimally Invasive Surgeries, bridging robotics with healthcare. Published research on underwater robotics.",
    projectIds: ["medical-image", "underwater-robot"]
  },
  {
    year: "2021",
    title: "Multi-Robot Systems Research",
    description: "Developed innovative motion planning algorithms for multi-robot systems, later enhancing it with blockchain technology for an iROS workshop presentation.",
    projectIds: ["multi-robot"]
  },
  {
    year: "2019",
    title: "Formula Manipal - Beginning of Robotics Journey",
    description: "Started exploring robotics with driverless car development, laying the foundation for my passion in autonomous systems.",
    projectIds: ["formula"]
  }
];

const photoGalleryData: readonly Photo[] = [
  {
    src: "/assets/images/hiking1.jpg",
    alt: "Mountain hiking trail",
    category: "hiking" as PhotoCategory
  },
  {
    src: "/assets/images/hiking2.jpg",
    alt: "Summit view",
    category: "hiking" as PhotoCategory
  },
  {
    src: "/assets/images/travel1.jpg",
    alt: "City exploration",
    category: "travel" as PhotoCategory
  },
  {
    src: "/assets/images/travel2.jpg",
    alt: "Cultural site",
    category: "travel" as PhotoCategory
  },
  {
    src: "/assets/images/sunset1.jpg",
    alt: "Beach sunset",
    category: "sunset" as PhotoCategory
  },
  {
    src: "/assets/images/sunset2.jpg",
    alt: "Mountain sunset",
    category: "sunset" as PhotoCategory
  }
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const heroTexts = [
    "Bridging the gap between\nhealthcare and technology",
    "Building the future of \nrobotics",
    "Innovating at the intersection of\nsoftware and hardware"
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setTextIndex((current) => (current + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToJourney = () => {
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            key={textIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {heroTexts[textIndex].split('\n').map((line, i) => (
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
          <TimelineContainer>
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                className={isLoaded ? 'loaded' : ''}
              >
                <Year>{item.year}</Year>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineDescription>{item.description}</TimelineDescription>
                <TimelineProjects>
                  {item.projectIds.map((projectId, idx) => {
                    const project = projectsData.find(p => p.id === projectId);
                    return project ? (
                      <ProjectLink key={idx} href={`#${projectId}`}>
                        {project.title} →
                      </ProjectLink>
                    ) : null;
                  })}
                </TimelineProjects>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Container>
      </Section>

      <Section id="projects" noOverflow>
        <ProjectCarousel projects={projectsData} onProjectClick={handleProjectClick} />
      </Section>

      <Section id="resume">
        <Resume />
      </Section>

      <Section id="extracurriculars">
        <Container>
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
            <SocialLink href="https://instagram.com/paramjit.baweja" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} /> paramjit.baweja
            </SocialLink>
            <SocialLink href="mailto:paramjitbaweja@cmu.edu">
              <Mail size={24} /> paramjitbaweja@cmu.edu
            </SocialLink>
          </SocialLinks>
        </Container>
      </Footer>
    </>
  );
}

export default App; 