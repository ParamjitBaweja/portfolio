import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: '',
  iconSize: [12, 20],     // Size of the icon [width, height]
  iconAnchor: [6, 20],    // Point of the icon which corresponds to marker's location [x, y]
  popupAnchor: [0, -20],  // Point from which the popup should open relative to the iconAnchor
});

export type PhotoCategory = 'hiking' | 'travel' | 'sunset';

export interface Photo {
  src: string;
  alt: string;
  category: PhotoCategory;
}

export interface TravelLocation {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

const GalleryContainer = styled.div`
  margin: 2rem 0 6rem 0;
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

const VideoContent = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MapContainer = styled(LeafletMapContainer)`
  width: 80vw;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -40vw;
  margin-right: -40vw;
  margin-bottom: 4rem;
`;

const CustomPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    border-radius: 8px;
    padding: 0;
  }

  .leaflet-popup-content {
    margin: 0;
    padding: 12px;
  }

  .leaflet-popup-tip {
    background: ${theme.colors.background};
  }
`;

const PopupContent = styled.div`
  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: ${theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 14px;
    color: ${theme.colors.lightText};
  }
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

const travelLocations: TravelLocation[] = [
  { name: "Pittsburgh, PA", lat: 40.4406, lng: -79.9959, description: "Graduate School at CMU" },
  { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832, description: "Summer Research at UofT" },
  { name: "Manipal, India", lat: 13.3490, lng: 74.7856, description: "Undergraduate at MIT" },
  { name: "Goa, India", lat: 15.2993, lng: 74.1240, description: "Home" },
  { name: "New York, USA", lat: 40.7128, lng: -74.0060, description: " " },
  { name: "Oklahoma City, OK", lat: 35.4676, lng: -97.5164, description: " " },
  { name: "Dallas, TX", lat: 32.7767, lng: -96.7970, description: " " },
  { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437, description: " " },
  { name: "Newark, NJ", lat: 40.7357, lng: -74.1724, description: " " },
  { name: "Miami, FL", lat: 25.7617, lng: -80.1918, description: " " },
  { name: "Shenandoah National Park, VA", lat: 38.4755, lng: -78.4535, description: " " },
  { name: "Las Vegas, NV", lat: 36.1699, lng: -115.1398, description: " " },
  { name: "Grand Canyon, AZ", lat: 36.0544, lng: -112.1401, description: " " },
  { name: "Zurich, Switzerland", lat: 47.3769, lng: 8.5417, description: " " },
  { name: "Geneva, Switzerland", lat: 46.2044, lng: 6.1432, description: " " },
  { name: "Interlaken, Switzerland", lat: 46.6863, lng: 7.8632, description: " " },
  { name: "Zermatt, Switzerland", lat: 46.0207, lng: 7.7491, description: " " },
  { name: "Pune, India", lat: 18.5204, lng: 73.8567, description: " " },
  { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, description: " " },
  { name: "Vadodara, India", lat: 22.3072, lng: 73.1812, description: " " },
  { name: "Jaipur, India", lat: 26.9124, lng: 75.7873, description: " " },
  { name: "Sikkar, India", lat: 27.6094, lng: 75.1398, description: " " },
  { name: "Guwahati, Assam", lat: 26.1445, lng: 91.7362, description: " " },
  { name: "Dehradun, Uttarakhand", lat: 30.3165, lng: 78.0322, description: " " },
  { name: "Delhi, India", lat: 28.6139, lng: 77.2090, description: " " },
  { name: "Mashobra, India", lat: 31.1292, lng: 77.2183, description: " " },
  { name: "Shillong, Meghalaya", lat: 25.5788, lng: 91.8933, description: " " },
  { name: "Munnar, India", lat: 10.0889, lng: 77.0595, description: " " },
  { name: "Coorg, India", lat: 12.4244, lng: 75.7382, description: " " },
  { name: "Ooty, India", lat: 11.4102, lng: 76.6950, description: " " },
  { name: "Kodaikanal, India", lat: 10.2381, lng: 77.4892, description: " " },
  { name: "Chandigarh, India", lat: 30.7333, lng: 76.7794, description: " " },
  { name: "Amritsar, India", lat: 31.6340, lng: 74.8723, description: " " },
  { name: "Bangalore, India", lat: 12.9716, lng: 77.5946, description: " " },
  { name: "Nasik, India", lat: 20.0059, lng: 73.7897, description: " " },
  { name: "Jim Corbett National Park, India", lat: 29.5300, lng: 78.7747, description: " " }, 
  { name: "Gir National Park, India", lat: 21.1390, lng: 70.8242, description: " " },
  { name: "Nanded, India", lat: 19.1383, lng: 77.3210, description: " " }

];

interface PhotoGalleryProps {
  photos: readonly Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState<'travel' | 'hiking' | 'sunset'>('travel');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = photos.filter(photo => photo.category === filter);

  return (
    <GalleryContainer>
      <FilterButtons>
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

      {filter === 'travel' ? (
        <MapContainer 
          center={[30, 10]}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: '70vh' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {travelLocations.map((location, index) => (
            <Marker 
              key={index} 
              position={[location.lat, location.lng]}
            >
              <CustomPopup>
                <PopupContent>
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                </PopupContent>
              </CustomPopup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <PhotoGrid>
          {filteredPhotos.map((photo, index) => (
            <PhotoCard key={index} onClick={() => setSelectedPhoto(photo)}>
              {photo.src.endsWith('.mp4') ? (
                <VideoContent
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => console.error("Video loading error:", e)}
                  controls
                >
                  <source 
                    src={photo.src} 
                    type="video/mp4"
                  />
                  <source 
                    src={photo.src} 
                    type="video/quicktime"
                  />
                  <source 
                    src={photo.src} 
                    type="video/mov"
                  />
                  Your browser does not support the video tag.
                </VideoContent>
              ) : (
                <PhotoImage src={photo.src} alt={photo.alt} />
              )}
            </PhotoCard>
          ))}
        </PhotoGrid>
      )}

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