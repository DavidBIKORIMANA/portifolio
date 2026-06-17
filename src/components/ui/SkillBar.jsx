import { useInView } from '../../hooks/useInView';

export default function SkillBar({ name, width }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <div className="skill-bar">
      <span>{name}</span>
      <i>{width}%</i>
      <div className="bar">
        <b ref={ref} style={{ width: inView ? `${width}%` : '0%' }} />
      </div>
    </div>
  );
}
