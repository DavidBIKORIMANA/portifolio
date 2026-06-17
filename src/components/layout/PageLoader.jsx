import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`page-loader${hidden ? ' hidden' : ''}`}>
      <div className="loader-ring" />
      <span className="loader-text">DB</span>
    </div>
  );
}
