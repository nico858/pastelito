import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Register from "./pages/Register";
import Order from "./pages/Order";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CupCakes from "./pages/CupCakes";
import CustomCupCakes from "./pages/CustomCupCakes";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/catalogo" element={<CupCakes />} />
          <Route path="/buy" element={<h1>caracteristicas</h1>} />
          <Route path="/customCupCakes" element={<CustomCupCakes />} />
          <Route path="/shoppingCar" element={<h1>carrito de compras</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/generateOrder" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
