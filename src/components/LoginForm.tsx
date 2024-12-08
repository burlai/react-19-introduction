import { useActionState, useState } from "react";

// useActionState docs: https://react.dev/reference/react/useActionState

function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [error, submitAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      setIsLoggedIn(false);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"), // michaelw
          password: formData.get("password"), // michaelwpass
          expiresInMins: 30,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        return "Login failed. Please try again.";
      }

      const result = await response.json();
      console.log(result);

      setIsLoggedIn(true);
    },
    null // Initial state for error
  );

  return (
    <form action={submitAction}>
      <div className="mb-12">
        <label className="pr-12" htmlFor="username">
          Username:
        </label>
        <input id="username" type="text" name="username" required />
      </div>
      <div className="mb-24">
        <label className="pr-12" htmlFor="password">
          Password:
        </label>
        <input id="password" type="password" name="password" required />
      </div>
      <button className="button" type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoggedIn && <p style={{ color: "green" }}>Logged in successfully!</p>}
    </form>
  );
}

export default LoginForm;
