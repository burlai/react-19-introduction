import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ marginTop: 0, marginBottom: "18px" }}>React 19</h1>
      <h2 style={{ color: "#E464C1", margin: 0 }}>Простий фронтенд</h2>
      <div className="card"></div>
    </>
  );
}

export default App;
