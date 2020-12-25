import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {selectSignedIn, selectUserData, setInput, setSignedIn, setUserData} from '../app/features/userSlice';
import '../app/styling/navbar.css';


const Navbar = () => {

    const [inputValue, setInputValue] = useState('tech');
    
    const isSignedIn = useSelector(selectSignedIn);
    
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue))
    }

    const logout = (response) => {
        dispatch(setUserData(null));
        dispatch(setSignedIn(false));
    }

    return (
        <div className="navbar">
            <h1 className="navbar__header">TheBlog 📜</h1>
            {isSignedIn && 
            (
            <div className="blog__search">
                <input className="search" 
                placeholder="Discover" 
                value={inputValue} 
                onChange = {(e) => setInputValue(e.target.value)} 
                type="text"
                />
                <button className="submit" onClick={handleClick}>
                    Search
                </button>
            </div>
            )}

            {isSignedIn ? (
                <div className="navbar__user__data">
                    <Avatar style={{border: '2px solid whitesmoke'}} src={userData?.imageUrl} alt={userData?.name}/>
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout 
                        clientId="897286089357-njg8likjjbb0mub5qfp2o775v2u3phk0.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <button
                                className='logout__button'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                Logout 😞 
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>
            ): 
            <h1 className="notSignedIn">User Not Available  😢</h1>
        }
        </div>
    );
};

export default Navbar
