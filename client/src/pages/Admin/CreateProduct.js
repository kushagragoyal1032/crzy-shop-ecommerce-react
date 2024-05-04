import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';
const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong while render all categories!')
        }
    };

    useEffect(() => {
        getAllCategories()
    }, [])

    // create handleCreateProduct handler
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name)
            productData.append("description", description)
            productData.append("shipping", shipping)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            const { data } = await axios.post(`/api/v1/product/create-product`, productData);
            // console.log(name, description, shipping, price, quantity, photo, category);
            if (data?.success) {
                navigate('/dashboard/admin/products');
                toast.success(`Product Created Successfully`);
            }
            else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

    return (
        <Layout title={"Admin Dashboard - Create Product"}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>Create Product</h1>
                        {/* <form onSubmit={handleCreateProduct}> */}
                        <div className='m-1 w-75'>
                            <Select bordered={false}
                                placeholder="Select a category"
                                size='large'
                                showSearch
                                className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                {categories.map((cat) => (
                                    <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                                ))}
                            </Select>
                            <div className='mb-3 text-center'>
                                <label className='btn btn-outline-secondary col-md-6 mt-4'>
                                    {photo ? photo.name : "Upload Image"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} // it's using browser properties to show image
                                            alt='product'
                                            className="img img-responsive"
                                            height={"200px"}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder='Enter Product Name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    type="textarea"
                                    value={description}
                                    placeholder='Enter Product Description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                            </div>
                            <div className='mb-3'>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder='Enter Product Price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder='Enter Product Quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    bordered={false}
                                    placeholder='Select Product Shipping'
                                    size="large"
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3 text-center'>
                                <button className='btn btn-outline-primary mt-4' onClick={handleCreateProduct}>CREATE PRODUCT</button>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct