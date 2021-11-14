import React,{useState} from 'react';
import { StateProvider } from './state/provider';
import { domain,header } from './../env';
import Axios from 'axios';


const ProfilePage = () => {
    const [{profile},dispatch]=StateProvider()
    const [email,setEmail]=useState(profile?.prouser?.email)
    const [fname,setFname]=useState(profile?.prouser?.first_name)
    const [lname,setLname]=useState(profile?.prouser?.last_name)
    
    const [image,setImage] = useState(null)

    console.log(profile)

    const updateImage =async()=>{
        let formData = new FormData()
        if (image!==null){
            formData.append('image',image)
            await Axios({
                method:"POST",
                url:`${domain}/api/profileupdate/`,
                data:formData,
                headers:header
            }).then(response=>{
                console.log(response.data["Msg"])
                dispatch({
                    type:"add_image",
                    value:response.data["Msg"]
                })
            })
        }
    }

    const userdataupdate=async()=>{
        let formData = new FormData()
        
        formData.append('first_name',fname)
        formData.append('last_name',lname)
        formData.append('email',email)

        await Axios({
            method:"POST",
            url:`${domain}/api/userdataupdate/`,
            data:formData,
            headers:header
        }).then((response)=>{
            console.log(response.data)
            dispatch({
                type:"user_update",
                value:response.data["Msg"]
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="media">
                    <img src={`${domain}${profile?.image}`} alt="profileimage"  className="rounded-circle accoutng-img" />
                    <div className="media-body">
                        <h2>{profile?.prouser?.username}</h2>
                        <p>{profile?.prouser?.email}</p>
                        <p>{profile?.prouser?.first_name} {profile?.prouser?.last_name}</p>   
                    </div>
                </div>
                <div className="">
                <div className="form-group">
                        <label>Profile Image</label>
                        <input onChange={(e)=>setImage(e.target.files[0])} type="file" className="form-control"/>
                        <button onClick={updateImage} className="btn btn-info my-2">Upload</button>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" class="form-control" value={email}/>
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input onChange={(e)=>setFname(e.target.value)} type="text" class="form-control" value={fname}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input onChange={(e)=>setLname(e.target.value)} type="text" class="form-control" value={lname}/>
                    </div>

                    <button onClick={userdataupdate} className="btn btn-success my-2">Update</button>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;