"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EXAMPLE_PRODUCT_ROWS, PRODUCT_CATEGORIES } from "@/lib/products";
import styles from "./ProductTable.module.css";

export default function ProductTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXAMPLE_PRODUCT_ROWS.filter((row) => {
      const matchesCategory = category === "all" || row.category === category;
      const haystack = `${row.category} ${row.type} ${row.dosageForm} ${row.packaging}`.toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [query, category]);

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <label className={styles.field}>
          <span>Search example categories</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by category or dosage form"
          />
        </label>
        <label className={styles.field}>
          <span>Filter</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {PRODUCT_CATEGORIES.map((item) => (
              <option key={item.slug} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className={styles.note}>
        The table below is illustrative example data for sourcing categories. It is not a live product catalogue and does not list registered medicines, strengths or approvals.
      </p>
      <div className={styles.tableScroll} role="region" aria-label="Example product categories" tabIndex={0}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Category</th>
              <th>Product Type</th>
              <th>Dosage Form</th>
              <th>Strength</th>
              <th>Packaging</th>
              <th>Market / Regulatory Information</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6}>No matching example rows. Adjust the search or filter.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={`${row.slug}-${row.type}`}>
                  <td>
                    <Link href={`/products/${row.slug}`}>{row.category}</Link>
                  </td>
                  <td>{row.type}</td>
                  <td>{row.dosageForm}</td>
                  <td>{row.strength}</td>
                  <td>{row.packaging}</td>
                  <td>{row.market}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
