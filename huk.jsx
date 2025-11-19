// hooks/useProducts.js
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

// Mock data - в реальном приложении замените на API вызовы
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    discount: 10,
    image: "/images/products/iphone-15-pro.jpg",
    category: "smartphones",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isFeatured: true,
    inStock: true,
    description: "The most advanced iPhone with Titanium design and A17 Pro chip.",
    specifications: {
      display: "6.1-inch Super Retina XDR",
      chip: "A17 Pro",
      storage: "128GB",
      camera: "48MP Main camera"
    }
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1199,
    discount: 0,
    image: "/images/products/macbook-air-m2.jpg",
    category: "laptops",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isFeatured: true,
    inStock: true
  },
  // Добавьте больше товаров...
];

export const useProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  const { data: products, isLoading, error } = useQuery(
    'products',
    () => {
      // Имитация API вызова
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProducts);
        }, 1000);
      });
    },
    {
      staleTime: 5 * 60 * 1000, // 5 минут
    }
  );

  useEffect(() => {
    if (products) {
      setFeaturedProducts(products.filter(p => p.isFeatured));
      setNewProducts(products.filter(p => p.isNew));
    }
  }, [products]);

  return {
    products: products || [],
    featuredProducts,
    newProducts,
    isLoading,
    error
  };
};