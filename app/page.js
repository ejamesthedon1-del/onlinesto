'use client'

import styled from 'styled-components'
import Image from 'next/image'

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Section = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
`

const MediaContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.surface};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    min-height: 60vh;
  }
`

const MediaPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.lg};
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const PlaceholderText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.base};
  z-index: 1;
`

export default function HomePage() {
  // Placeholder data for sections - can be replaced with actual media URLs
  const sections = [
    {
      id: 1,
      type: 'image', // 'image' or 'video'
      src: null, // Add image/video URL here when available
      placeholder: 'Section 1 - Image/Video Placeholder'
    },
    {
      id: 2,
      type: 'image',
      src: null,
      placeholder: 'Section 2 - Image/Video Placeholder'
    },
    {
      id: 3,
      type: 'image',
      src: null,
      placeholder: 'Section 3 - Image/Video Placeholder'
    }
  ]

  return (
    <HomeContainer>
      {sections.map((section) => (
        <Section key={section.id}>
          <MediaContainer>
            <MediaPlaceholder>
              {section.src ? (
                section.type === 'video' ? (
                  <video 
                    src={section.src} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Image
                    src={section.src}
                    alt={`Section ${section.id}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="100vw"
                    priority={section.id === 1}
                  />
                )
              ) : (
                <PlaceholderText>{section.placeholder}</PlaceholderText>
              )}
            </MediaPlaceholder>
          </MediaContainer>
        </Section>
      ))}
    </HomeContainer>
  )
}
