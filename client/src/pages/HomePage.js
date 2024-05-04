import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contaxt/cart";

const HomePage = () => {
  const [Products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [boxchecked, boxsetChecked] = useState([]); // it store all checkbox id which are checked
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // to set pages, to show products per page
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart([]);

  const navigate = useNavigate();

  //get all products by per page
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      // console.log(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //filter by category
  const handlefilter = (ischecked, id) => {
    let all = [...boxchecked];
    if (ischecked) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    boxsetChecked(all);
  };

  // get filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/product-filters`,
        { boxchecked, radio }
      );
      if (data?.success) {
        console.log();
        setProducts(data.filteredProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...Products, ...data.products]);
      // console.log(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!boxchecked.length || !radio.length) getAllProducts(); // we don't want to show all products if filter are applied
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (boxchecked.length || radio.length) filteredProducts(); // we want to show only filtered products
  }, [boxchecked, radio]);

  return (
    <Layout title={"Home Page - Crzy Shop"}>
      <div className="row mt-3">
        <div className="col-md-3">
          {/* Category Filter */}
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column align-items-center p-3">
            {Categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter */}
          <h4 className="text-center mt-5">Filter By Price</h4>
          <div className="d-flex flex-column align-items-center p-3">
            {/* see prices.js to know more */}
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column align-items-center p-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(boxchecked, null, 4)} */}
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {Products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description?.substring(0, 30)}</p>
                  <p className="card-text">
                    <b>₹ {p.price}/-</b>
                  </p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added to Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                  <button
                    class="btn btn-secondary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {Products && Products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  );
};

export default HomePage;
