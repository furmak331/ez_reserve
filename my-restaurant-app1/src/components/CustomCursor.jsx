import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for glow effect on cursor movement
const neonGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 255, 0, 0.5), 0 0 20px rgba(255, 255, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 0, 1), 0 0 30px rgba(255, 255, 0, 0.8);
  }
`;

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

const CursorCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: yellow;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  transition: transform 0.05s ease, box-shadow 0.2s ease;

  /* Initial Neon Glow */
  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5), 0 0 20px rgba(255, 255, 0, 0.3);

  /* Glow animation while moving */
  &.glow {
    animation: ${neonGlow} 1s infinite ease-in-out;
  }
`;

function CustomCursor() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  let idleTimeout = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dot = dotRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
    const wobbleRadius = 50;
    const wobblePoints = 6;
    const wobbleSpeed = 0.1;
    let angle = 0;

    function drawWobble() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      for (let i = 0; i <= wobblePoints; i++) {
        const pointAngle = (i / wobblePoints) * Math.PI * 2;
        const wobbleOffset = Math.sin(angle + pointAngle * 3) * 5;
        const x = mouseX + Math.cos(pointAngle) * (wobbleRadius + wobbleOffset);
        const y = mouseY + Math.sin(pointAngle) * (wobbleRadius + wobbleOffset);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();

      angle += wobbleSpeed;
      requestAnimationFrame(drawWobble);
    }

    function handleMouseMove(e) {
      const { clientX, clientY } = e;
      mouseX = clientX;
      mouseY = clientY;

      dot.style.transform = `translate(${clientX}px, ${clientY}px)`;

      // Add neon glow effect while moving
      dot.classList.add('glow');

      // Clear idle timeout when the mouse moves
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        // Remove glow effect when idle for 500ms
        dot.classList.remove('glow');
      }, 500); // Adjust idle time to control glow fade
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    drawWobble();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <CursorContainer>
      <CursorCanvas ref={canvasRef} />
      <CursorDot ref={dotRef} />
    </CursorContainer>
  );
}

export default CustomCursor;
