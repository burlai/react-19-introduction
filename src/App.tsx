import reactLogo from "./assets/react.svg";
import "./App.css";
import { ClientComponent } from "./components/ClientComponent";
// import { ServerComponent } from "./components/ServerComponent";

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ marginTop: 0, marginBottom: "18px" }}>React 19</h1>
      <h2 style={{ margin: 0 }}>
        <a
          href="https://www.youtube.com/@SimpleFrontendUA"
          target="_blank"
          style={{ color: "#E464C1" }}
        >
          Простий Фронтенд
        </a>
      </h2>
      <div className="card">
        <ClientComponent />
        {/* <ServerComponent /> */}
      </div>
    </>
  );
}

export default App;
