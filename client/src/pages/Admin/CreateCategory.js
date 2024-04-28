import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'
const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success(`${data.category.name} created successfully`);
                setName("");
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in input form')
        }
    };

    // handle update form
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data?.success) {
                toast.success(`${updatedName} updated successfully`);
                setSelected("");
                setUpdatedName("");
                setVisible(false);
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in input form')
        }
    };

    // handle delete form
    const handleDelete = async (cid) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${cid}`);
            if (data?.success) {
                toast.success(`Category deleted successfully`);
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in delete')
        }
    };

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
    }, [])

    return (
        <Layout title={"Admin Dashboard - Create Category"}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                <button className='btn btn-danger ms-2' onClick={() => { handleDelete(c._id) }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory