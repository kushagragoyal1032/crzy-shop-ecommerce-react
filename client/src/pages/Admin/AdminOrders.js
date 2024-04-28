import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useState } from 'react'
import moment from "moment";
import { useAuth } from '../../contaxt/auth';
import axios from "axios";
import { useEffect } from 'react';
import { Select } from 'antd'
const { Option } = Select

const AdminOrders = () => {
    const [orderStatus, setOrderStatus] = useState(['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cencelled'])
    const [changeStatus, setChangeStatus] = useState('')
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
            );
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (orderId, newStatus) => {
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: newStatus });
                setChangeStatus(newStatus);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) {
            getOrders();
        }
    }, []);
    return (
        <Layout title={"Admin Orders - Crzy Shop"}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Orders</h1>
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
                                            <td>
                                                <Select bordered={false} id="select-list" onChange={(value) => handleChange(order?._id, value)} defaultValue={order?.status}>
                                                    {orderStatus.map((s, i) => (
                                                        <Option key={i} value={s}>{s}</Option>
                                                    ))}
                                                </Select>
                                            </td>
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
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders