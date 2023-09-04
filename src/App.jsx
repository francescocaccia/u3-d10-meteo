import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meteo from "./components/Meteo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Meteo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
