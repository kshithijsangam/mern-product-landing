import { useState } from "react";

// Local images
import phoneImg from "../assets/products/phone.jpg";
import headphonesImg from "../assets/products/headphones.jpg";
import laptopImg from "../assets/products/laptop.jpg";
import cameraImg from "../assets/products/camera.jpg";
import keyboardImg from "../assets/products/keyboard.jpg";
import mouseImg from "../assets/products/mouse.jpg";
import watchImg from "../assets/products/watch.jpg";
import earbudsImg from "../assets/products/earbuds.jpg";
import chairImg from "../assets/products/chair.jpg";
import deskImg from "../assets/products/desk.jpg";
import speakerImg from "../assets/products/speaker.jpg";
import monitorImg from "../assets/products/monitor.jpg";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const { name, price, rating, category } = product;

  const roundedRating = Math.round(rating * 10) / 10;

  // choose local image based on product name
  const getLocalImage = () => {
    const lower = name.toLowerCase();

    if (lower.includes("headphone")) return headphonesImg;
    if (lower.includes("earbud")) return earbudsImg;
    if (lower.includes("smartwatch") || lower.includes("watch"))
      return watchImg;
    if (lower.includes("laptop")) return laptopImg;
    if (lower.includes("camera")) return cameraImg;
    if (lower.includes("keyboard")) return keyboardImg;
    if (lower.includes("mouse")) return mouseImg;
    if (lower.includes("chair")) return chairImg;
    if (lower.includes("desk")) return deskImg;
    if (lower.includes("speaker")) return speakerImg;
    if (lower.includes("monitor")) return monitorImg;

    // fallback for phones
    if (lower.includes("phone")) return phoneImg;

    return phoneImg; // default fallback
  };

  const getBadgeLabel = () => {
    if (rating >= 4.6) return "Top Rated";
    if (price < 3000) return "Value Pick";
    return "Popular";
  };

  return (
    <article className="product-card">
      <div className="product-media">
        <img
          src={getLocalImage()}
          alt={name}
          loading="lazy"
        />

        <button
          className={`wishlist-btn ${wishlisted ? "wishlist-active" : ""}`}
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Toggle wishlist"
        >
          {wishlisted ? "♥" : "♡"}
        </button>

        <span className="product-badge">{getBadgeLabel()}</span>
      </div>

      <div className="product-body">
        <p className="product-category">{category}</p>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">₹{price.toLocaleString("en-IN")}</p>

        <div className="product-meta">
          <div className="product-rating">
            <span className="rating-pill">★ {roundedRating}</span>
            <span className="rating-sub">In stock</span>
          </div>
          <button className="btn small ghost">View details</button>
        </div>
      </div>
    </article>
  );
}
