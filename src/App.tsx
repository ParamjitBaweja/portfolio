import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import ProjectCarousel from './components/ProjectCarousel';
import PhotoGallery, { Photo } from './components/PhotoGallery';
import Resume from './components/Resume';
import theme from './theme';

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
  text-align: left;
  position: relative;
`;

const HeroText = styled.h1`
  font-size: 4.5rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const SubText = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.lightText};
  max-width: 600px;
  margin-bottom: 3rem;
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Navigation />
      
      <HomePage id="home">
        <Container>
          <HeroText>
            Bridging the gap between<br />
            robotics and healthcare
          </HeroText>
          <SubText>
            Robotics Engineer specializing in medical applications and autonomous systems
          </SubText>
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
    </>
  );
}

export default App; 