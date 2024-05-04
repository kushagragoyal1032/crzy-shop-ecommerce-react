import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../src/styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();

    // form function
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res && res.data.success) {
                toast.success(res.data.message)
                navigate("/login");
            }
            else {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title="Register - Crzy Shop">
            <div className='form-container'>
                <form onSubmit={handlesubmit}>
                    <h1 className='title'>REGISTER FORM</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputname" className="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputname" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputphone" className="form-label">Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputphone" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputaddress" className="form-label">Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputaddress" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputanswer" className="form-label">What is Your First School Name?</label>
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputanswer" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register