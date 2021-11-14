import React,{useState} from 'react';
import  Axios  from 'axios';
import { domain, header2 } from '../env';
import { useHistory } from 'react-router-dom';


const RegisterPage = () => {

    const history = useHistory()
    const [username, setUsername]=useState(null)
    const [password, setPassword]=useState(null)
    const [confirmpassword, setConfirmPassword]=useState(null)

    const userRegistration=async()=>{
        if (password !== confirmpassword){
            alert("Password does not match")
        }else{
            await Axios({
                method:"POST",
                url:`${domain}/api/register/`,
                headers:header2,
                data:{
                    "username":username,
                    "password":password
                }
                
            }).then(response=>{
                alert(response.data['msg'])
                history.push("/login")
            })
        }
    }
    

    return (
        <div className="container mt-4">
            <h1>Registraion Page</h1>
            <div className="form-group">
                <label>Username</label>
                <input onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control" placeholder="username"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" placeholder="password"/>
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="confirm password"/>
            </div>
            <button onClick={userRegistration} className="btn btn-success my-4">Register</button>
        </div>
    );
};

export default RegisterPage;