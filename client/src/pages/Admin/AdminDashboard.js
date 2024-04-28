import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../contaxt/auth'

const AdminDashboard = () => {
  const [user] = useAuth()
  return (
    <Layout title={"Admin Dashboard - Crzy Shop"}>
        <div className='container-fluid p-3 m-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-2'>
                <h3>Admin Name: <b>{user?.user?.name}</b></h3>
                <h3>Admin Email: <b>{user?.user?.email}</b></h3>
                <h3>Admin Contact: <b>{user?.user?.phone}</b></h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard