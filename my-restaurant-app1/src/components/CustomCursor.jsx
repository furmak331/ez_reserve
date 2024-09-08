import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

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
  width: 8px;
  height: 8px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transition: transform 0.15s ease;
`;

function CustomCursor() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);

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
      dot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
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