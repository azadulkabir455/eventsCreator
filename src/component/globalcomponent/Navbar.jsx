import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {
    LogOut,
    LogIn,
    UserPlus,
    PlusSquare,
    Calendar
} from "feather-icons-react";
import { toast } from 'react-toastify';

// Imports for Authentication
import useCurrentUser from '../../hooks/useCurrentUser';
import { auth } from '../../firebase_config';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCurrentUser } from '../../store/feature/AuthenticationSlice';



export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [currentUserInfo] = useCurrentUser();

    const handleLogout = () => {
        dispatch(logout()).then(() => navigate("/signin")).then(() => {
            toast("You have successfully logout!");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(setCurrentUser(user));
        });
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            <nav className="navbar navbar-expand-sm mb-2">
                <div className="container bg-white shadow rounded py-3 px-4">
                    <Link className="navbar-brand" to="/">Events.</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav ms-auto">
                            {
                                currentUser && currentUser ?
                                    <li className="nav-item dropdown">
                                        <Dropdown>
                                            <Dropdown.Toggle as="button" id="dropdown-basic" className="nav-link p-0">
                                                <img
                                                    src="https://shorturl.at/TLg0i"
                                                    alt="profile_pic"
                                                    style={{ width: "40px", height: "40px" }}
                                                    className='rounded-circle me-2 border border-2 border-secondary'
                                                />
                                                {currentUserInfo && currentUserInfo[0]?.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="/myevents" className="d-flex align-items-center">
                                                    <Calendar size={16} className="me-2" />
                                                    My events
                                                </Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/addevent" className="d-flex align-items-center">
                                                    <PlusSquare size={16} className="me-2" />
                                                    Add events
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item as="span" className="d-flex align-items-center" role="button" onClick={handleLogout}>
                                                    <LogOut size={16} className="me-2" />
                                                    Logout
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    :
                                    <li className="nav-item align-self-center">
                                        <Link to="/signin">
                                            <button type="button" className="btn btn-secondary rounded-1 px-4 py-2 me-2">
                                                <LogIn size={16} className="me-1" /> Sign in
                                            </button>
                                        </Link>
                                        <Link to="/signup">
                                            <button type="button" className="btn btn-secondary rounded-1 px-4 py-2">
                                                < UserPlus size={16} className="me-1" /> Sign up
                                            </button>
                                        </Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
