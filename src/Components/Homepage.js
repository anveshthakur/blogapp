import React from 'react';
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import {selectSignedIn, setSignedIn, setUserData} from '../app/features/userSlice';

import '../app/styling/home.css';

const Homepage = () => {

    const dispatch = useDispatch()
    
    const login = (response) => {
        console.log(response)
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj));
    };

    const isSignedIn = useSelector(selectSignedIn)
    
    return (
        <div className="home__page" style={{display: isSignedIn ? 'none' : ''}}>
            {!isSignedIn ? 
            (<div className="login__message">
                <h2>📚</h2>
                <h1>Gather your Daily dose of knowledge</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempore nesciunt, </p>
                <GoogleLogin 
                    clientId="897286089357-njg8likjjbb0mub5qfp2o775v2u3phk0.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className='login__button'
                        >
                            👍 Google Login
                        </button>
                    )}
                    onSuccess={login}
                    onFailure={login}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}

                />
            </div>) 
            :
            ('')};
              
        </div>
    );
};

export default Homepage
