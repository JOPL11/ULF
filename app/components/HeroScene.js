"use client";

import React from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Suspense, useRef, useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';
import SceneLoader from './SceneLoader';
import styles from './HeroScene.module.css';

// Check if running on iOS (for specific behavior in CameraController)
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// iOS Tap Overlay Component
const IOSTapOverlay = ({ onStart }) => {
  const [visible, setVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Only show on iOS devices
    if (isIOS()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.iosOverlay} onClick={() => {
      setVisible(false);
      onStart();
    }}>
      <div className={styles.iosOverlayContent}>
        <h3>Welcome</h3>
        <p>Tap anywhere to start the 3D experience</p>
        <button className={styles.iosButton}>Tap to Begin</button>
      </div>
    </div>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const animationProgress = useRef(0);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useFrame((state, delta) => {
    if (!animationComplete && controlsRef.current) {
      // Animate a 360-degree rotation over 5 seconds
      if (animationProgress.current < 1) {
        animationProgress.current += delta / 5; // 5 seconds for full rotation
        // Ease in-out function for smooth start and end
        const progress = 0.5 - Math.cos(animationProgress.current * Math.PI) / 2;
        // Rotate around the Y axis (horizontal rotation)
        controlsRef.current.setAzimuthalAngle(progress * Math.PI * 2);
      } else if (!animationComplete) {
        // Reset to initial position after animation
        controlsRef.current.setAzimuthalAngle(0);
        setAnimationComplete(true);
      }
    }
    
    // Update controls
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });
  
  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.75}
      screenSpacePanning={false}
      // Touch controls
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      }}
      // Infinite horizontal rotation
      minPolarAngle={Math.PI / 2 - 0.2}
      maxPolarAngle={Math.PI / 2 + 0.2}
      // Smoothing
      enableSmoothTime={true}
      smoothTime={0.1}
      // Initial target
      target={[0, 0, 0]}
    />
  );
};

// Helper component for iOS touch handling
const IOSTouchHandler = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 
        (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))) {
      gl.domElement.style.touchAction = 'auto';
      gl.domElement.style.pointerEvents = 'auto';
    }
    
    return () => {
      if (gl.domElement) {
        gl.domElement.style.touchAction = '';
        gl.domElement.style.pointerEvents = '';
      }
    };
  }, [gl.domElement]);
  
  return null;
};

function Plane({ position, rotation, textureUrl, scale }) {
  const texture = useLoader(TextureLoader, textureUrl, (loader) => {
    loader.setCrossOrigin('anonymous');
  });
  
  // Configure texture settings for better quality
  React.useEffect(() => {
    if (texture) {
      // Use high quality filtering
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 8; // Higher value for better quality at oblique angles
      texture.generateMipmaps = true;
      texture.encoding = THREE.sRGBEncoding;
      texture.premultiplyAlpha = true;
      texture.unpackAlignment = 1; // Ensures proper alignment for non-power-of-2 textures
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  const isPNG = textureUrl.toLowerCase().endsWith('.png');
  const isWaves = textureUrl.includes('waves.png');
  const isFirstPlane = textureUrl.includes('poster2.png');

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 8;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.premultiplyAlpha = true;
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  return (
    <mesh 
      position={position} 
      rotation={rotation} 
      scale={scale}
      renderOrder={isFirstPlane ? 1 : 0}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial 
        map={texture}
        toneMapped={false}
        transparent={isPNG}
        opacity={isFirstPlane ? 0.99 : (isPNG ? 1 : 1)}
        depthTest={!isFirstPlane}
        depthWrite={!isFirstPlane}
        alphaTest={isWaves ? 0.3 : 0.1} // Slightly higher threshold for waves
        wireframe={false}
        polygonOffset={true}
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
    </mesh>
  );
}

function Scene() {
  const styles = require('./HeroScene.module.css');
  return (
    <div className={styles.canvasContainer} style={{ 
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
                scale={[1.75, 1.55, 1]}
                depthTest={true}
                depthWrite={true}
              />
            </Suspense>
          {/*  <Suspense fallback={null}>
              <group rotation={[0, 0, -Math.PI/2 ]} position={[0, -0.9, 3]} >
               beach plane 
              <Plane 
                position={[-0.10, -0.77, -2.6]} 
                rotation={[0, Math.PI/2 - Math.PI, 0]} 
                textureUrl="/images/beach.png" 
                scale={[3.05, 0.65, 1]}
                side={THREE.DoubleSide}
                depthTest={true}
                depthWrite={true}
              />
              </group>
            </Suspense> */}
           {/*  <Suspense fallback={null}>
              <group rotation={[0, 0, -Math.PI/2 ]} position={[0, -0.9, 3]} >
              beach plane 
              <Plane 
                position={[-0.10, 0.77, -2.6]} 
                rotation={[0, Math.PI/2 - Math.PI, 0]} 
                textureUrl="/images/beach.png" 
                scale={[3.05, 0.65, 1]}
                side={THREE.DoubleSide}
                depthTest={true}
                depthWrite={true}
              />
             </group>
            </Suspense>*/}
            <Suspense fallback={null}>
              {/* Perpendicular side plane */}
              <Plane 
                position={[1.7, 0.05, 0]}
                rotation={[0, Math.PI/2 + Math.PI, 0]}
                textureUrl="/images/island1.png" 
                scale={[4, 0.5, 1]}
                depthTest={true}
                depthWrite={true}
              />
            </Suspense>
            <Suspense fallback={null}>
              {/* Perpendicular side plane */}
              <Plane 
                position={[1.1, -0.4, 0]}
                rotation={[0, Math.PI/2 + Math.PI, 0]}
                textureUrl="/images/waves.png" 
                scale={[2.9, 0.3, 1]}
                depthTest={true}
                depthWrite={true}  
                    />
            </Suspense>
            {/* Opposite side plane */}
            <Plane 
              position={[-1.8, -0.2, 0]}
              rotation={[0, Math.PI/2, 0]}
              textureUrl="/images/waves.png" 
              scale={[2.5, 0.3, 1]}
              depthTest={true}
              depthWrite={true}
            />
            <Plane 
              position={[-1.1, -0.5, 0]}
              rotation={[0, Math.PI/2, 0]}
              textureUrl="/images/waves.png" 
              scale={[3.25, 0.4, 1]}
              depthTest={true}
              depthWrite={true}
            />
            <Plane 
              position={[-4.1, 0.2, 0]}
              rotation={[0, Math.PI/2, 0]}
              textureUrl="/images/waves.png" 
              scale={[4.25, 0.4, 7]}
              depthTest={true}
              depthWrite={true}
            />
            {/* Plane behind camera */}
            <Plane 
              position={[0, 0.4, 1.9]} // Positioned behind the camera
              rotation={[0, Math.PI, 0]} // Facing the opposite direction
              textureUrl="/images/palms.png"
              scale={[1.8, 1.7, 1]}
              depthTest={true}
              depthWrite={true}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Export the 3D scene as a named component
const ThreeDScene = Scene;

// Main export with iOS tap handling
export default function HeroScene() {
  const [isClient, setIsClient] = useState(false);
  const [iosReady, setIosReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  
  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    // Check if we need to show iOS overlay
    if (isIOS()) {
      setShowOverlay(true);
    } else {
      setIosReady(true);
    }
  }, []);

  const handleStart = () => {
    setIosReady(true);
    setShowOverlay(false);
  };

  // Show loading state during initial render to avoid hydration mismatch
  if (!isClient) {
    return <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff' }} />;
  }

  return (
    <>
      {iosReady && <ThreeDScene />}
      {showOverlay && <IOSTapOverlay onStart={handleStart} />}
    </>
  );
}
