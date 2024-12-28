import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Products } from "./pages/Products"
import { Pricing } from "./pages/Pricing"
import { HomePage } from "./pages/HomePage"
import { PageNotFount } from "./pages/PageNotFount"
import "./index.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />|
        <Route path="*" element={<PageNotFount />} />|
      </Routes>
    </BrowserRouter>
  )
}

export default App