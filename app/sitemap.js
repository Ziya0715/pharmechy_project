import { PRODUCT_CATEGORIES } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap() {
  const lastModified = new Date();
  const staticRoutes = ["", "/about", "/products", "/quality", "/global", "/partnership", "/contact"];

  const pages = staticRoutes.map((path) => ({
    url: `${SITE.url}${path || "/"}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const products = PRODUCT_CATEGORIES.map((product) => ({
    url: `${SITE.url}/products/${product.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...products];
}
