import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../src/styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {email, answer, newpassword });
            if(res && res.data.success) {
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
        <Layout title="Forgot Password - Crzy Shop">
            <div className='form-container'>
        <form onSubmit={handlesubmit}>
        <h1 className='title'>Reset Password Form</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputanswer1" className="form-label">What is Your First School Name?</label>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputanswer1" required />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                <input type="password" value={newpassword} onChange={(e) => setnewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
            </div>

            <div className="mb-3">
            <button type="submit" className="btn btn-primary">RESET</button>
            </div>

        </form>
    </div>
        </Layout>
    )
}

export default ForgotPassword