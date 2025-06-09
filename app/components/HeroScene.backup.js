"use client";

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only show on iOS devices
    if (isIOS()) {
      setVisible(true);
      // Create a dummy audio context to unlock Web Audio API
      const unlock = () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        if (context.state === 'suspended') {
          context.resume();
        }
        document.removeEventListener('click', unlock);
        document.removeEventListener('touchstart', unlock);
      };

      document.addEventListener('click', unlock, { once: true });
      document.addEventListener('touchstart', unlock, { once: true });
    }
  }, []);

  const handleStart = () => {
    // Force a small delay to ensure the tap is registered
    setTimeout(() => {
      setVisible(false);
      onStart();
    }, 100);
  };

  if (!visible) return null;

  return (
    <div className={styles.iosOverlay} onClick={handleStart}>
      <div className={styles.iosOverlayContent}>
        <h3>Welcome</h3>
        <p>Tap to enable 3D experience</p>
        <button 
          className={styles.iosButton}
          onClick={(e) => {
            e.stopPropagation();
            handleStart();
          }}
        >
          Tap to Begin
        </button>
      </div>
    </div>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  return (
    <OrbitControls
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
      // iOS specific settings
      enabled={!isIOS}
      // Infinite horizontal rotation
      minPolarAngle={Math.PI / 2 - 0.2}
      maxPolarAngle={Math.PI / 2 + 0.2}
      // Smoothing
      enableSmoothTime={true}
      smoothTime={0.1}
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
  const texture = useLoader(TextureLoader, textureUrl);
  
  // Check if the texture is a PNG (assuming from file extension)
  const isPNG = textureUrl.toLowerCase().endsWith('.png');
  
  // Special handling for the first plane (poster2.png)
  const isFirstPlane = textureUrl.includes('poster2.png');
  
  return (
    <mesh 
      position={position} 
      rotation={rotation} 
      scale={scale}
      renderOrder={isFirstPlane ? 1 : 0} // Ensure first plane renders first
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        toneMapped={false}
        transparent={isPNG}
        opacity={isFirstPlane ? 0.99 : (isPNG ? 1 : 1)}
        depthTest={!isFirstPlane} // Disable depth test for first plane
        depthWrite={!isFirstPlane} // Disable depth write for first plane
        alphaTest={0.1} // Helps with transparency sorting
      />
    </mesh>
  );
}

function Scene() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Canvas
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true
        }}
        style={{ 
          width: '100%',
          height: '100%',
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
        camera={{ position: [0, 0, 1.2], fov: 70 }}
        onCreated={({ gl }) => {
          if (isIOS()) {
            gl.forceContextRestore();
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }
        }}
        onPointerMissed={() => {}}
        eventSource={typeof document !== 'undefined' ? document : undefined}
        eventPrefix="web"
        dpr={[1, 2]}
      >
        <CameraController />
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={<SceneLoader />}>
          <group position={[0, 0, 0]}>
            <Suspense fallback={null}>
              <Plane 
                position={[0, 0, -0.5]} 
                rotation={[0, 0, 0]} 
                textureUrl="/images/poster2.png" 
                scale={[1.45, 1.5, 1]}
              />
            </Suspense>
            <Suspense fallback={null}>
              <Plane 
                position={[-0.15, 0.05, -1.5]} 
                rotation={[0, 0, 0]} 
                textureUrl="/images/palms.png" 
                scale={[1.25, 1.3, 1]}
                depthTest={true}
                depthWrite={true}
              />
            </Suspense>
            <Suspense fallback={null}>
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
              <Plane 
                position={[1.1, -0.4, 0]}
                rotation={[0, Math.PI/2 + Math.PI, 0]}
                textureUrl="/images/waves.png" 
                scale={[4, 0.5, 1]}
                depthTest={true}
                depthWrite={true}
              />
            </Suspense>
            <Plane 
              position={[-1.5, 0.1, 0]}
              rotation={[0, Math.PI/2, 0]}
              textureUrl="/images/palms.png" 
              scale={[1.7, 1.3, 1]}
              depthTest={true}
              depthWrite={true}
            />
            <Plane 
              position={[-1.1, -0.6, 0]}
              rotation={[0, Math.PI/2, 0]}
              textureUrl="/images/waves.png" 
              scale={[3.25, 0.4, 1]}
              depthTest={true}
              depthWrite={true}
            />
            <Plane 
              position={[0, 0, 1.5]}
              rotation={[0, Math.PI, 0]}
              textureUrl="/images/poster3.jpg"
              scale={[2.45, 1.5, 1]}
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
  const containerRef = useRef(null);
  
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
    // Force a small delay to ensure the tap is registered
    setTimeout(() => {
      setIosReady(true);
      setShowOverlay(false);
      
      // Force a resize event to ensure proper rendering
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    }, 100);
  };

  // Show loading state during initial render to avoid hydration mismatch
  if (!isClient) {
    return <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff' }} />;
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        backgroundColor: '#ffffff'
      }}
    >
      {iosReady && (
        <Suspense fallback={
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
          <ThreeDScene />
        </Suspense>
      )}
      {showOverlay && <IOSTapOverlay onStart={handleStart} />}
    </div>
  );
}
