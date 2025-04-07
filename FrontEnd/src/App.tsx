import { BrowserRouter } from "react-router-dom";
import Rotas from "./Routes/routes";
import "./App.css";
import { AuthProvider } from "./lib/auth";

function App() {
  return (
        <AuthProvider>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </AuthProvider> 
  );
}

export default App;
