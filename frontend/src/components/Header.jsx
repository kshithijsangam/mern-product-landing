import SearchBar from "./SearchBar";

export default function Header({ onSearchChange }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">
          <span className="logo-mark">T</span>
          <span className="logo-text">Trizen Store</span>
        </div>

        <div className="header-search-wrapper">
          <SearchBar onSearchChange={onSearchChange} />
        </div>

        <nav className="header-nav">
          <button className="nav-btn ghost">Sign in</button>
          <button className="nav-btn primary">Create Account</button>
        </nav>
      </div>
    </header>
  );
}
