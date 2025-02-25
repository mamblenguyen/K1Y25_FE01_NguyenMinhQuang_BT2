import React, { useEffect, useRef, useState } from "react";

const colorSequence = ["red", "blue", "purple", "pink", "orange"];

const SpiralEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);
  const isCancelledRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const lineLength = 150;
    const lineWidth = 1;
    const totalLines = 500;
    const delay = 10;
    let lines: {
      x: number;
      yStart: number;
      visible: boolean;
      color: string;
    }[] = [];
    const offset = 0.5;

    function getColor(index: number) {
      let baseColor = colorSequence[currentColorIndex];
      let fadeFactor = index / totalLines;
      let [r, g, b] = {
        red: [255, 0, 0],
        blue: [0, 0, 255],
        purple: [128, 0, 128],
        pink: [255, 105, 180],
        orange: [255, 165, 0],
      }[baseColor] || [255, 255, 255];

      r = Math.floor(r + (255 - r) * fadeFactor);
      g = Math.floor(g + (255 - g) * fadeFactor);
      b = Math.floor(b + (255 - b) * fadeFactor);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function initializeLines() {
      lines = [];
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      for (let i = 0; i < totalLines; i++) {
        lines.push({
          x: centerX + (i * lineWidth - totalLines / 2),
          yStart: centerY + (i * offset - lineLength / 2),
          visible: false,
          color: getColor(i),
        });
      }
    }

    function drawLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((line) => {
        if (line.visible) {
          ctx.beginPath();
          ctx.moveTo(line.x, line.yStart);
          ctx.lineTo(line.x, line.yStart + lineLength);
          ctx.strokeStyle = line.color;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      });
    }

    function animateLines(index = 0) {
      if (index < totalLines && !isCancelledRef.current) {
        lines[index].visible = true;
        drawLines();
        setTimeout(() => animateLines(index + 1), delay);
      } else if (!isCancelledRef.current) {
        setTimeout(() => startNewBatch(), 1000);
      }
    }

    function startNewBatch() {
      if (isCancelledRef.current) return; 
      setCurrentColorIndex((prev) => (prev + 1) % colorSequence.length);
    }

    isCancelledRef.current = false;
    initializeLines();
    animateLines();

    return () => {
      isCancelledRef.current = true;
    };
  }, [currentColorIndex]);

  return (
    <div
    >
      <canvas
        ref={canvasRef}
        style={{
          background: "black",
        }}
      />
    </div>
  );
};

export default SpiralEffect;
