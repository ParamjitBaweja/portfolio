import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';

export interface Photo {
  src: string;
  alt: string;
  category: 'travel' | 'hiking' | 'sunset';
}

const GalleryContainer = styled.div`
  margin: 2rem 0;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? theme.colors.primary : theme.colors.secondary};
  color: ${props => props.active ? 'white' : theme.colors.text};
  cursor: pointer;
  transition: ${theme.transitions.smooth};

  &:hover {
    transform: translateY(-2px);
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const PhotoCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  transition: ${theme.transitions.smooth};

  &:hover {
    transform: scale(1.02);
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

interface PhotoGalleryProps {
  photos: ReadonlyArray<Photo>;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState<'all' | 'travel' | 'hiking' | 'sunset'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = photos.filter(
    photo => filter === 'all' || photo.category === filter
  );

  return (
    <GalleryContainer>
      <FilterButtons>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All
        </FilterButton>
        <FilterButton 
          active={filter === 'travel'} 
          onClick={() => setFilter('travel')}
        >
          Travel
        </FilterButton>
        <FilterButton 
          active={filter === 'hiking'} 
          onClick={() => setFilter('hiking')}
        >
          Hiking
        </FilterButton>
        <FilterButton 
          active={filter === 'sunset'} 
          onClick={() => setFilter('sunset')}
        >
          Sunsets
        </FilterButton>
      </FilterButtons>

      <PhotoGrid>
        {filteredPhotos.map((photo, index) => (
          <PhotoCard key={index} onClick={() => setSelectedPhoto(photo)}>
            <PhotoImage src={photo.src} alt={photo.alt} />
          </PhotoCard>
        ))}
      </PhotoGrid>

      {selectedPhoto && (
        <Modal onClick={() => setSelectedPhoto(null)}>
          <ModalImage src={selectedPhoto.src} alt={selectedPhoto.alt} />
          <CloseButton onClick={() => setSelectedPhoto(null)}>×</CloseButton>
        </Modal>
      )}
    </GalleryContainer>
  );
};

export default PhotoGallery; 