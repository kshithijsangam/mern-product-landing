export default function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceFilter,
  setPriceFilter,
  sortOption,
  setSortOption,
  onClear,
}) {
  return (
    <div className="filters-card">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="link-btn" onClick={onClear}>
          Clear all
        </button>
      </div>

      <div className="filters-group">
        <p className="filters-label">Category</p>
        <div className="filters-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${selectedCategory === cat ? "chip-active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-group">
        <p className="filters-label">Price</p>
        <select
          className="filters-select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="lt5000">Under ₹5,000</option>
          <option value="5000to20000">₹5,000 – ₹20,000</option>
          <option value="gt20000">Above ₹20,000</option>
        </select>
      </div>
          
      <div className="filters-group">
        <p className="filters-label">Sort by</p>
        <select
          className="filters-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
          <option value="ratingHighLow">Rating: High → Low</option>
        </select>
      </div>
    </div>
  );
}
