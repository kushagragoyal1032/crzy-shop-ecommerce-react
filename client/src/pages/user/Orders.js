import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../contaxt/auth";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Orders = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/auth/orders`
            );
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            getOrders();
        }
    }, []);

    return (
        <Layout title={"Dashboard - All Orders"}>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">Your Orders</h1>
                        <div className="border shadow">
                            {orders.map((order, index) => (
                                <>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{order?.status}</td>
                                                <td>{order?.buyer?.name}</td>
                                                <td>{moment(order?.createAt).fromNow()}</td>
                                                <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                                                <td>{order?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {order?.products?.map((product) => (
                                            <div className='row mb-2 p-3 card flex-row' key={product._id}>
                                                <div className='col-md-4'>
                                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} width="150px" height="200px" />
                                                </div>
                                                <div className='col-md-8'>
                                                    <p>{product.name}</p>
                                                    <p>{product.description.substring(0, 40)}...</p>
                                                    <p>Price: {product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ))}
                            {/* <div className="container">
                                {orders?.map((order, index) => (
                                    order?.products?.map((product) => (
                                        <div className='row mb-2 p-3 card flex-row' key={product._id}>
                                            <div className='col-md-4'>
                                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} width="150px" height="200px" />
                                            </div>
                                            <div className='col-md-8'>
                                                <p>{product.name}</p>
                                                <p>{product.description.substring(0, 40)}...</p>
                                                <p>Price: {product.price}</p>
                                            </div>
                                        </div>
                                    ))
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {console.log(orders)}
        </Layout>
    );
};

export default Orders;
