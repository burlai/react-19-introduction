import { cache } from "react";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
};

// Server component causes infinite loop data fetching without special project config
export async function ServerComponent() {
  const res = await fetch("https://dummyjson.com/products");
  const products = await res.json();

  console.log("data", products);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.products.map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
