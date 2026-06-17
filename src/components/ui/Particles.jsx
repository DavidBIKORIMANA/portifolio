import { useMemo } from 'react';

export default function Particles() {
  const particles = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 18 : 36;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 18 + 12,
      delay: Math.random() * 12,
    }));
  }, []);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: '-10px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
