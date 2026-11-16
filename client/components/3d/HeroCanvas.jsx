'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroIsland from './HeroIsland';

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-ink border-t-electric rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.4} />
        <directionalLight
          position={[6, 8, 6]}
          intensity={2.2}
          color="#ffffff"
        />
        <pointLight position={[-6, 3, 4]} intensity={2.0} color="#0088FF" />
        <pointLight position={[6, -3, 4]} intensity={1.8} color="#C6F906" />
        <pointLight position={[0, 4, -4]} intensity={1.2} color="#ffffff" />

        <Suspense fallback={null}>
          <HeroIsland />
        </Suspense>
      </Canvas>
    </div>
  );
}
