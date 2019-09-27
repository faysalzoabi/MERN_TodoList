import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
     } from 'reactstrap';

import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import Logout from '../Logout/Logout';
import {connect} from 'react-redux';


const AppNavbar = (props) => {
    const [isOpen, setToggle] = useState(true)

    const handleClick = () => {
        setToggle(!isOpen)
    }

    const {isAuthenticated, user} = props.auth

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">
                        TodoList
                    </NavbarBrand>
                    <NavbarToggler onClick={handleClick}/>
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? (
                                    <>
                                    <NavItem>
                                        <span className="navbar-text mr-3">
                                            <strong>{user ? `Welcome, ${user.user.name}` : ''}</strong>
                                        </span>
                                    </NavItem>
                                    <NavItem>
                                        <Logout/>
                                    </NavItem>
                                    </>
                                ) : (
                                    <>
                                    <NavItem>
                                        <NavLink href="#">
                                            <RegisterModal/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">
                                            <LoginModal/>
                                        </NavLink>
                                     </NavItem>
                                     </>
                                )}
                            </Nav>
                        </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AppNavbar);
