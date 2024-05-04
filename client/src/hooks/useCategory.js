import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
    const [Categories, setCategories] = useState([]);

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    return Categories;
}