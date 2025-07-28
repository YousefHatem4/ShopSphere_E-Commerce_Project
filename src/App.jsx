import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import About from './components/About/About'
import Category from './components/Category/Category'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Products from './components/Products/Products'
import Wishlist from './components/Wishlist/Wishlist'
import UserContextProvider from './Context/userContext'



const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'brands', element: <Brands /> },
      { path: 'cart', element: <Cart /> },
      { path: 'about', element: <About /> },
      { path: 'category', element: <Category /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'Products', element: <Products /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])


function App() {
  return <>
    <UserContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </UserContextProvider>
  </>

}

export default App
