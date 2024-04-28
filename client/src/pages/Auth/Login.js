import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../../src/styles/AuthStyles.css";
import { useAuth } from '../../contaxt/auth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email, password });
            if(res && res.data.success) {
                toast.success(res.data.message)
                setAuth({ // this we write bcz we don't need to refresh page
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
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
        <h1 className='title'>Login Form</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required />
            </div>
            <div className="mb-3">
            <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <button type="button" className="btn btn-primary"  onClick={() => {navigate("/forgot-password") }}>Forgot Password</button>

        </form>

    </div>
</Layout>
  )
}

export default Login