import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const ResumeContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.grid};
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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