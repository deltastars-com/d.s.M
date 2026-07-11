import { describe, expect, it } from "vitest";
import { allProducts, getProductsByCategory, getProductById, searchProducts, getCategories } from "../client/src/data/allProducts";

describe("Products", () => {
  it("should have 91 products", () => {
    expect(allProducts).toHaveLength(91);
  });

  it("should have all required product fields", () => {
    allProducts.forEach(product => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name_ar");
      expect(product).toHaveProperty("name_en");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("unit");
    });
  });

  it("should have valid prices", () => {
    allProducts.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.price).toBe("number");
    });
  });

  it("should have unique product IDs", () => {
    const ids = allProducts.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(allProducts.length);
  });

  it("should get products by category", () => {
    const fruits = getProductsByCategory("فواكه");
    expect(fruits.length).toBeGreaterThan(0);
    fruits.forEach(product => {
      expect(product.category).toBe("فواكه");
    });
  });

  it("should return empty array for non-existent category", () => {
    const products = getProductsByCategory("non-existent");
    expect(products).toHaveLength(0);
  });

  it("should get product by ID", () => {
    const product = getProductById(1);
    expect(product).toBeDefined();
    expect(product?.id).toBe(1);
  });

  it("should return undefined for non-existent product ID", () => {
    const product = getProductById(9999);
    expect(product).toBeUndefined();
  });

  it("should search products by Arabic name", () => {
    const results = searchProducts("تفاح");
    expect(results.length).toBeGreaterThan(0);
    results.forEach(product => {
      expect(product.name_ar).toContain("تفاح");
    });
  });

  it("should search products by English name", () => {
    const results = searchProducts("apple");
    expect(results.length).toBeGreaterThan(0);
  });

  it("should return empty array for non-matching search", () => {
    const results = searchProducts("xyz123");
    expect(results).toHaveLength(0);
  });

  it("should get all categories", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain("فواكه");
    expect(categories).toContain("خضروات");
    expect(categories).toContain("تمور");
  });

  it("should have at least 5 different categories", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThanOrEqual(5);
  });

  it("should have correct product count by category", () => {
    const fruits = getProductsByCategory("فواكه");
    const vegetables = getProductsByCategory("خضروات");
    const dates = getProductsByCategory("تمور");
    const eggs = getProductsByCategory("بيض");
    
    expect(fruits.length).toBe(30);
    expect(vegetables.length).toBeGreaterThan(35);
    expect(dates.length).toBe(5);
    expect(eggs.length).toBe(3);
  });

  it("should have valid product names", () => {
    allProducts.forEach(product => {
      expect(product.name_ar.length).toBeGreaterThan(0);
      expect(product.name_en.length).toBeGreaterThan(0);
    });
  });

  it("should have valid units", () => {
    const validUnits = ["كيلو", "حبة", "حزمة", "دزينة"];
    allProducts.forEach(product => {
      expect(validUnits).toContain(product.unit);
    });
  });
});
