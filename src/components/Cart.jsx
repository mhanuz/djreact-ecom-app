import React from 'react';
import { Link } from 'react-router-dom';
import { StateProvider } from './state/provider';
import  Axios  from 'axios';
import { domain,header } from './../env';
import { useHistory } from 'react-router';
const Cart = () => {
    const [{upncompletecartdata},dispatch]=StateProvider()

    const history = useHistory()

    let cartproduct_length=0

  
    if(upncompletecartdata!==null){
      cartproduct_length=upncompletecartdata?.cart_products.length
    }
    else{
      cartproduct_length=0
    }

    const addQuantity=async(id)=>{
        await Axios({
            method:"POST",
            url:`${domain}/api/addquantity/`,
            data:{"id":id},
            headers:header
        }).then(response=>{
                
            dispatch({
                type:"add_pagereload",
                value:response.data
            })
            
        })
    }

    const subQuantity=async(id)=>{
        await Axios({
            method:"POST",
            url:`${domain}/api/subquantity/`,
            data:{"id":id},
            headers:header
        }).then(response=>{
                
            dispatch({
                type:"add_pagereload",
                value:response.data
            })
            
        })
    }

    const deleteCartProduct=async(id)=>{
        await Axios({
            method:"POST",
            url:`${domain}/api/deletecartproduct/`,
            data:{"id":id},
            headers:header
        }).then(response=>{
                
            dispatch({
                type:"add_pagereload",
                value:response.data
            })
            
        })
    }

    const deleteFullCart=async(id)=>{
            await Axios({
                method:"POST",
                url:`${domain}/api/deletefullcart/`,
                data:{"id":id},
                headers:header
            }).then(response=>{
                dispatch({
                    type:"add_pagereload",
                    value:response.data
                })

                dispatch({
                    type:"add_uncompletecartdata",
                    value:null
                })
                cartproduct_length=0
                history.push("/")
                
             })

    }

    return (
        <div className="container-fluid my-5">
            {
                cartproduct_length !== 0 ? (<table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">SN</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        upncompletecartdata?.cart_products?.map((data,i)=>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.product[0].title}</td>
                                <td>{data.price}</td>
                                <td>{data.quantity}</td>
                                <td>{data.subtotal}</td>
                                <td>
                                    <button onClick={()=>addQuantity(data.product[0]['id'])} className="btn btn-info me-2" 
                                    style={{fontSize:"25px",border:"2px solid yellow", boxSizing:"border-box",paddingTop:"0px", paddingLeft:"10px",paddingRight:"10px", paddingBottom:"3px"}}>+</button> 
                                    {
                                        data.quantity === 1 ?(<button onClick={()=>subQuantity(data.product[0]['id'])} className="btn btn-success me-2"
                                        style={{fontSize:"25px",border:"2px solid yellow", boxSizing:"border-box",paddingTop:"0px", paddingLeft:"13px",paddingRight:"13px", paddingBottom:"3px"}}
                                        disabled>-</button>):(<button onClick={()=>subQuantity(data.product[0]['id'])} className="btn btn-success me-2"
                                        style={{fontSize:"25px",border:"2px solid yellow", boxSizing:"border-box",paddingTop:"0px", paddingLeft:"13px",paddingRight:"13px", paddingBottom:"3px"}}
                                        >-</button>)
                                    }
                                    
                                     
                                    <button onClick={()=>deleteCartProduct(data.product[0]['id'])} className="btn btn-danger "
                                    style={{fontSize:"25px",border:"2px solid yellow", boxSizing:"border-box",paddingTop:"0px", paddingLeft:"13px",paddingRight:"13px", paddingBottom:"3px"}}>x</button> 
                                </td>
                            </tr>
                        )
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="4" className="text-right">Total</th>
                        <th>{upncompletecartdata?.total}</th>
                        <th>
                            <Link className="btn btn-primary" to="/order">Order Now</Link>
                        </th>
                    </tr>
                </tfoot>
            </table>): (<div className="container">
                <p> No cart data is available.....)</p>
            </div>)
            
            
            }

            <div className="row">
                <div className="col">
                    <Link className="btn btn-info"  to="/oldorder">Old Orders</Link>
                </div>
                {
                    cartproduct_length !== 0 && 
                    <div className="col">
                        <Link onClick={()=>deleteFullCart(upncompletecartdata?.id)} className="btn btn-danger" to=""> Delete Cart</Link>
                    </div>
                }
            </div>
                
        </div>
    );
};

export default Cart;