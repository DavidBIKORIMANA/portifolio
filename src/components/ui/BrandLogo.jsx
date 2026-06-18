export default function BrandLogo({ showName = true, name = 'David', className = '' }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__code">&lt;/&gt;</span>
      </span>
      {showName && (
        <span className="brand-text">
          {name}<span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
