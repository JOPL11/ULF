"use client";

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Suspense, useRef, useEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dynamic from 'next/dynamic';
import SceneLoader from './SceneLoader';

// Check if running on iOS (for specific behavior in CameraController)
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

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
    
    // Check for iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Disable all controls on iOS
    if (isIOS) {
      orbitControls.enableRotate = false;
      orbitControls.enablePan = false;
      orbitControls.enableZoom = false;
      
      // Make the canvas non-interactive on iOS
      gl.domElement.style.touchAction = 'auto';
      gl.domElement.style.pointerEvents = 'none';
      
      // Add a wrapper to handle touch events on iOS
      const wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.zIndex = '1';
      gl.domElement.parentNode.insertBefore(wrapper, gl.domElement);
      
      // Prevent default touch behavior on the wrapper
      wrapper.addEventListener('touchmove', (e) => {
        e.stopPropagation();
      }, { passive: false });
      
      // Clean up
      return () => {
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
        orbitControls.dispose();
      };
    } else {
      // Enable controls for non-iOS devices
      orbitControls.mouseButtons = {
        LEFT: 0,    // ROTATE
        MIDDLE: 1,  // DOLLY
        RIGHT: 2    // PAN
      };
      orbitControls.touchAction = 'pan-y';
    }
    
    // Remove azimuth constraints for infinite horizontal rotation
    orbitControls.minPolarAngle = Math.PI / 2 - 0.2; // Keep slight vertical movement constraint
    orbitControls.maxPolarAngle = Math.PI / 2 + 0.2;
    // Removed min/maxAzimuthAngle for infinite horizontal rotation
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
      top: '0',  // Adjust this value to move the container up or down
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
        <Suspense fallback={<SceneLoader />}>
          <group position={[0, 0, 0]}>
            <Suspense fallback={null}>
              {/* Back plane */}
              <Plane 
                position={[0, 0, -0.5]} 
                rotation={[0, 0, 0]} 
                textureUrl="/images/poster2.png" 
                scale={[1.45, 1.5, 1]}
              />
            </Suspense>
            <Suspense fallback={null}>
              {/* Front plane */}
              <Plane 
                position={[-0.15, 0.05, -1.5]} 
                rotation={[0, 0, 0]} 
                textureUrl="/images/palms.png" 
                scale={[1.25, 1.3, 1]}
              />
            </Suspense>
            <Suspense fallback={null}>
              {/* Perpendicular side plane */}
              <Plane 
                position={[1.5, 0.05, 0]}
                rotation={[0, Math.PI/2 + Math.PI, 0]}
                textureUrl="/images/poster2.png" 
                scale={[1.25, 1.3, 1]}
              />
            </Suspense>
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

// Export the 3D scene as a named component
const ThreeDScene = Scene;

// Main export - always show 3D scene
export default function HeroScene() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
  }, []);

  // Show loading state during initial render to avoid hydration mismatch
  if (!isClient) {
    return <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff' }} />;
  }

  return <ThreeDScene />;
}
