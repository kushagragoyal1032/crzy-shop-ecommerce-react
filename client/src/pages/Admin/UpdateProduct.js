import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState(""); // store product id 

    // get single product
    const getSingleProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category);
        } catch (error) {
            console.log(error);
        }
    }

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
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
        getSingleProduct()
    }, [])

    // create handleUpdateProduct handler
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name)
            productData.append("description", description)
            // productData.append("shipping", shipping)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            // console.log(name, description, shipping, price, quantity, photo, category);
            if (data?.success) {
                toast.success(`Product Updated Successfully`);
                navigate("/dashboard/admin/products")
            }
            else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };

    // create delete product handler
    const handleDeleteProduct = async (e) => {
        try {
            let answer = window.prompt(`Are you sure you want to delete this product ?`)
            if (!answer) return
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.success(`Product Deleted Successfully`);
                navigate("/dashboard/admin/products")
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
    <Layout title={"Admin Dashboard - Update Product"}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>Update Product</h1>
                        {/* <form onSubmit={handleUpdateProduct}> */}
                            <div className='m-1 w-75'>
                                <Select bordered={false}
                                    placeholder="Select a category"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3' onChange={(value) => { setCategory(value) }}
                                    // here category populating by id
                                    value={category?._id}
                                    >
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
                                    {photo ? (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} // it's using browser properties to show image
                                                alt='product'
                                                className="img img-responsive"
                                                height={"200px"}
                                            />
                                        </div>
                                    ) : (
                                    <div className="text-center">
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                                        alt='product'
                                        className="img img-responsive"
                                        height={"200px"}
                                    />
                                </div>)}
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
                                        value={shipping ? "Yes" : "No" }
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className='mb-3 text-center'>
                                    <button className='btn btn-outline-primary mt-4' onClick={handleUpdateProduct}>UPDATE PRODUCT</button>
                                    <div className='mb-3 text-center'>
                                    <button className='btn btn-outline-danger mt-4' onClick={handleDeleteProduct}>DELETE PRODUCT</button>
                                </div>
                                </div>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default UpdateProduct