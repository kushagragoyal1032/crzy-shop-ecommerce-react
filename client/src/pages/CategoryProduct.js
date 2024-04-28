import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [Products, setProducts] = useState([]);
    const [Category, setCategories] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // to set pages, to show products per page 


    useEffect(() => {
        if (params?.slug) getProductsByCategory();
    }, [params?.slug])

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-Category/${params.slug}`)
            setProducts(data?.products);
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={"Category-wise Product"}>
            <div className="container mt-3">
                <h4 className='text-center'>Category : {Category?.slug}</h4>
                <h6 className='text-center'>{Products?.length} result found</h6>
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {Products?.map((p) => (
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
                    {/* <div className="m-2 p-3">
                        {Products && Products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading..." : "LoadMore"}
                            </button>
                        )}
                    </div> */}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct