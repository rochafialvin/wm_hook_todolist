import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import {
   Button,
   Collapse,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Navbar,
   NavbarToggler, 
   Nav,
   NavLink,
   NavItem,
   NavbarBrand,
   UncontrolledDropdown
   } from 'reactstrap';

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const username = useSelector(state =>  state.auth.username)
    const dispatch = useDispatch()
        

    const isToggle = () => setIsOpen((prevState) => !prevState)

    const renderNav = () => {
        // Jika tidak login
        
        return !username ? (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem>
            </Nav>
        ) :(
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Hello, {username}
                    </DropdownToggle>
                    <DropdownMenu right>

                        <NavLink tag={Link} to="/manageproduct" >
                            <DropdownItem> Manage Product</DropdownItem>
                        </NavLink>

                        <NavLink tag={Link} to="/profile">
                            <DropdownItem>Profile</DropdownItem>
                        </NavLink>

                        <NavLink tag={Link} to="/editprofile">
                            <DropdownItem>Edit Profile</DropdownItem>
                        </NavLink>

                        <DropdownItem divider />

                        <DropdownItem onClick={() => dispatch({type: 'LOGOUT_SUCCESS'})}>
                            Logout
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        )
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={isToggle} />
                <Collapse isOpen={isOpen} navbar>
                    
                    {renderNav()}

                </Collapse>
            </Navbar>
        </div>
    )
}
