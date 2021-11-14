import React, { useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { StateProvider } from './state/provider';
import  Axios from 'axios';
import { domain, header } from '../env';

const Order = () => {
    const [{profile,upncompletecartdata},dispatch]=StateProvider()
    const history= useHistory()
    const [email,setEmail]=useState(null)
    const [address,setAddress]=useState(null)
    const [phone,setPhone] = useState(null)

    const orderCart=async()=>{
        await Axios({
            method:"POST",
            url:`${domain}/api/orders/`,
            data:{"cart_id":upncompletecartdata?.id,"address":address,"email":email,"mobile":phone},
            headers:header
        }).then(response=>{
            dispatch({
                type:"add_pagereload",
                value:response.data
            })

            dispatch({
                type:"add_uncompletecartdata",
                value: null
            })
            history.push("/oldorder")
            
         }).catch(()=>
            console.log("something is wrong")
        )
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Qunatity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                upncompletecartdata?.cart_products?.map((data,i)=>{
                                    return <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{data.product[0].title}</td>
                                        <td>{data.price}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.subtotal}</td>
                                        
                                    </tr>
                                })
                                }
                                <tr>
                                    <td colSpan="3">
                                        <Link to="/cart" className="btn btn-info">Edit Cart</Link>
                                    </td>
                                    <th>Total</th>
                                    <td>${upncompletecartdata?.total}</td>
                                </tr>
                            
                        </tbody>
                    </table>
                </div>

                <div className="col-md-6">
                    <h3>Order Now</h3>
                    <div className="form-group">
                        <label>Address</label>
                        <input onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" placeholder="address" />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" placeholder="mobile" />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" placeholder="email" />
                    </div>

                    <button onClick={orderCart} className="btn btn-success my-2">Order</button>
                </div>
            </div>
        </div>
    );
};

export default Order;