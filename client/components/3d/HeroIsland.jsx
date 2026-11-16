'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center, Html } from '@react-three/drei';
import * as THREE from 'three';

// 10 Technologies in sequence as requested
export const TECH_LIST = [
  {
    id: 'html5',
    name: 'HTML5',
    color: '#E34F26',
    pos: { x: -3.2, y: 1.6, z: 0.2 },
    mobilePos: { x: -1.8, y: 1.5, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 512 512">
        <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512" />
        <path fill="#EF652A" d="M256,472 L407,430 440,60 256,60" />
        <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 128,264 256,264 z M256,355 L255,355 192,338 188,293 132,293 139,382 255,414 256,414 z" />
        <path fill="#FFFFFF" d="M255,208 L255,264 325,264 318,338 255,355 255,414 371,382 372,372 385,221 387,208 z M255,94 L255,150 397,150 402,94 z" />
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS3',
    color: '#1572B6',
    pos: { x: 0, y: 1.9, z: 0.2 },
    mobilePos: { x: 0, y: 1.8, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 512 512">
        <path fill="#1572B6" d="M71,460 L30,0 481,0 440,460 255,512" />
        <path fill="#33A9DC" d="M256,472 L407,430 440,60 256,60" />
        <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 128,264 256,264 z M256,355 L255,355 192,338 188,293 132,293 139,382 255,414 256,414 z" />
        <path fill="#FFFFFF" d="M255,208 L255,264 325,264 318,338 255,355 255,414 371,382 372,372 385,221 387,208 z M255,94 L255,150 397,150 402,94 z" />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    color: '#F7DF1E',
    pos: { x: 3.2, y: 1.6, z: 0.2 },
    mobilePos: { x: 1.8, y: 1.5, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 630 630">
        <rect width="630" height="630" fill="#F7DF1E" />
        <path d="M363.8 535.5c11.3 6.9 23.9 11.8 38.6 11.8 20.4 0 33-10.4 33-25.5 0-18.1-14.7-24.5-39.2-35.1-34.9-15-57.8-34-57.8-70.5 0-35.4 27.2-62.1 69.8-62.1 26.1 0 45 7.8 58.7 16.4l-16.1 26.1c-10.2-6.6-24.8-12.7-42.6-12.7-18.4 0-29.6 9.3-29.6 22.3 0 16.7 12.1 23 37.2 33.7 38.6 16.7 59.8 34.6 59.8 72.8 0 38.9-30.2 65.6-76.3 65.6-30.8 0-54.6-9.6-67.9-19.1zM232.5 540.8c12.1 6.9 27.8 11.2 43.8 11.2 41.2 0 67.2-20.1 67.2-68.4V357.7h-40.4v123.6c0 28.1-13.8 38.6-36.9 38.6-12.7 0-23.6-3.8-29.9-7.8z" />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    color: '#3178C6',
    pos: { x: 4.4, y: 0.3, z: 0.2 },
    mobilePos: { x: 2.1, y: 0.5, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 512 512">
        <path fill="#3178C6" d="M0 0h512v512H0z" />
        <path fill="#FFFFFF" d="M197.6 236.4v165.7h-44.5V236.4H87.3v-38.3h176v38.3zm84.7 131.5c11.3 6.9 23.9 11.8 38.6 11.8 20.4 0 33-10.4 33-25.5 0-18.1-14.7-24.5-39.2-35.1-34.9-15-57.8-34-57.8-70.5 0-35.4 27.2-62.1 69.8-62.1 26.1 0 45 7.8 58.7 16.4l-16.1 26.1c-10.2-6.6-24.8-12.7-42.6-12.7-18.4 0-29.6 9.3-29.6 22.3 0 16.7 12.1 23 37.2 33.7 38.6 16.7 59.8 34.6 59.8 72.8 0 38.9-30.2 65.6-76.3 65.6-30.8 0-54.6-9.6-67.9-19.1z" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React.js',
    color: '#00D8FF',
    pos: { x: 3.5, y: -1.3, z: 0.2 },
    mobilePos: { x: 1.8, y: -0.7, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="-11.5 -10.23174 23 20.46348" fill="#00D8FF">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    color: '#111111',
    pos: { x: 1.3, y: -1.75, z: 0.2 },
    mobilePos: { x: 0.8, y: -1.4, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.438L69.147 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="#FFFFFF" />
        <path d="M115.898 54H128.012V125.97H115.898V54Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    color: '#339933',
    pos: { x: -1.3, y: -1.75, z: 0.2 },
    mobilePos: { x: -0.8, y: -1.4, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#339933">
        <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.31L4.5 8.65v6.7L12 19.69l7.5-4.34v-6.7L12 4.31z" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express.js',
    color: '#111111',
    pos: { x: -3.5, y: -1.3, z: 0.2 },
    mobilePos: { x: -1.8, y: -0.7, z: 0.2 },
    logo: (
      <span className="font-mono font-black text-[10px] text-ink border border-ink px-1 rounded bg-slate-100">
        ex
      </span>
    ),
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    color: '#47A248',
    pos: { x: -4.4, y: 0.3, z: 0.2 },
    mobilePos: { x: -2.1, y: 0.5, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 0C12 0 7.5 7.5 7.5 12C7.5 16.5 10.5 21 12 24C13.5 21 16.5 16.5 16.5 12C16.5 7.5 12 0 12 0Z" />
      </svg>
    ),
  },
  {
    id: 'docker',
    name: 'Docker',
    color: '#2496ED',
    pos: { x: -4.0, y: 1.1, z: 0.2 },
    mobilePos: { x: -1.9, y: 1.1, z: 0.2 },
    logo: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185M23.79 10.99c-.438-.59-1.282-.77-2.074-.537-.16-.628-.62-1.144-1.25-1.424-.465-.207-1.04-.265-1.636-.168a6.386 6.386 0 00-4.004-2.846c-.328-.08-.667-.12-1.01-.12-1.22 0-2.383.51-3.186 1.396a5.534 5.534 0 00-1.89-1.478 6.068 6.068 0 00-2.607-.585c-.94 0-1.84.24-2.617.69a6.223 6.223 0 00-2.483 2.766c-.198.472-.32.977-.358 1.498H.186A.186.186 0 000 10.871v1.888c0 3.018 2.052 5.578 4.935 6.236 1.25.285 2.58.267 3.864-.055 3.048-.763 5.485-3.056 6.467-6.082 1.488.225 2.976-.11 4.148-.94.22-.154.42-.328.604-.516.326.33.722.583 1.163.738.74.26 1.547.195 2.155-.176.608-.372.96-1.002.96-1.724 0-.46-.17-.9-.49-1.25" />
      </svg>
    ),
  },
];

// Interactive Draggable Badge Component (Allows user to control & move tags anywhere!)
function DraggableBadge({ tech, isVisible, targetPos }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    startPoint.current = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    e.stopPropagation();
    setDragOffset({
      x: e.clientX - startPoint.current.x,
      y: e.clientY - startPoint.current.y,
    });
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  return (
    <group position={[targetPos.x, targetPos.y, targetPos.z]}>
      <Html
        center
        distanceFactor={6}
        style={{
          transition: isDragging.current
            ? 'none'
            : 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isVisible
            ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(1)`
            : `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(0)`,
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="px-3 py-1.5 bg-white border-2 border-ink rounded-full shadow-[3px_3px_0px_#111111] flex items-center gap-2 select-none hover:bg-electric transition-colors duration-150 cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95"
          title={`${tech.name} (Drag me anywhere!)`}
        >
          {tech.logo}
          <span className="text-[11px] font-black uppercase text-ink tracking-wide whitespace-nowrap">
            {tech.name}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: tech.color }}
          />
          <span className="text-[9px] text-ink/40 font-mono font-bold">⠿</span>
        </div>
      </Html>
    </group>
  );
}

export default function HeroIsland() {
  // Load the newly provided space.glb model
  const { scene } = useGLTF('/space.glb');

  // Clone and optimize materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.DoubleSide;
          child.material.roughness = 0.55;
          child.material.metalness = 0.35;
          child.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Responsive device check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Orbital parameters
  // Slow orbital speed: 10 seconds per revolution (8-12 seconds requirement)
  const ORBIT_PERIOD = 10.0;
  const angularSpeed = (Math.PI * 2) / ORBIT_PERIOD;

  // Orbital Radii for Desktop vs Mobile
  const rx = isMobile ? 2.6 : 4.4; // horizontal reach around name
  const ry = isMobile ? 1.3 : 1.6; // vertical reach around name
  const rz = isMobile ? 1.4 : 2.2; // 3D depth reach (front/back)

  // 3D Orbital plane inclination (subtle 3D perspective)
  const tiltX = -0.22; // ~-12.6 degrees
  const tiltZ = 0.18;  // ~10.3 degrees

  // Angle tracker and completed orbit count
  const angleRef = useRef(0);
  const [completedOrbits, setCompletedOrbits] = useState(0);

  // References
  const satelliteGroupRef = useRef();

  // Generate 3D Elliptical Orbit Curve for visual path
  const orbitPoints = useMemo(() => {
    const pts = [];
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      const x0 = rx * Math.cos(u);
      const y0 = ry * Math.sin(u);
      const z0 = rz * Math.sin(u);

      // Rotate around Z then X
      const x = x0 * Math.cos(tiltZ) - y0 * Math.sin(tiltZ);
      const y = (x0 * Math.sin(tiltZ) + y0 * Math.cos(tiltZ)) * Math.cos(tiltX) - z0 * Math.sin(tiltX);
      const z = (x0 * Math.sin(tiltZ) + y0 * Math.cos(tiltZ)) * Math.sin(tiltX) + z0 * Math.cos(tiltX);

      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [rx, ry, rz, tiltX, tiltZ]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(orbitPoints);
  }, [orbitPoints]);

  // Frame-by-frame continuous orbital movement
  useFrame((state, delta) => {
    if (!satelliteGroupRef.current) return;

    // Advance angle independent of frame rate
    const prevAngle = angleRef.current;
    let nextAngle = prevAngle + delta * angularSpeed;

    // Check if one full revolution (360 degrees = 2π) has completed
    if (nextAngle >= Math.PI * 2) {
      nextAngle -= Math.PI * 2;
      setCompletedOrbits((prev) => {
        const nextCount = prev + 1;
        // After 10 orbits, reset counter to 0 smoothly
        if (nextCount > 10) {
          return 1; // start cycle fresh with 1st badge
        }
        return nextCount;
      });
    }

    angleRef.current = nextAngle;
    const u = nextAngle;

    // Compute current 3D position on tilted ellipse
    const x0 = rx * Math.cos(u);
    const y0 = ry * Math.sin(u);
    const z0 = rz * Math.sin(u);

    const x = x0 * Math.cos(tiltZ) - y0 * Math.sin(tiltZ);
    const y = (x0 * Math.sin(tiltZ) + y0 * Math.cos(tiltZ)) * Math.cos(tiltX) - z0 * Math.sin(tiltX);
    const z = (x0 * Math.sin(tiltZ) + y0 * Math.cos(tiltZ)) * Math.sin(tiltX) + z0 * Math.cos(tiltX);

    satelliteGroupRef.current.position.set(x, y, z);

    // Compute tangent vector for consistent satellite flight orientation
    const uNext = u + 0.05;
    const x0Next = rx * Math.cos(uNext);
    const y0Next = ry * Math.sin(uNext);
    const z0Next = rz * Math.sin(uNext);

    const xNext = x0Next * Math.cos(tiltZ) - y0Next * Math.sin(tiltZ);
    const yNext = (x0Next * Math.sin(tiltZ) + y0Next * Math.cos(tiltZ)) * Math.cos(tiltX) - z0Next * Math.sin(tiltX);
    const zNext = (x0Next * Math.sin(tiltZ) + y0Next * Math.cos(tiltZ)) * Math.sin(tiltX) + z0Next * Math.cos(tiltX);

    // Orient satellite forward along flight trajectory
    satelliteGroupRef.current.lookAt(xNext, yNext, zNext);
  });

  return (
    <group position={[0, 0, 0]}>
      
      {/* 1. Subtle 3D Elliptical Orbit Track Path Ring */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0088FF"
          transparent
          opacity={0.22}
          linewidth={1}
        />
      </line>

      {/* Secondary Orbit Accent Ring (Electric Lime dashed aura) */}
      <mesh rotation={[tiltX, 0, tiltZ]}>
        <ringGeometry args={[rx * 0.99, rx * 1.01, 64]} />
        <meshBasicMaterial
          color="#C6F906"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Traveling 3D Satellite Probe */}
      <group ref={satelliteGroupRef}>
        <Center>
          {/* Scaled satellite probe model (approx 0.65 units wide, proportionate to text) */}
          <primitive
            object={clonedScene}
            scale={isMobile ? 0.012 : 0.016}
          />
        </Center>

        {/* Small Thruster / Beacon Light */}
        <pointLight
          position={[0, 0, 0.2]}
          intensity={1.8}
          color="#00f0ff"
          distance={2.5}
        />

        {/* Thruster Glow Particle */}
        <mesh position={[0, 0, -0.2]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* 3. Emerging Draggable Technology Badges around the name */}
      {TECH_LIST.map((tech, idx) => {
        // A badge is visible if completedOrbits is >= (idx + 1)
        const isVisible = completedOrbits >= idx + 1;
        const targetPos = isMobile ? tech.mobilePos : tech.pos;

        return (
          <DraggableBadge
            key={tech.id}
            tech={tech}
            isVisible={isVisible}
            targetPos={targetPos}
          />
        );
      })}

      {/* Live Orbit Telemetry Pill HUD in 3D Space (Clean, non-blinking status dot) */}
      <group position={[0, -2.2, 0]}>
        <Html center distanceFactor={7}>
          <div className="px-3.5 py-1 bg-ink text-white border-2 border-white/80 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 shadow-[2px_2px_0px_#C6F906] select-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-electric border border-white" />
            <span>
              SATELLITE ORBIT: {completedOrbits}/10 COMPLETED
            </span>
            <span className="text-electric">// {Math.round((completedOrbits / 10) * 100)}%</span>
            <span className="text-[9px] text-white/50 lowercase font-sans">
              (drag badges freely)
            </span>
          </div>
        </Html>
      </group>

    </group>
  );
}

// Preload the new space.glb model for instant loading
useGLTF.preload('/space.glb');
