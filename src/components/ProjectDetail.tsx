import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import { ChevronLeft, X } from 'lucide-react';
import theme from '../theme';
import { Project } from '../data/projects';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px ${theme.spacing.grid} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 100px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.text};
  font-family: ${theme.typography.monoSpace};
  margin-bottom: 2rem;
  transition: ${theme.transitions.smooth};
  
  &:hover {
    color: ${theme.colors.accent};
    transform: translateX(-4px);
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 4rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Year = styled.p`
  color: ${theme.colors.accent};
  font-family: ${theme.typography.monoSpace};
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.text};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${theme.colors.lightText};
  margin-bottom: 2rem;
  white-space: pre-line;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    .media-item:nth-child(n+3) {
      display: none;
    }
  }
`;

const MediaItem = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16/9;
  cursor: pointer;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem;
    font-size: 0.9rem;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
  }

  &:hover .caption {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FullScreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FullScreenContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;

  img, video {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.accent};
  font-family: ${theme.typography.monoSpace};
  text-decoration: none;
  // margin-top: 2rem;
  margin-bottom: 2rem;
  transition: ${theme.transitions.smooth};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  padding: 4rem 0;
  background: ${theme.colors.background};
  text-align: center;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
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

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [selectedMedia, setSelectedMedia] = useState<{url: string, type: string, caption?: string} | null>(null);

  const handleNavClick = (sectionId: string) => {
    // Store the target section ID before unmounting
    const targetSection = sectionId;
    
    // First unmount this component by calling onBack
    onBack();
    
    // After the component is unmounted and main view is rendered,
    // scroll to the target section
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Split media items into two arrays
  const primaryMedia = project.media?.slice(0, 2) || [];
  const additionalMedia = project.media?.slice(2) || [];

  return (
    <>
      <Navigation 
        activeSection="journey" 
        onNavClick={handleNavClick}
        links={['journey']}
      />
      <Container>
        <BackButton onClick={onBack}>
          <ChevronLeft size={20} />
          Back to Projects
        </BackButton>
        
        <Content>
          <Title>{project.title}</Title>
          <Year>{project.year}</Year>
          
          {/* Primary Media Section (first 2 items) */}
          {primaryMedia.length > 0 && (
            <Section>
              <MediaGrid>
                {primaryMedia.map((item, index) => (
                  <MediaItem 
                    key={index} 
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.url} alt={item.caption || `Project media ${index + 1}`} />
                    ) : (
                      <video src={item.url} controls />
                    )}
                    {item.caption && <div className="caption">{item.caption}</div>}
                  </MediaItem>
                ))}
              </MediaGrid>
            </Section>
          )}

          <Section>
            <SectionTitle>About the Project</SectionTitle>
            <Description>{project.longDescription}</Description>
          </Section>
          {project.externalLink && (
            <ExternalLink href={project.externalLink} target="_blank" rel="noopener noreferrer">
              Visit Website →
            </ExternalLink>
          )}
          
          {project.additionalLinkName && project.additionalLink && (
            <>
              <br />
              <ExternalLink href={project.additionalLink} target="_blank" rel="noopener noreferrer">
                {project.additionalLinkName} →
              </ExternalLink>
            </>
          )}

          <Section>
            <SectionTitle>Why?</SectionTitle>
            <Description>{project.impact || "Impact details coming soon..."}</Description>
          </Section>
          
          <Section>
            <SectionTitle>My Role</SectionTitle>
            <Description>{project.role || "Role details coming soon..."}</Description>
          </Section>
          
          <Section>
            <SectionTitle>Brag</SectionTitle>
            <Description>{project.brag}</Description>
          </Section>
          
          {/* Additional Media Section (remaining items) */}
          {additionalMedia.length > 0 && (
            <Section>
              <SectionTitle>More Media</SectionTitle>
              <MediaGrid>
                {additionalMedia.map((item, index) => (
                  <MediaItem 
                    key={index + 2} // offset by 2 to avoid key conflicts
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.url} alt={item.caption || `Project media ${index + 3}`} />
                    ) : (
                      <video src={item.url} controls />
                    )}
                    {item.caption && <div className="caption">{item.caption}</div>}
                  </MediaItem>
                ))}
              </MediaGrid>
            </Section>
          )}

          <BackButton 
            onClick={onBack}
            style={{ marginTop: '3rem', justifyContent: 'center' }}
          >
            <ChevronLeft size={20} />
            Back to Projects
          </BackButton>
        </Content>
      </Container>

      {selectedMedia && (
        <FullScreenModal onClick={() => setSelectedMedia(null)}>
          <FullScreenContent onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.url} alt={selectedMedia.caption || 'Full screen view'} />
            ) : (
              <video src={selectedMedia.url} controls autoPlay />
            )}
            <CloseButton onClick={() => setSelectedMedia(null)}>
              <X size={24} />
            </CloseButton>
          </FullScreenContent>
        </FullScreenModal>
      )}

      <Footer>
        <Container>
          <ContactTitle>Get in Touch</ContactTitle>
          <SocialLinks>
            <SocialLink href="https://linkedin.com/in/paramjitbaweja" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} /> paramjitbaweja
            </SocialLink>
            <SocialLink href="https://github.com/paramjitbaweja" target="_blank" rel="noopener noreferrer">
              <Github size={24} /> paramjitbaweja
            </SocialLink>
            <SocialLink href="mailto:paramjitbaweja@cmu.edu">
              <Mail size={24} /> paramjitbaweja@cmu.edu
            </SocialLink>
          </SocialLinks>
        </Container>
      </Footer>
    </>
  );
};

export default ProjectDetail; 