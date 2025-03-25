import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Float, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Ball = ({ imgUrl, position, delay, onClick, isSelected }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();
  const scale = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      scale.current += ((isSelected ? 3.0 : 2.5) - scale.current) * 0.1;
      meshRef.current.scale.set(scale.current, scale.current, scale.current);
      meshRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.current = 0.01;
    }, delay * 200); // Animasi lebih cepat
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={1.5}
      position={position}
    >
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={isSelected ? "#ffdfba" : "#fff8eb"}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          scale={1.1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallsScene = ({ icons, onBallClick, selectedIndex }) => {
  const positions = React.useMemo(() => {
    const cols = Math.min(Math.ceil(Math.sqrt(icons.length)), 5); // Maks 5 kolom
    const spacing = 2.5; // Jarak lebih rapat (sebelumnya 3.5-4.0)

    return icons.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return [
        (col - cols / 2 + 0.5) * spacing,
        0,
        (row - Math.floor(icons.length / cols) / 2) * spacing,
      ];
    });
  }, [icons.length]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[1, 2, 3]} intensity={0.8} />
      {icons.map((icon, i) => (
        <Ball
          key={i}
          imgUrl={icon}
          position={positions[i]}
          delay={i}
          onClick={() => onBallClick(i)}
          isSelected={selectedIndex === i}
        />
      ))}
    </>
  );
};

export const BallCanvas = ({ icons }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Canvas frameloop="demand" camera={{ position: [0, 5, 10], fov: 45 }}>
      <Suspense fallback={null}>
        <OrbitControls enableZoom={true} minDistance={5} maxDistance={20} />
        <BallsScene
          icons={icons}
          onBallClick={(i) => setSelectedIndex(i === selectedIndex ? -1 : i)}
          selectedIndex={selectedIndex}
        />
      </Suspense>
    </Canvas>
  );
};

export default BallCanvas;
