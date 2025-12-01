import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Welcome.css";

/*
  Converted to a single React component (Welcome) from your HTML/CSS/JS.
  - Preserves className and id attributes so styles remain identical.
  - Debounced search filters department tiles (and would support products if you later add them).
  - Header department buttons and department tiles are keyboard-accessible.
  - No external behavior changes; image paths are kept exactly as you provided.
*/

const DEPARTMENTS = [
  {
    id: "vegetables",
    title: "Vegetables",
    desc: "Fresh, seasonal greens and root vegetables.",
    img: "https://nwebkart.com/wp-content/uploads/2020/11/grocery_store_provider_in_india_e8xljj.jpg",
  },
  {
    id: "fruits",
    title: "Fruits",
    desc: "Citrus, tropical & local fruit picks.",
    img: "https://media.istockphoto.com/id/489190757/photo/fruits-on-a-farm-market.jpg?s=612x612&w=0&k=20&c=FUmoul9nr9ja6HuLdDv1WW6VopSTgYmxYRiG9ulWvRU=",
  },
  {
    id: "dairy",
    title: "Dairy",
    desc: "Milk, yogurt, paneer and other essentials.",
    img: "https://img.freepik.com/free-photo/dairy-products_114579-8756.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "bakery",
    title: "Bakery",
    desc: "Freshly baked breads and pastries.",
    img: "https://img.freepik.com/premium-photo/bunch-breads-some-bread-table_1304147-112918.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "beverages",
    title: "Beverages",
    desc: "Tea, coffee, juices and more.",
    img: "https://www.shutterstock.com/image-photo/dubai-uae-18-may-2022-600nw-2568513101.jpg",
  },
  {
    id: "household",
    title: "Household",
    desc: "Cleaning, kitchen and daily essentials.",
    img: "https://5.imimg.com/data5/SELLER/Default/2020/9/EC/AQ/SR/111495734/grocery-product-photography-service-500x500.jpg",
  },
];

export default function Welcome() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const searchRef = useRef(null);

  // debounce input
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 200);
    return () => clearTimeout(t);
  }, [search]);

  // filtered departments based on debounced query
  const filteredDepartments = useMemo(() => {
    const q = (debounced || "").toLowerCase();
    if (!q) return DEPARTMENTS;
    return DEPARTMENTS.filter((d) => {
      const title = d.title.toLowerCase();
      const desc = d.desc.toLowerCase();
      const id = d.id.toLowerCase();
      return title.includes(q) || desc.includes(q) || id.includes(q);
    });
  }, [debounced]);

  // header dept buttons: combine "All" + list
  const headerButtons = useMemo(() => ["all", ...DEPARTMENTS.map((d) => d.id)], []);

  // immediate search when clicking button
  function handleSearchNow() {
    setDebounced(search.trim());
  }

  // keyboard: Enter in search triggers immediate run
  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const handler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchNow();
      }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [search]);

  // clicking a department tile (or header button)
  function chooseDepartment(did) {
    setSelectedDept(did || "all");
    // keep search as-is (combined behavior), but set debounced to current search so filtering applies immediately
    setDebounced(search.trim());
    // scroll to departments grid for visibility (preserve behavior)
    setTimeout(() => {
      const el = document.getElementById("departmentsGrid");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  // If there are no departments matching the search, show a "No results found." message (like the original JS)
  const noResults = filteredDepartments.length === 0;

  // set current year in footer
  useEffect(() => {
    const yEl = document.getElementById("year");
    if (yEl) yEl.textContent = new Date().getFullYear();
  }, []);

  return (
    <div className="welcome-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <a href="#" className="logo">
              <span className="logo-text">WeMart</span>
            </a>
          </div>

          <div className="search-bar" role="search">
            <input
              id="searchInput"
              ref={searchRef}
              type="search"
              placeholder="Search products, e.g. bananas, milk..."
              aria-label="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button id="searchBtn" aria-label="Search" onClick={(e) => { e.preventDefault(); handleSearchNow(); }}>
              Search
            </button>
          </div>

          <nav className="header-actions" aria-label="User menu">
            <button id="mobileMenuBtn" className="mobile-menu-btn" aria-label="Menu">☰</button>
          </nav>
        </div>

        <div className="departments-row container" id="departmentsRow" aria-hidden="false">
          {headerButtons.map((btnId) =>
            btnId === "all" ? (
              <button
                key="all"
                className={`dept-btn ${selectedDept === "all" ? "active" : ""}`}
                data-dept="all"
                onClick={() => chooseDepartment("all")}
              >
                All
              </button>
            ) : (
              <button
                key={btnId}
                className={`dept-btn ${selectedDept === btnId ? "active" : ""}`}
                data-dept={btnId}
                onClick={() => chooseDepartment(btnId)}
              >
                {btnId.charAt(0).toUpperCase() + btnId.slice(1)}
              </button>
            )
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <img
            className="hero-image"
            src="https://cdn.prod.website-files.com/655f311269a83117a49c17c2/684686bd124616ca0aafa42e_657b1f41d90ebea19df30247_Food.jpg.png"
            alt="Banner image"
            loading="lazy"
          />
          <div className="hero-overlay container">
            <h1>Fresh groceries. Fast delivery.</h1>
            <p>From farm-fresh produce to pantry essentials — delivered to your door.</p>
            <div className="hero-ctas">
              <a href="#departmentsGrid" className="btn primary" id="shopNowBtn">Shop Departments</a>
            </div>
          </div>
        </section>

        <section id="departmentsGrid" className="container section">
          <h2>Departments</h2>

          <div id="deptCards" className="departments-grid" aria-live="polite">
            {filteredDepartments.map((d) => (
              <article
                key={d.id}
                className="department-card"
                data-dept={d.id}
                tabIndex="0"
                onClick={() => chooseDepartment(d.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    chooseDepartment(d.id);
                  }
                }}
              >
                <img src={d.img} alt={d.title} loading="lazy" />
                <div className="dept-info">
                  <h3>{d.title}</h3>
                  <p className="muted">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {noResults && (
            <p id="noResultsMsg" style={{ color: "#666", marginTop: 10 }}>
              No results found.
            </p>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© <span id="year"></span> WeMart — Grocery shopping made simple.</p>
          <p className="muted">Built with care • Accessibility-minded • Responsive</p>
        </div>
      </footer>
    </div>
  );
}