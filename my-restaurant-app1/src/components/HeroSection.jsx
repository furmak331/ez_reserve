import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { theme } from '../styles/theme';

const HeroContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${theme.colors.primary};
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.text};
`;

const ExploreButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const ModelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

function Model({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return <primitive object={scene} ref={ref} scale={[0.5, 0.5, 0.5]} />;
}

function HeroSection() {
  return (
    <HeroContainer>
      <ModelContainer>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Suspense fallback={null}>
            <Model url="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/table-set/model.gltf" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </ModelContainer>
      <HeroContent>
        <HeroTitle>Reserve Your Table</HeroTitle>
        <HeroSubtitle>Experience culinary excellence at your fingertips</HeroSubtitle>
        <ExploreButton>Book Now</ExploreButton>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;