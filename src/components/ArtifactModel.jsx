import React from 'react';
import { useFBX, Clone, Center } from '@react-three/drei';

export default function ArtifactModel({ modelPath, scale = 0.01, onInteract }) {
  // Menggunakan useFBX untuk memuat format .fbx
  const fbx = useFBX(modelPath);

  return (
    <Center>
      <Clone 
        object={fbx} 
        deep 
        scale={scale} // Menyesuaikan skala FBX yang biasanya sangat besar
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

// Preload seluruh 10 file FBX karakter Ramayana
useFBX.preload('/models/ANGGADA low.fbx');
useFBX.preload('/models/dewi sita low.fbx');
useFBX.preload('/models/hanoman low.fbx');
useFBX.preload('/models/jatayu low.fbx');
useFBX.preload('/models/kumbakarna low.fbx');
useFBX.preload('/models/patih prahasta low.fbx');
useFBX.preload('/models/rahwana low.fbx');
useFBX.preload('/models/rama low.fbx');
useFBX.preload('/models/sempati low.fbx');
useFBX.preload('/models/sugriwa low.fbx');