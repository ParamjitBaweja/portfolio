export const theme = {
  colors: {
    primary: '#000000',    // Pure black for text
    secondary: '#FFFFFF',  // White background
    accent: '#0066FF',    // Bright blue for highlights
    text: '#1A1A1A',      // Soft black for body text
    lightText: '#666666', // Gray for subtitles
    background: '#FFFFFF',
    navBackground: 'rgba(255, 255, 255, 0.98)',
  },
  typography: {
    fontFamily: "'Space Grotesk', -apple-system, sans-serif",
    monoSpace: "'Space Mono', monospace",
  },
  transitions: {
    smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  spacing: {
    section: '120px',
    grid: '20px',
  },
  breakpoints: {
    mobile: '768px',
  }
};

export default theme; 