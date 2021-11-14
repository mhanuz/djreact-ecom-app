import React,{useState} from 'react';
import Axios from 'axios';
import { domain, header2 } from '../env';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const history=useHistory()
    const [username,setUsername]= useState(null)
    const [password,setPassword] = useState(null)
    

    const loginHandle = async(e)=>{
         await Axios({
             method:"POST",
             url:`${domain}/api/login/`,
             headers:header2,
             data:{
                 "username":username,
                 "password":password
            }

         }).then(response=>{
            window.localStorage.setItem("token",response.data["token"]) 
            window.location.href="/"
            
 
         }).catch(()=>{
             alert("username or password is wrong try again")
         })
    }

    return (
        <div className="container mt-4">
            <h1>Login Page</h1>
            <div class="form-group">
                <label>Username</label>
                <input onChange={(e)=>setUsername(e.target.value)} type="text" class="form-control" placeholder="username"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" placeholder="password"/>
            </div>
            <button onClick={loginHandle} className="btn btn-success my-4">Login</button>
        </div>
    );
};

export default LoginPage;