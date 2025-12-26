import { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  height: 100%;
  width: 100%;
`

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1080px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${props => props.theme.spacing.sm};
`

const Thumbnail = styled.button`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Square aspect ratio */
  background-color: ${props => props.theme.colors.surface};
  border: 2px solid ${props => 
    props.active ? props.theme.colors.primary : props.theme.colors.border
  };
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;
  transition: border-color ${props => props.theme.transitions.fast} ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`

const ThumbnailImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <GalleryContainer>
        <MainImageContainer>
          <MainImageWrapper>
            <Image
              src="/images/products/placeholder.jpg"
              alt="Product placeholder"
              width={1080}
              height={1080}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              unoptimized
            />
          </MainImageWrapper>
        </MainImageContainer>
      </GalleryContainer>
    )
  }

  const mainImage = images[selectedIndex] || images[0]

  return (
    <GalleryContainer>
      <MainImageContainer>
        <MainImageWrapper>
          <Image
            src={mainImage}
            alt={`Product image ${selectedIndex + 1}`}
            width={1080}
            height={1080}
            style={{ objectFit: 'contain', width: '100%', height: 'auto', maxWidth: '1080px' }}
            sizes="(max-width: 768px) 100vw, 1080px"
            priority
            unoptimized
          />
        </MainImageWrapper>
      </MainImageContainer>
      {images.length > 1 && (
        <ThumbnailContainer>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              active={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <ThumbnailImageWrapper>
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
                />
              </ThumbnailImageWrapper>
            </Thumbnail>
          ))}
        </ThumbnailContainer>
      )}
    </GalleryContainer>
  )
}

