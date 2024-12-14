import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
};

export function ClientComponent() {
  const [products, setProducts] = useState<[Product] | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  console.log("data", products);

  return (
    <div>
      <h2>Client Side Fetching</h2>
      {products ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product: Product) => (
            <li key={product.id} style={{ marginBottom: "24px" }}>
              <h3>{product.title}</h3>
              <p>{product.category}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
