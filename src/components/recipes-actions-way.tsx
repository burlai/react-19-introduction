import { useState, useEffect, useTransition } from "react";

type Recipe = {
  id: number;
  name: string;
  image: string;
};

const RecipesActionsWay = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchRecipes = () => {
    startTransition(async () => {
      const response = await fetch("https://dummyjson.com/recipes");
      if (!response.ok) {
        setError(new Error(`Error: ${response.status} ${response.statusText}`));
        return;
      }
      const data = await response.json();
      setRecipes(data.recipes);
    });
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

export default RecipesActionsWay;
