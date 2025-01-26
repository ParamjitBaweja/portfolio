import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import ProjectCarousel from './components/ProjectCarousel';
import PhotoGallery, { Photo } from './components/PhotoGallery';
import Resume from './components/Resume';
import theme from './theme';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

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
`;

const SocialLink = styled.a`
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: ${theme.typography.monoSpace};
  transition: ${theme.transitions.smooth};

  &:hover {
    color: ${theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const generateId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const projectsData = [
  {
    id: 'aethon-robot',
    title: "Hospital Logistics Robot - Aethon",
    year: "2024",
    description: "Developed navigation systems for autonomous hospital logistics robots at Aethon, improving healthcare efficiency.",
    images: ["/assets/images/aethon-robot.jpg"],
    bullets: [
      "Developed navigation systems for autonomous hospital robots",
      "Implemented efficient path planning algorithms",
      "Integrated with hospital infrastructure"
    ],
    brag: "Successfully improved delivery efficiency by 40% across multiple hospitals",
    technologies: ["ROS", "C++", "Python", "SLAM"]
  },
  {
    id: 'knee-surgery',
    title: "Robotic Knee Surgery Assistant",
    year: "2023-2024",
    description: "Led the development of precision control systems for robotic knee surgery assistance at CMU.",
    images: ["/assets/images/knee-surgery.jpg"],
    bullets: [
      "Developed precision control systems for surgical robotics",
      "Implemented safety protocols and redundancy checks",
      "Created surgeon-robot interaction interface"
    ],
    brag: "Achieved sub-millimeter precision in surgical tool positioning",
    technologies: ["ROS2", "C++", "Computer Vision", "Control Systems"]
  },
  {
    id: 'medical-image',
    title: "Medical Image Segmentation",
    year: "2022",
    description: "Created deep learning solutions for medical image analysis, improving surgical planning efficiency.",
    images: ["/assets/images/medical-image.jpg"],
    bullets: [
      "Developed deep learning models for medical image segmentation",
      "Implemented real-time processing pipeline",
      "Created visualization tools for surgeons"
    ],
    brag: "Reduced segmentation time by 60% while maintaining 95% accuracy",
    technologies: ["Python", "PyTorch", "OpenCV", "CUDA"]
  },
  {
    id: 'underwater-robot',
    title: "Underwater Robot Navigation",
    year: "2022",
    description: "Developed innovative navigation solutions for underwater robotics, published in a leading robotics journal.",
    images: ["/assets/images/underwater.jpg"],
    bullets: [
      "Developed navigation system for underwater robots",
      "Implemented SLAM in underwater environments",
      "Created simulation environment for testing"
    ],
    brag: "Published in IEEE Robotics and Automation Letters",
    technologies: ["ROS", "C++", "Gazebo", "Computer Vision"]
  },
  {
    id: 'multi-robot',
    title: "Multi-Robot Motion Planning",
    year: "2021",
    description: "Created a blockchain-based distributed motion planning system for multi-robot coordination.",
    images: ["/assets/images/multi-robot.jpg"],
    bullets: [
      "Developed distributed motion planning algorithms",
      "Implemented blockchain-based consensus",
      "Created visualization and simulation framework"
    ],
    brag: "Presented at IROS Workshop on Distributed Robotics",
    technologies: ["Python", "ROS", "Ethereum", "React"]
  },
  {
    id: 'formula',
    title: "Formula Student Driverless",
    year: "2019",
    description: "Pioneered autonomous racing technology for Formula Student competition, focusing on perception and control.",
    images: ["/assets/images/formula.jpg"],
    bullets: [
      "Developed perception system for autonomous racing",
      "Implemented path planning algorithms",
      "Created real-time control system"
    ],
    brag: "Achieved autonomous lap times within 15% of human driver",
    technologies: ["ROS", "C++", "Python", "Computer Vision"]
  }
];

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

const photoGalleryData: ReadonlyArray<Photo> = [
  {
    src: "/assets/images/hiking1.jpg",
    alt: "Mountain hiking trail",
    category: "hiking"
  },
  {
    src: "/assets/images/hiking2.jpg",
    alt: "Summit view",
    category: "hiking"
  },
  {
    src: "/assets/images/travel1.jpg",
    alt: "City exploration",
    category: "travel"
  },
  {
    src: "/assets/images/travel2.jpg",
    alt: "Cultural site",
    category: "travel"
  },
  {
    src: "/assets/images/sunset1.jpg",
    alt: "Beach sunset",
    category: "sunset"
  },
  {
    src: "/assets/images/sunset2.jpg",
    alt: "Mountain sunset",
    category: "sunset"
  }
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
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
        <ProjectCarousel projects={projectsData} />
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