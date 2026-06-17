export default function SectionHead({ kicker, title, subtitle, accentWord }) {
  const titleParts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className="section-head text-center" data-aos="fade-up">
      <span className="section-kicker">{kicker}</span>
      <h2 className="section-title">
        {accentWord ? (
          <>
            {titleParts[0]}
            <span className="text-accent">{accentWord}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}
