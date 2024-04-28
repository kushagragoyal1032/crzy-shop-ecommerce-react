import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    const navigate = useNavigate();

    // load initial if slug is there
    useEffect(() => {
        if (params.slug) getProduct();
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product.category._id, data?.product._id);
        } catch (error) {
            console.log(error);
        }
    };

    // get similar product
    const getSimilarProduct = async (cid, pid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Layout title={"Product Details"}>
                <div className="row container mt-2">
                    <div className="col-md-6">
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                    </div>
                    <div className="col-md-6">
                        <h1 className='text-center'>Product Details</h1><hr /><br />
                        <h6>Name: {product.name}</h6>
                        <h6>Description: {product.description}</h6>
                        <h6>Price: {product.price} Rs/-</h6>
                        <h6>Category: {product.category?.name}</h6>
                        <button class="btn btn-primary ms-1">Add To Cart</button>

                    </div>
                    {relatedProducts.length > 0 && (<div className="row">
                        <br /><hr />
                        <h1 className='text-center'>Similer Products</h1>
                        <div className="d-flex flex-wrap">
                            {relatedProducts?.map((p) => (
                                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description?.substring(0, 30)}</p>
                                        <p className="card-text"><b>₹ {p.price}/-</b></p>
                                        <button class="btn btn-primary ms-1">Add To Cart</button>
                                        <button class="btn btn-secondary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}
                </div>

            </Layout >
        </div >
    )
}

export default ProductDetails