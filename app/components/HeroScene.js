"use client";

import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Suspense, useRef, useEffect, useState, lazy } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dynamic from 'next/dynamic';

// Lazy load the Plane component
const LazyPlane = lazy(() => import('./Plane'));

// Check if running on iOS
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Check if running on mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const CameraController = ({ isMobileDevice = false }) => {
  const { camera, gl } = useThree();
  const controls = useRef();
  const lastTouchY = useRef(0);
  const isDragging = useRef(false);
  const rotationSpeed = 0.005;
  
  useEffect(() => {
    if (isMobileDevice) {
      // Disable all controls for mobile
      camera.rotation.set(0, 0, 0);
      camera.updateProjectionMatrix();
      
      // Make canvas non-interactive
      gl.domElement.style.touchAction = 'auto';
      gl.domElement.style.pointerEvents = 'none';
      
      // Handle touch events for mobile
      const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
          lastTouchY.current = e.touches[0].clientY;
          isDragging.current = true;
        }
      };
      
      const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - lastTouchY.current;
        lastTouchY.current = touchY;
        
        // Rotate camera based on touch movement
        camera.rotation.y += deltaY * rotationSpeed;
      };
      
      const handleTouchEnd = () => {
        isDragging.current = false;
      };
      
      // Add event listeners
      const canvas = gl.domElement;
      canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        // Cleanup
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      };
    } else {
      // Desktop controls with OrbitControls
      const orbitControls = new OrbitControls(camera, gl.domElement);
      
      // Configure orbit controls
      orbitControls.enableZoom = false;
      orbitControls.enablePan = false;
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.5;
      orbitControls.rotateSpeed = 0.8;
      orbitControls.screenSpacePanning = false;
      
      // Camera constraints
      orbitControls.minPolarAngle = Math.PI / 2 - 0.2;
      orbitControls.maxPolarAngle = Math.PI / 2 + 0.2;
      orbitControls.autoRotate = true;
      orbitControls.autoRotateSpeed = 1;
      
      controls.current = orbitControls;
      
      // Animation loop for auto-rotation
      let animationId;
      const animate = () => {
        orbitControls.update();
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        cancelAnimationFrame(animationId);
        orbitControls.dispose();
      };
    }
  }, [camera, gl, isMobileDevice]);
  
  // Update the camera on each frame for smooth rotation
  useFrame(() => {
    if (isMobileDevice) {
      // For mobile, we handle rotation in the touch handlers
      camera.updateProjectionMatrix();
    } else if (controls.current) {
      // For desktop, let OrbitControls handle updates
      controls.current.update();
    }
  });
  
  return null;
};

// Loading fallback component
const LoadingFallback = () => (
  <mesh>
    <planeGeometry args={[1, 1]} />
    <meshBasicMaterial color="#f0f0f0" />
  </mesh>
);

// Preload textures
const textureLoader = new THREE.TextureLoader();
const preloadTextures = (urls) => {
  const textures = {};
  urls.forEach(url => {
    textures[url] = textureLoader.load(url);
  });
  return textures;
};

function Scene() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [textures, setTextures] = useState(null);
  
  useEffect(() => {
    const mobile = isMobile() || isIOS();
    setIsMobileDevice(mobile);
    
    // Preload textures
    const textureUrls = [
      '/images/poster2.png',
      '/images/palms.png',
      '/images/poster3.jpg'
    ];
    
    // Track loaded textures for cleanup
    const loadedTextures = [];
    
    // Load textures
    Promise.all(
      textureUrls.map(url => 
        new Promise((resolve) => {
          const texture = textureLoader.load(
            url,
            (texture) => {
              loadedTextures.push(texture);
              resolve({ url, texture });
            },
            undefined,
            (error) => {
              console.error(`Error loading texture ${url}:`, error);
              resolve(null);
            }
          );
          
          // Store texture for potential cleanup
          loadedTextures.push(texture);
        })
      )
    ).then(loadedTextures => {
      const textureMap = {};
      loadedTextures.forEach(item => {
        if (item) {
          textureMap[item.url] = item.texture;
        }
      });
      setTextures(textureMap);
    });
    
    // Cleanup function
    return () => {
      loadedTextures.forEach(texture => {
        if (texture && typeof texture.dispose === 'function') {
          texture.dispose();
        }
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Create a simple loading state
  if (!textures) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading 3D scene...</div>
      </div>
    );
  }
  
  return (
    <div style={{ 
      width: '100vw',
      height: '100vh',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    }}>
      <Canvas
        gl={{ 
          antialias: true,
          powerPreference: isMobileDevice ? 'low-power' : 'high-performance',
          alpha: false,
          stencil: false,
          depth: false,
          antialias: true
        }}
        style={{ 
          width: '100%',
          height: '100%',
          background: '#ffffff',
          touchAction: isMobileDevice ? 'auto' : 'none',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          zIndex: 0,
          display: 'block'
        }}
        dpr={isMobileDevice ? Math.min(window.devicePixelRatio, 1.5) : 1}
        camera={{ position: [0, 0, 1.2], fov: 70 }}
        onCreated={({ gl }) => {
          if (isMobileDevice) {
            gl.domElement.style.touchAction = 'auto';
            gl.domElement.style.pointerEvents = 'none';
          }
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <CameraController isMobileDevice={isMobileDevice} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <group position={[0, 0, 0]}>
            {/* Back plane */}
            <LazyPlane 
              position={[0, 0, -0.5]} 
              rotation={[0, 0, 0]} 
              texture={textures['/images/poster2.png']}
              scale={[1.45, 1.5, 1]}
            />
            {/* Front plane */}
            <LazyPlane 
              position={[-0.15, 0.05, -1.5]} 
              rotation={[0, 0, 0]} 
              texture={textures['/images/palms.png']}
              scale={[1.25, 1.3, 1]}
            />
            {/* Perpendicular side plane */}
            <LazyPlane 
              position={[1.5, 0.05, 0]}
              rotation={[0, Math.PI/2 + Math.PI, 0]}
              texture={textures['/images/poster2.png']}
              scale={[1.25, 1.3, 1]}
            />
            {/* Opposite side plane */}
            <LazyPlane 
              position={[-1.5, 0.05, 0]}
              rotation={[0, Math.PI/2, 0]}
              texture={textures['/images/palms.png']}
              scale={[1.25, 1.3, 1]}
            />
            {/* Plane behind camera */}
            <LazyPlane 
              position={[0, 0, 1.5]}
              rotation={[0, Math.PI, 0]}
              texture={textures['/images/poster3.jpg']}
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

// Main export with device detection
export default function HeroScene() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // On mobile, render a simpler version of the scene
  if (isClient && (isIOS() || isMobile())) {
    // We'll use the same 3D scene but with mobile optimizations
    return <ThreeDScene />;
  }

  return <ThreeDScene />;
}
