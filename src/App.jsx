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
import ForgetPass from './components/ForgetPass/ForgetPass'
import VerfiyCode from './components/VerfiyCode/VerfiyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ProductsContextProvider from './Context/ProductsContext'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import Checkout from './components/CheckOut/Checkout'
import WishListContextProvider from './Context/WishListContext'




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
      { path: 'forgetpass', element: <ForgetPass /> },
      { path: 'verfiycode', element: <VerfiyCode /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'productdetails/:id', element: <ProductDetails /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])


function App() {
  return <>
    <WishListContextProvider>
      <CartContextProvider>
        <ProductsContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
        </ProductsContextProvider>
      </CartContextProvider>
    </WishListContextProvider>
  </>

}

export default App
