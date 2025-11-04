import React from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D, OrbitControls } from "@react-three/drei";

function Word({ word, weight, index }) {
  const angle = index * 0.5;
  const radius = 5 + weight * 5;
  const x = Math.cos(angle) * radius;
  const y = (Math.random() - 0.5) * 8;
  const z = Math.sin(angle) * radius;
  const size = 0.5 + weight * 3;

  return (
    <Text3D
      position={[x, y, z]}
      size={size}
      font="/fonts/helvetiker_regular.typeface.json"
    >
      {word}
      <meshStandardMaterial color={`hsl(${Math.random() * 360}, 80%, 60%)`} />
    </Text3D>
  );
}

export default function WordCloud3D({ words }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {words.map((w, i) => (
        <Word key={i} word={w.word} weight={w.weight} index={i} />
      ))}
    </Canvas>
  );
}
