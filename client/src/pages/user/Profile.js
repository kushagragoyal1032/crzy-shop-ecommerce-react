import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../contaxt/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'

const Profile = () => {
    const [auth, setauth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // get user data
    useEffect(() => {
        console.log(auth.user);
        const { email, name, phone, address } = auth?.user;
        setEmail(email);
        setAddress(address);
        setPhone(phone);
        setName(name);
    }, [auth?.user])

    const handleupdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/auth/profile`, { name, email, password, phone, address });
            if (data?.error) {
                toast.error(data?.error);
            }
            else {
                console.log(auth.user);
                setauth({ ...auth, user: data?.updateduser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data?.updateduser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title={"Dashboard - Profile"}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='form-container'>
                            <form onSubmit={handleupdate}>
                                <h1 className='title'>USER PROFILE</h1>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputname" className="form-label">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputphone" className="form-label">Phone</label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputphone" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputaddress" className="form-label">Address</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputaddress" />
                                </div>
                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile