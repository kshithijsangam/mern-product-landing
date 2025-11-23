import ProductCard from "./ProductCard";

export default function ProductGrid({ products, loading, searchTerm }) {
  if (loading) {
    return (
      <div className="products-grid slide-up">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="product-card skeleton" />
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="no-results">
        <h3>No products found</h3>
        {searchTerm ? (
          <p>
            We couldn&apos;t find anything matching <strong>{searchTerm}</strong>.
            Try a different keyword or clear filters.
          </p>
        ) : (
          <p>Try adjusting your search or filters.</p>
        )}
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
