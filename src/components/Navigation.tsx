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

const NavLink = styled.a`
  color: ${theme.colors.text};
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
    width: 100%;
  }
`;

const MobileMenu = styled.div`
  display: none;
  cursor: pointer;
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
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
`;

const CloseButton = styled(MobileMenu)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1001;
`;

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
            <NavLink href="#journey">Journey</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#resume">Resume</NavLink>
            <NavLink href="#extracurriculars">Beyond Code</NavLink>
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
        <NavLink href="#journey" onClick={() => setIsMobileMenuOpen(false)}>Journey</NavLink>
        <NavLink href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</NavLink>
        <NavLink href="#resume" onClick={() => setIsMobileMenuOpen(false)}>Resume</NavLink>
        <NavLink href="#extracurriculars" onClick={() => setIsMobileMenuOpen(false)}>Beyond Code</NavLink>
      </MobileNav>
    </>
  );
};

export default Navigation; 