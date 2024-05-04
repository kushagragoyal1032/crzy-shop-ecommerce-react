import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../contaxt/cart'
import { useAuth } from '../contaxt/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart(); // it have full products details
    const [instance, setInstance] = useState("");
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");

    const handleRemove = (pid) => {
        try {
            let mycart = [...cart];
            let index = mycart.findIndex((item) => item.id === pid);
            mycart.splice(index, 1);
            setCart(mycart);
            localStorage.setItem('cart', JSON.stringify(mycart));
        } catch (error) {
            console.log(error);
        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    const handlepayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`/api/v1/product/braintree/payment`, { nonce, cart });
            setLoading(false);
            localStorage.removeItem('cart')
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment successful")
        } catch (error) {
            setLoading(false);

        }
    }

    const getTotal = () => {
        try {
            let total = 0;
            cart.map((item) => {
                total += item.price;
            })
            return total.toLocaleString('en-US', {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello, ${auth?.token ? auth?.user?.name : "User"}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `You have ${cart?.length} items in cart ${auth?.token ? '' : 'Please Login to Checkout'}` : "Your cart is Empty!"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-7'>
                        {cart.map((product) => (
                            <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4'>
                                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} width="150px" height="200px" />
                                </div>
                                <div className='col-md-8'>
                                    <p>{product.name}</p>
                                    <p>{product.description.substring(0, 40)}...</p>
                                    <p>Price: {product.price}</p>
                                    <button className='btn btn-danger' onClick={() => handleRemove(product.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-5 text-center'>
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {getTotal()}</h4>
                        {auth?.user?.address ? (
                            <div className='mb-3'>
                                <h4>Current Address: </h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning' onClick={() => { navigate('/dashboard/user/profile') }}>Update Address</button>
                            </div>
                        ) : (
                            <div className='mb-3'>
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => { navigate('/dashboard/user/profile') }}>Add Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => { navigate('/login', { state: '/cart' }); }}>Please Login To Checkout</button>
                                )}
                            </div>
                        )}
                        <div className='mb-2'>
                            {
                                !clientToken || !cart.length ? ("") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button className='btn btn-primary' onClick={handlepayment} disabled={loading || !instance || !auth?.user?.address}>Make Payment</button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage