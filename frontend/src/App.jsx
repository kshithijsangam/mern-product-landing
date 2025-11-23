import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  // fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products"); // if your route is /api/products, change here
        setProducts(res.data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(unique)];
  }, [products]);

  // derived + filtered products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // search filter (client-side, in addition to backend search for suggestions)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    // category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // price filter
    if (priceFilter !== "all") {
      if (priceFilter === "lt5000") {
        result = result.filter((p) => p.price < 5000);
      } else if (priceFilter === "5000to20000") {
        result = result.filter((p) => p.price >= 5000 && p.price <= 20000);
      } else if (priceFilter === "gt20000") {
        result = result.filter((p) => p.price > 20000);
      }
    }

    // sort
    if (sortOption === "priceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingHighLow") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchTerm, selectedCategory, priceFilter, sortOption]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setPriceFilter("all");
    setSortOption("featured");
    setIsFiltering(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setIsFiltering(true);
  };

  return (
    <div className="app-root">
      <Header onSearchChange={handleSearchChange} />
      <Hero />

      <main className="page-main">
        <section className="page-content container">
          <aside className="filters-section">
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={(cat) => {
                setSelectedCategory(cat);
                setIsFiltering(true);
              }}
              priceFilter={priceFilter}
              setPriceFilter={(pf) => {
                setPriceFilter(pf);
                setIsFiltering(true);
              }}
              sortOption={sortOption}
              setSortOption={(opt) => {
                setSortOption(opt);
                setIsFiltering(true);
              }}
              onClear={handleClearFilters}
            />
          </aside>

          <section className="products-section">
            <div className="products-header">
              <div>
                <h2 className="section-title">Featured Products</h2>
                <p className="section-subtitle">
                  {loading
                    ? "Loading products..."
                    : `${filteredProducts.length} result${
                        filteredProducts.length !== 1 ? "s" : ""
                      } ${
                        isFiltering || searchTerm || selectedCategory !== "All"
                          ? "found"
                          : "available"
                      }`}
                </p>
              </div>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <ProductGrid
              products={filteredProducts}
              loading={loading}
              searchTerm={searchTerm}
            />
          </section>
        </section>
      </main>

      <footer className="page-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Trizen Store. All rights reserved.</p>
          <p className="footer-sub">
            Built with MERN · Search, filters, autosuggest & responsive layout.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
