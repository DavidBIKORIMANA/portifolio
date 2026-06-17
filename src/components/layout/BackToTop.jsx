export default function BackToTop({ show, onClick }) {
  return (
    <button
      type="button"
      className={`back-to-top${show ? ' show' : ''}`}
      aria-label="Back to top"
      onClick={onClick}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}
