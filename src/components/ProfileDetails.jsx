import React from 'react';
import { StateProvider } from './state/provider';
import { domain } from './../env';


const ProfileDetails = () => {
    const [{profile},dispatch]=StateProvider()
    // const [email,setEmail]=useState(profile?.prouser?.email)
    // const [fname,setFname]=useState(profile?.prouser?.first_name)
    // const [lname,setLname]=useState(profile?.prouser?.last_name)

    return (
        <div className="container">
            <div className="row my-5">
                <div className="media">
                    <img src={`${domain}${profile?.image}`} alt="profileimage"  style={{width:"250px", height:"250px"}} />
                    <div className="media-body">
                        <h3>Username:{profile?.prouser?.username}</h3>
                        <h3>Email:{profile?.prouser?.email}</h3>
                        <h3>Full Name:{profile?.prouser?.first_name} {profile?.prouser?.last_name}</h3>   
                    </div>
                </div>
                

                    
                </div>
            </div>

    );
};

export default ProfileDetails;


    




 


