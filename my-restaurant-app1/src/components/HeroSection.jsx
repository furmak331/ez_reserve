import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import restaurantHero from '../assets/restaurant-hero.jpg';

const HeroContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${restaurantHero});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${theme.colors.white};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const ExploreButton = styled(motion.button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover:before {
    width: 100%;
  }
`;

const SvgContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

const waveSvg = (
  <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={theme.colors.white} fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
);

function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ripples = [];

    function Ripple(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 1;
      this.maxRadius = 50;
      this.speed = 5;
      this.opacity = 1;

      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      };

      this.update = function() {
        if (this.radius < this.maxRadius) {
          this.radius += this.speed;
          this.opacity -= 0.02;
        }
      };
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < ripples.length; i++) {
        ripples[i].draw();
        ripples[i].update();

        if (ripples[i].opacity <= 0) {
          ripples.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      ripples.push(new Ripple(e.clientX, e.clientY));
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleExplore = () => {
    const featuredSection = document.querySelector('#featured-restaurants');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}} />
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Culinary Delights
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Embark on a gastronomic journey through the finest restaurants in your area
        </HeroSubtitle>
        <ExploreButton
          onClick={handleExplore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore Now
        </ExploreButton>
      </HeroContent>
      <SvgContainer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {waveSvg}
      </SvgContainer>
    </HeroContainer>
  );
}

export default HeroSection;
