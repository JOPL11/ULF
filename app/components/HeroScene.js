"use client";

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Suspense, useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CameraController = () => {
  const { camera, gl } = useThree();
  const controls = useRef();
  
  useEffect(() => {
    const orbitControls = new OrbitControls(camera, gl.domElement);
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.5; // Even more friction for slower movement
    orbitControls.rotateSpeed = 0.15; // Much slower rotation speed
    orbitControls.screenSpacePanning = false;
    // Using numeric values directly to avoid THREE.MOUSE dependency
    // 0: LEFT, 1: MIDDLE, 2: RIGHT
    orbitControls.mouseButtons = {
      LEFT: 0,    // ROTATE
      MIDDLE: 1,  // DOLLY
      RIGHT: 2    // PAN
    };
    orbitControls.touchAction = 'none'; // Prevent touch scroll
    // Remove azimuth constraints for infinite horizontal rotation
    orbitControls.minPolarAngle = Math.PI / 2 - 0.2; // Keep slight vertical movement constraint
    orbitControls.maxPolarAngle = Math.PI / 2 + 0.2;
    // Removed min/maxAzimuthAngle for infinite horizontal rotation
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05; // Increased damping for smoother infinite rotation
    orbitControls.rotateSpeed = 0.8; // Slightly faster rotation for better feel
    orbitControls.enableSmoothTime = true; // Enable smooth interpolation
    orbitControls.smoothTime = 0.1; // Time to smooth to target
    orbitControls.enableKeys = false; // Disable keyboard controls for smoother experience
    
    controls.current = orbitControls;
    
    // Auto-rotate
    orbitControls.autoRotate = false;
    orbitControls.autoRotateSpeed = 1;
    
    return () => {
      orbitControls.dispose();
    };
  }, [camera, gl]);
  
  useFrame(() => {
    if (controls.current) {
      controls.current.update();
    }
  });
  
  return null;
};

function Plane({ position, rotation, textureUrl, scale }) {
  const texture = useLoader(TextureLoader, textureUrl);
  
  // Check if the texture is a PNG (assuming from file extension)
  const isPNG = textureUrl.toLowerCase().endsWith('.png');
  
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        toneMapped={false}
        transparent={isPNG}
        opacity={isPNG ? 1 : 1}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <div style={{ 
      width: '100vw',
      height: '100%',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff'
    }}>
      <Canvas
        gl={{ antialias: true }}
        style={{ 
          width: '100%',
          height: '100%',
          background: '#ffffff',
          touchAction: 'none'
        }}
        camera={{ position: [0, 0, 1.2], fov: 70 }} // Moved even closer and increased FOV more
      >
        <CameraController />
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            {/* Back plane */}
            <Plane 
              position={[0, 0, -0.5]} 
              rotation={[0, 0, 0]} 
              textureUrl="/images/poster2.png" 
              scale={[1.45, 1.5, 1]}
            />
            {/* Front plane */}
            <Plane 
              position={[-0.15, 0.05, -1.5]} 
              rotation={[0, 0, 0]} 
              textureUrl="/images/palms.png" 
              scale={[1.25, 1.3, 1]}
            />
            {/* Perpendicular side plane */}
            <Plane 
              position={[1.5, 0.05, 0]}
              rotation={[0, Math.PI/2 + Math.PI, 0]}
              textureUrl="/images/poster2.png" 
              scale={[1.25, 1.3, 1]}
            />
            {/* Opposite side plane */}
            <Plane 
              position={[-1.5, 0.05, 0]}
              rotation={[0, Math.PI/2, 0]}
              textureUrl="/images/palms.png" 
              scale={[1.25, 1.3, 1]}
            />
            {/* Plane behind camera */}
            <Plane 
              position={[0, 0, 1.5]} // Positioned behind the camera
              rotation={[0, Math.PI, 0]} // Facing the opposite direction
              textureUrl="/images/poster3.jpg"
              scale={[2.45, 1.5, 1]}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
