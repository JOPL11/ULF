import Image from 'next/image';

export default function ImagePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '2rem'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Image
          src="/placeholder-image.jpg"
          alt="Placeholder image"
          fill
          style={{
            objectFit: 'cover',
          }}
          priority
        />
      </div>
    </div>
  );
}
