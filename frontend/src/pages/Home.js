import React from 'react';
import { Outlet} from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar'
import Widgets from './Widegets/Widgets';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../firebase.init';
import TweetBox from './Feed/TweetBox';




const Home = () =>{

    const user = useAuthState(auth);
    
    //console.log(user[0]?.email);
    const handleLogout = () => {
        signOut(auth);
    }
    return (
        <div className='app'>
           <Sidebar handleLogout= { handleLogout } user= { user } />
           <Outlet />
           <Widgets />
           <TweetBox />
        </div>
    );
};

export default Home;