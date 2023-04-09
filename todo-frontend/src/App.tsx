import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import './App.css'
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
