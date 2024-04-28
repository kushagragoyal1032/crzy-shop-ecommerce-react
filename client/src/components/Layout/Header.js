import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaShopify } from 'react-icons/fa'
import { useAuth } from '../../contaxt/auth'
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../contaxt/cart';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart(); // we need only cart so we destructure cart array only
  const Categories = useCategory();
  const handleLogout = () => {
    setAuth({ // this we write bcz we don't need to refresh page after localhost clr
      ...auth, user: null, token: ""
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully !")

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand"><FaShopify /> Crzy Shop</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/categories"} id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                  {Categories?.map(c => (
                    <Link key={c._id} className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
                        <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink></li>

                      </ul>
                    </li>
                  </>
                )
              }
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero>
                    Cart  
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header