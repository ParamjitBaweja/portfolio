import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { Menu, X } from 'lucide-react';

const Nav = styled.nav<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.isScrolled ? theme.colors.navBackground : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(8px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  z-index: 100;
  transition: ${theme.transitions.smooth};
  font-family: ${theme.typography.fontFamily};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem ${theme.spacing.grid};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: ${theme.typography.monoSpace};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${props => props.active ? theme.colors.accent : theme.colors.text};
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;
  font-family: ${theme.typography.monoSpace};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${theme.colors.accent};
    transition: ${theme.transitions.smooth};
  }

  &:hover:after {
    width: ${props => props.active ? '0' : '100%'};
  }
`;

const MobileMenu = styled.div`
  display: none;
  cursor: pointer;
  color: ${theme.colors.text};
  padding: 0.5rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
  }
`;

const MobileNav = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: ${theme.transitions.smooth};
  z-index: 1000;
  padding: 2rem;

  ${NavLink} {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1001;
  display: flex;
  cursor: pointer;
  color: ${theme.colors.text};
  padding: 0.5rem;
`;

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Get all sections
      const sections = ['home', 'journey', 'projects', 'resume', 'extracurriculars', 'contact'];
      
      // Check if we're near the bottom of the page first
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomThreshold = document.documentElement.scrollHeight - 50;
      
      if (scrollPosition >= bottomThreshold) {
        setActiveSection('contact');
        return;
      }

      // Find the current section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 200;
          
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav isScrolled={isScrolled}>
        <NavContent>
          <Logo onClick={() => {
            window.location.href = '/';
          }}>ParamjitBaweja</Logo>
          <NavLinks>
            <NavLink href="#journey" active={activeSection === 'journey'}>Journey</NavLink>
            <NavLink href="#projects" active={activeSection === 'projects'}>Projects</NavLink>
            <NavLink href="#resume" active={activeSection === 'resume'}>Resume</NavLink>
            <NavLink href="#extracurriculars" active={activeSection === 'extracurriculars'}>Beyond Code</NavLink>
            <NavLink href="#contact" active={activeSection === 'contact'}>Contact</NavLink>
          </NavLinks>
          <MobileMenu onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </MobileMenu>
        </NavContent>
      </Nav>

      <MobileNav isOpen={isMobileMenuOpen}>
        <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
          <X size={24} />
        </CloseButton>
        <NavLink href="#journey" active={activeSection === 'journey'} onClick={() => setIsMobileMenuOpen(false)}>Journey</NavLink>
        <NavLink href="#projects" active={activeSection === 'projects'} onClick={() => setIsMobileMenuOpen(false)}>Projects</NavLink>
        <NavLink href="#resume" active={activeSection === 'resume'} onClick={() => setIsMobileMenuOpen(false)}>Resume</NavLink>
        <NavLink href="#extracurriculars" active={activeSection === 'extracurriculars'} onClick={() => setIsMobileMenuOpen(false)}>Beyond Code</NavLink>
        <NavLink href="#contact" active={activeSection === 'contact'} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
      </MobileNav>
    </>
  );
};

export default Navigation; 