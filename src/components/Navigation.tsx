import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { Menu, X } from 'lucide-react';
import { projectsData } from '../data/projects';

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

const NavLinkWithDropdown = styled(NavLink)`
  position: relative;

  &:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: -20px;
  background: ${theme.colors.navBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: ${theme.transitions.smooth};
  min-width: 200px;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: ${theme.colors.text};
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: ${theme.transitions.smooth};
  border-radius: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${theme.colors.accent};
  }
`;

interface NavigationProps {
  activeSection?: string;
  onNavClick?: (sectionId: string) => void;
  links?: string[]; // Optional array of links to show
}

const Navigation: React.FC<NavigationProps> = ({ activeSection: propActiveSection, onNavClick, links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only check scroll position if no active section is provided via props
      if (!propActiveSection) {
        // Get all sections
        const sections = ['home', 'journey', 'resume', 'extracurriculars', 'contact'];
        
        // Check if we're near the bottom of the page first
        const scrollPosition = window.scrollY + window.innerHeight;
        const bottomThreshold = document.documentElement.scrollHeight - 100;
        
        if (scrollPosition >= bottomThreshold) {
          setActiveSection('contact');
          return;
        }

        // Find the current section
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Adjust offset to account for navbar height and some padding
            const offset = window.innerHeight * 0.25;
            
            if (rect.top <= offset && rect.bottom > offset) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propActiveSection]);

  const handleNavLinkClick = (sectionId: string) => {
    if (onNavClick) {
      onNavClick(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Use prop value if provided, otherwise use state
  const currentSection = propActiveSection || activeSection;

  // Define all available sections
  const allSections = [
    { id: 'journey', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'extracurriculars', label: 'Beyond Code' },
    { id: 'contact', label: 'Contact' }
  ];

  // Filter sections based on links prop
  const visibleSections = links 
    ? allSections.filter(section => links.includes(section.id))
    : allSections;

  return (
    <>
      <Nav isScrolled={isScrolled}>
        <NavContent>
          <Logo onClick={() => {
            window.location.href = '/';
          }}>ParamjitBaweja</Logo>
          <NavLinks>
            {visibleSections.map(section => {
              if (section.id === 'projects' && !links) {
                return (
                  <NavLinkWithDropdown
                    key={section.id}
                    href={`#${section.id}`}
                    active={currentSection === section.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(section.id);
                    }}
                  >
                    {section.label}
                    <Dropdown className="dropdown">
                      {projectsData.map(project => (
                        <DropdownItem
                          key={project.id}
                          href={`#${project.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onNavClick) {
                              onNavClick(project.id);
                            } else {
                              // Handle project click in main view
                              // You'll need to pass this handler from App.tsx
                              window.location.hash = project.id;
                            }
                          }}
                        >
                          {project.title}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  </NavLinkWithDropdown>
                );
              }
              return (
                <NavLink
                  key={section.id}
                  href={`#${section.id}`}
                  active={currentSection === section.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(section.id);
                  }}
                >{section.label}</NavLink>
              );
            })}
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
        {visibleSections.map(section => {
          if (section.id === 'projects' && !links) {
            return (
              <React.Fragment key={section.id}>
                <NavLink
                  href={`#${section.id}`}
                  active={currentSection === section.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                >{section.label}</NavLink>
                {projectsData.map(project => (
                  <DropdownItem
                    key={project.id}
                    href={`#${project.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavClick) {
                        onNavClick(project.id);
                      } else {
                        window.location.hash = project.id;
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    style={{ paddingLeft: '2rem' }}
                  >
                    {project.title}
                  </DropdownItem>
                ))}
              </React.Fragment>
            );
          }
          return (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              active={currentSection === section.id}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(section.id);
                setIsMobileMenuOpen(false);
              }}
            >{section.label}</NavLink>
          );
        })}
      </MobileNav>
    </>
  );
};

export default Navigation; 