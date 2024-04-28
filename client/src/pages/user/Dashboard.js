import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../contaxt/auth'

const Dashboard = () => {
  const [user] = useAuth()
  return (
    <Layout title={"User Dashboard - Crzy Shop"}>
      <div className='container-fluid p-3 m-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-2'>
                <h3>User Name: <b>{user?.user?.name}</b></h3>
                <h3>User Email: <b>{user?.user?.email}</b></h3>
                <h3>User Contact: <b>{user?.user?.phone}</b></h3>
              </div>
            </div>
          </div>
        </div>
        </Layout>
  )
}

export default Dashboard