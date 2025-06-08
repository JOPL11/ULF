"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Plane({ position, rotation, texture, scale }) {
  const meshRef = useRef();
  
  // Cleanup texture when component unmounts
  useEffect(() => {
    return () => {
      if (texture && texture.dispose) {
        texture.dispose();
      }
    };
  }, [texture]);

  // Handle texture updates
  useEffect(() => {
    if (meshRef.current && texture) {
      // Set texture properties for better quality
      texture.encoding = THREE.sRGBEncoding;
      texture.anisotropy = 4;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
      
      // Update material
      if (meshRef.current.material) {
        meshRef.current.material.map = texture;
        meshRef.current.material.needsUpdate = true;
      }
    }
  }, [texture]);
  
  // Check if the texture is a PNG (for transparency)
  const isTransparent = texture && texture.image && 
                      typeof texture.image.currentSrc === 'string' && 
                      texture.image.currentSrc.toLowerCase().endsWith('.png');
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      rotation={rotation} 
      scale={scale}
      receiveShadow
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial 
        map={texture || null}
        toneMapped={false}
        transparent={isTransparent}
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default Plane;
