import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const ResumeContainer = styled.div`
  width: 90%;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 95%;
    padding: 1rem 0;
  }
`;

const PDFViewer = styled.iframe`
  width: 100%;
  min-height: 150vh; // Minimum height of viewport
  height: 100%; // Fill available space
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
`;

const Resume: React.FC = () => {
  return (
    <ResumeContainer>
      <PDFViewer
        src="/assets/documents/CV-ParamjitSingh.pdf"
        title="Resume"
      />
    </ResumeContainer>
  );
};

export default Resume; 