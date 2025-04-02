import { BrowserRouter } from "react-router-dom";
import Rotas from "./Routes/routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
