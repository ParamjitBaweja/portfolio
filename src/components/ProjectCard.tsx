import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';

interface ProjectCardProps {
  id: string;
  title: string;
  year: string;
  images: string[];
  bullets: string[];
  brag: string;
  technologies: string[];
}

const Card = styled.div`
  margin: 8rem 0;
  width: 100%;
  font-family: ${theme.typography.fontFamily};

  &:first-child {
    margin-top: 0;
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: 1;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: 500;
  margin: 0;
  grid-column: 1 / -1;
`;

const Year = styled.span`
  font-family: ${theme.typography.monoSpace};
  color: ${theme.colors.accent};
  font-size: 1rem;
  display: block;
  margin-bottom: 1rem;
  grid-column: 1 / -1;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    color: ${theme.colors.text};
    line-height: 1.6;

    &:before {
      content: '→';
      position: absolute;
      left: 0;
      color: ${theme.colors.accent};
    }
  }
`;

const BragSection = styled.div`
  h4 {
    font-family: ${theme.typography.monoSpace};
    color: ${theme.colors.accent};
    font-size: 1rem;
    margin: 0 0 1rem 0;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0;
    color: ${theme.colors.text};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
  grid-column: 1 / -1;
`;

const TechTag = styled.span`
  font-family: ${theme.typography.monoSpace};
  font-size: 0.9rem;
  color: ${theme.colors.lightText};
  padding: 0.5rem 1rem;
  border: 1px solid ${theme.colors.lightText};
  border-radius: 2rem;
`;

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  year,
  images,
  bullets,
  brag,
  technologies
}) => {
  return (
    <Card id={id}>
      <ImageCarousel>
        <CarouselImage
          src={images[0]}
          alt={`${title}`}
        />
      </ImageCarousel>
      
      <Year>{year}</Year>
      <Title>{title}</Title>
      
      <ContentGrid>
        <BulletList>
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </BulletList>
        
        <BragSection>
          <h4>The Brag</h4>
          <p>{brag}</p>
        </BragSection>
        
        <TechStack>
          {technologies.map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechStack>
      </ContentGrid>
    </Card>
  );
};

export default ProjectCard; 