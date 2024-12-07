import { useState, useEffect } from "react";

type Recipe = {
  id: number;
  name: string;
  image: string;
};

const RecipesOldWay = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchRecipes = async () => {
    setIsPending(true);

    try {
      const response = await fetch("https://dummyjson.com/recipes");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      setRecipes(data.recipes);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2 style={{ margin: 0 }}>Recipes</h2>
      {isPending && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {recipes?.map((recipe) => (
          <li key={recipe.id}>
            <i>{recipe.name}</i>
            <div>
              <img
                style={{ width: "180px", margin: "12px 0 24px 0" }}
                src={recipe.image}
                alt={recipe.name}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesOldWay;
