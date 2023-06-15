import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<h1>catalogo</h1>} />
          <Route path="/customCupCakes" element={<h1>personalizar pastelitos</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/shoppingCart" element={<h1>carrito de compras</h1>} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/homeVisit" element={<h1>Home visit</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App