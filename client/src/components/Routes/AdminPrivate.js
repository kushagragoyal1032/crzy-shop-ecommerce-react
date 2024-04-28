import { useState, useEffect } from "react";
import { useAuth } from "../../contaxt/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminPrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authcheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
                // {
                // headers: { // don't need bcz we add default header in auth.js
                //     Authorization: auth.token
                // },
                // }
            );
            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        };
        if (auth?.token) authcheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="/"/>;
}