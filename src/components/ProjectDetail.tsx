import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import { ChevronLeft } from 'lucide-react';
import theme from '../theme';
import { Project } from '../data/projects';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px ${theme.spacing.grid} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 60px;
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
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const MediaItem = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16/9;
  
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
  }
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.accent};
  font-family: ${theme.typography.monoSpace};
  text-decoration: none;
  margin-top: 2rem;
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
  return (
    <>
      <Navigation activeSection="projects" />
      <Container>
        <BackButton onClick={onBack}>
          <ChevronLeft size={20} />
          Back to Projects
        </BackButton>
        
        <Content>
          <Title>{project.title}</Title>
          <Year>{project.year}</Year>
          
          <Section>
            <SectionTitle>About the Project</SectionTitle>
            <Description>{project.description}</Description>
          </Section>
          
          <Section>
            <SectionTitle>Impact</SectionTitle>
            <Description>{project.impact || "Impact details coming soon..."}</Description>
          </Section>
          
          <Section>
            <SectionTitle>My Role</SectionTitle>
            <Description>{project.role || "Role details coming soon..."}</Description>
          </Section>
          
          <Section>
            <SectionTitle>The Brag</SectionTitle>
            <Description>{project.brag}</Description>
          </Section>
          
          {project.media && project.media.length > 0 && (
            <Section>
              <SectionTitle>Project Media</SectionTitle>
              <MediaGrid>
                {project.media.map((item, index) => (
                  <MediaItem key={index}>
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
          
          {project.externalLink && (
            <ExternalLink href={project.externalLink} target="_blank" rel="noopener noreferrer">
              Visit Project Website →
            </ExternalLink>
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
};

export default ProjectDetail; 