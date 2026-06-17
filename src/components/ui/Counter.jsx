import { useCounter, useInView } from '../../hooks/useInView';

export default function Counter({ target, suffix = '', icon, label }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const value = useCounter(target, suffix, inView);

  return (
    <div className="col-6 col-lg-3">
      <div className="stat-card glass-card" ref={ref}>
        <i className={`${icon} stat-icon`} />
        <span className="counter">{value}</span>
        <p>{label}</p>
      </div>
    </div>
  );
}
