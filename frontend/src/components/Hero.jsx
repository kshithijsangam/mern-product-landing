export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy fade-in">
          <p className="hero-eyebrow">New Season · Tech & Essentials</p>
          <h1 className="hero-title">
            Discover products you{" "}
            <span className="hero-title-highlight">actually</span> love.
          </h1>
          <p className="hero-subtitle">
            Search, filter and explore curated electronics, accessories and
            workspace essentials — all in one clean, minimal landing page.
          </p>

          <div className="hero-cta">
            <button className="btn primary">Shop the collection</button>
            <button className="btn ghost">View best rated</button>
          </div>

          <div className="hero-meta">
            <span>⚡ Live search with autosuggest</span>
            <span>⭐ Sort by rating & price</span>
            <span>📱 Fully responsive layout</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <p className="hero-card-label">Today’s highlight</p>
            <h3>Smartphone Max 20</h3>
            <p className="hero-card-price">₹59,999</p>
            <p className="hero-card-rating">★ 4.5 · Trending now</p>
          </div>

          <div className="hero-card hero-card-secondary">
            <p>Up to 30% off on work setup combos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
