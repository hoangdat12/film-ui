import React, {useContext} from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return (
        user ? <Outlet /> : <Navigate to='/person/login' replace={true} />
    )
}
export default PrivateRoute