import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading'
import { userContext } from '../../Context/userContext';

export default function Checkout() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  let { setUserToken } = useContext(userContext);
  let { cart, clearCart } = useContext(cartContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Checkout'
    // Redirect if no cart items
    if (!cart || !cart.data?.products?.length) {
      navigate('/cart');
    }
  }, [cart, navigate])

  // Calculate cart totals
  const subtotal = cart?.data?.products?.reduce((total, item) => total + (item.price * item.count), 0) || 0
  const shipping = subtotal > 0 ? 15 : 0
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  const validationSchema = Yup.object({
    details: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .required('Address is required'),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number')
      .required('Phone number is required'),
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .required('City is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
  })

  const OnlinePayment = async (shippingAddress) => {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${window.location.origin}`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem('userToken')
          }
        }
      )
      window.location.href = data.session.url
      toast.success(data.status)
    } catch (err) {
      console.log(err.response?.data?.message);
      setApiError(err.response?.data?.message || 'Payment failed');
      setLoading(false);
    }
  }

  const CashPayment = async (shippingAddress) => {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem('userToken')
          }
        }
      )
      toast.success('Order placed successfully!')
      navigate('/');
      clearCart();
    } catch (err) {
      console.log(err.response?.data?.message);
      setApiError(err.response?.data?.message || 'Order failed');
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      details: '',
      phone: '',
      city: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const shippingAddress = {
        details: values.details,
        phone: values.phone,
        city: values.city
      };

      if (paymentMethod === 'online') {
        await OnlinePayment(shippingAddress);
      } else {
        await CashPayment(shippingAddress);
      }
    }
  })

  if (!cart || !cart.data?.products?.length) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-white/20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#DB4444]/20"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-[#DB4444] absolute top-0 left-0"></div>
            </div>
            <p className="text-gray-700 font-semibold mt-6 text-lg">Processing your order</p>
            <p className="text-gray-500 text-sm mt-2 text-center">Please don't close this window<br />This may take a few moments</p>
          </div>
        </div>
      )}

      {/* Elegant Header */}
      <div className="relative bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-sm border-b border-gray-100/50">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DB4444]/3 via-transparent to-blue-500/3"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DB4444]/20 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-5 lg:px-30 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-[#DB4444] to-[#FF6B6B] w-[20px] h-[40px] rounded-lg shadow-lg"></div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Complete Your Order
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              You're just one step away from getting your favorite products delivered to your doorstep
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-30 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 lg:p-10 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#DB4444] to-[#FF6B6B] rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-user text-white text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-gray-600">Tell us who you are</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 text-gray-700 bg-white/70 backdrop-blur-sm ${formik.touched.firstName && formik.errors.firstName
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : 'border-gray-200 focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/10 hover:border-gray-300'
                        } focus:outline-none placeholder-gray-400`}
                      placeholder="Enter your first name"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {formik.errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 text-gray-700 bg-white/70 backdrop-blur-sm ${formik.touched.lastName && formik.errors.lastName
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : 'border-gray-200 focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/10 hover:border-gray-300'
                        } focus:outline-none placeholder-gray-400`}
                      placeholder="Enter your last name"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {formik.errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 text-gray-700 bg-white/70 backdrop-blur-sm ${formik.touched.email && formik.errors.email
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : 'border-gray-200 focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/10 hover:border-gray-300'
                        } focus:outline-none placeholder-gray-400`}
                      placeholder="your.email@example.com"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 lg:p-10 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-map-marker-alt text-white text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
                    <p className="text-gray-600">Where should we send your order?</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="space-y-2">
                    <label htmlFor="details" className="block text-sm font-semibold text-gray-700">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="details"
                      name="details"
                      value={formik.values.details}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 text-gray-700 bg-white/70 backdrop-blur-sm ${formik.touched.details && formik.errors.details
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : 'border-gray-200 focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/10 hover:border-gray-300'
                        } focus:outline-none placeholder-gray-400`}
                      placeholder="Enter your complete address with landmarks"
                    />
                    {formik.touched.details && formik.errors.details && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-xs"></i>
                        {formik.errors.details}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City */}
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 text-gray-700 bg-white/70 backdrop-blur-sm ${formik.touched.city && formik.errors.city
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/10 hover:border-gray-300'
                          } focus:outline-none placeholder-gray-400`}
                        placeholder="Enter your city"
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {formik.errors.city}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 text-gray-700 bg-white/70 backdrop-blur-sm ${formik.touched.phone && formik.errors.phone
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/10 hover:border-gray-300'
                          } focus:outline-none placeholder-gray-400`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {formik.errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 lg:p-10 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-credit-card text-white text-lg"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                    <p className="text-gray-600">Choose how you'd like to pay</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cash Payment */}
                  <label className="cursor-pointer group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 group-hover:scale-[1.02] ${paymentMethod === 'cash'
                        ? 'border-[#DB4444] bg-gradient-to-br from-[#DB4444]/10 to-[#DB4444]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white/50'
                      }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'cash' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                          <i className="fas fa-money-bill-wave text-2xl text-green-600"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600 mt-1">Pay when you receive your order</p>
                          <p className="text-xs text-green-600 mt-2 font-medium">✓ No additional fees</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Online Payment */}
                  <label className="cursor-pointer group">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 group-hover:scale-[1.02] ${paymentMethod === 'online'
                        ? 'border-[#DB4444] bg-gradient-to-br from-[#DB4444]/10 to-[#DB4444]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white/50'
                      }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'online' ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                          <i className="fas fa-credit-card text-2xl text-blue-600"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">Online Payment</h3>
                          <p className="text-sm text-gray-600 mt-1">Secure payment via Stripe</p>
                          <p className="text-[10px] text-blue-600 mt-2 font-medium ">✓ Instant confirmation</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {apiError && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                    <div>
                      <p className="text-red-800 font-semibold">Payment Error</p>
                      <p className="text-red-600 text-sm mt-1">{apiError}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 sticky top-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-[#DB4444] to-[#FF6B6B] rounded-xl flex items-center justify-center">
                  <i className="fas fa-shopping-bag text-white"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto custom-scrollbar">
                {cart.data.products.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-contain border border-gray-100 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.product.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.count}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{(item.price * item.count).toFixed(2)} EGP</p>
                      <p className="text-xs text-gray-500">{item.price} EGP each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-shopping-cart text-sm"></i>
                    Subtotal
                  </span>
                  <span className="font-medium">{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-truck text-sm"></i>
                    Shipping
                  </span>
                  <span className="font-medium">{shipping.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-receipt text-sm"></i>
                    Tax (10%)
                  </span>
                  <span className="font-medium">{tax.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#DB4444]">{total.toFixed(2)} EGP</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={formik.handleSubmit}
                disabled={loading || !formik.isValid}
                className={`w-full py-5 px-6 rounded-2xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#DB4444]/20 shadow-lg ${loading || !formik.isValid
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#DB4444] to-[#FF6B6B] text-white hover:from-[#B83636] hover:to-[#E55A5A] hover:scale-105 hover:shadow-xl'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <i className={`${paymentMethod === 'cash' ? 'fas fa-money-bill-wave' : 'fas fa-credit-card'}`}></i>
                    {paymentMethod === 'cash' ? 'Place Order (COD)' : 'Pay Securely Now'}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </span>
                )}
              </button>

              {/* Security & Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <i className="fas fa-shield-alt text-green-500"></i>
                  <span>256-bit SSL encrypted checkout</span>
                </div>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-truck"></i>
                    Free Returns
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-headset"></i>
                    24/7 Support
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-award"></i>
                    Satisfaction Guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
    </div>
  )
}
