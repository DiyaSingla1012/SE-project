import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import Admin from "./Admin";
import CategoryPage from "./CategoryPage";
import Cart from "./Cart";
import Welcome from "./Welcome";
import AiDishSuggestor from "./AiDish";
import DishDetails from "./DishDetails";
import Payment from "./Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/aiDish" element={<AiDishSuggestor />} />
        <Route path="/dish/:dishName" element={<DishDetails />} />
        <Route path="/payment" element={<Payment />} />

      </Routes>
    </Router>
  );
}

export default App;
