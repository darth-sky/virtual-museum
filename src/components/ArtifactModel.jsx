import React from 'react';
import { useGLTF, Clone, Center } from '@react-three/drei';

export default function ArtifactModel({ modelPath, onInteract }) {
  const { scene } = useGLTF(modelPath);

  return (
    // Komponen Center membungkus model dan secara paksa menaruh titik poros (pivot) 
    // tepat di tengah-tengah dimensi fisik si topeng
    <Center>
      <Clone 
        object={scene} 
        deep 
        onClick={(e) => {
          e.stopPropagation();
          onInteract();
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      />
    </Center>
  );
}