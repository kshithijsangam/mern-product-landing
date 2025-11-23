import { useEffect, useRef, useState } from "react";
import { api } from "../api";

export default function SearchBar({ onSearchChange }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      onSearchChange?.("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        // backend: GET /search?q=term (max 5 results)
        const res = await api.get("/search", {
          params: { q: query },
        });
        setSuggestions(res.data || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timeoutId);
  }, [query, onSearchChange]);

  // click outside to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (name) => {
    setQuery(name);
    onSearchChange?.(name);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange?.(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange?.(query);
    setShowDropdown(false);
  };

  return (
    <div className="searchbar-wrapper" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="searchbar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search products (e.g. smartphone, chair, monitor)"
          className="search-input"
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setQuery("");
              onSearchChange?.("");
              setSuggestions([]);
            }}
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-submit">
          Search
        </button>
      </form>

      {showDropdown && (suggestions.length > 0 || isLoading) && (
        <div className="search-dropdown">
          {isLoading && <div className="search-dropdown-item">Searching…</div>}
          {!isLoading &&
            suggestions.map((s) => (
              <button
                key={s._id}
                type="button"
                className="search-dropdown-item"
                onClick={() => handleSelectSuggestion(s.name)}
              >
                <span className="suggestion-name">{s.name}</span>
                <span className="suggestion-meta">
                  {s.category} · ₹{s.price}
                </span>
              </button>
            ))}
          {!isLoading && suggestions.length === 0 && (
            <div className="search-dropdown-item muted">
              No products found for “{query}”
            </div>
          )}
        </div>
      )}
    </div>
  );
}
