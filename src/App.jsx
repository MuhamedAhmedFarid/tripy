import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import HomePage from "./pages/HomePage"
import { PageNotFount } from "./pages/PageNotFount"
import "./index.css"
import { AppPage } from "./pages/AppPage"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import CountriesList from "./components/CountriesList"
import City from "./components/City"
import Form from "./components/Form"
const URL = 'http://localhost:3001'
const App = () => {
  const [cities, setCities] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${URL}/cities`)
        const data = await res.json()
        setCities(data)

      } catch {
        console.log('Error fetching data')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="app" element={<AppPage />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList isLoading={isLoading} cities={cities} />} />
          <Route path="cities/:id" element={<City cities={cities}/>} />
          <Route path="contries" element={<CountriesList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFount />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App