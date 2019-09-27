import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'reactstrap';
import { doLogout } from '../../actions/authActions';


const Logout = (props) => {

    const handleLogOut = () => {
        props.dispatch(doLogout())
    }

    return (
        <>
            <NavLink onClick={handleLogOut} href="#">
              Logout
            </NavLink>
        </>
    )
}

export default connect()(Logout)