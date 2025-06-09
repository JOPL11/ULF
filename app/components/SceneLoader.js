'use client';

import { Html } from '@react-three/drei';

const SceneLoader = () => {
  return (
    <Html
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '10px',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 10px',
        }} />
        <p style={{
          color: '#333',
          marginTop: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>Loading scene...</p>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
};

export default SceneLoader;
