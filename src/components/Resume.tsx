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
    width: 98%;
    padding: 1rem 0;
    max-width: none;
  }
`;

const PDFViewer = styled.iframe`
  width: 100%;
  min-height: 150vh;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100vw;
    aspect-ratio: 8.5 / 11;
    height: 100vh;
  }
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