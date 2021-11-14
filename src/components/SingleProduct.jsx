import Axios from 'axios';
import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import { domain, header } from './../env';
import { StateProvider } from './state/provider';

const SingleProduct = ({item}) => {
    const [{profile},dispatch]=StateProvider()
    const history=useHistory()
    
    const addToCart=async(id)=>{
        await Axios({
            method:"POST",
            url:`${domain}/api/addtocart/`,
            data:{"id":id},
            headers:header
        }).then(response=>{
            dispatch({
                type:'add_pagereload',
                value:response.data
            })
            
        })
    }

    const gotoLogin=()=>{
        history.push("/login")
    }

    return (
        <div className="card single_product">
            <Link to={`/product/${item?.id}`}>
            <img src={item.image} className="card-img-top" alt="..."/>
            </Link>
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description.slice(0,200)}...<Link to={`/product/${item?.id}`}>more</Link></p>
                {
                    profile !== null?(<button onClick={()=>addToCart(item?.id)} className="btn btn-primary">Add to Cart</button>):
                    <button onClick={()=>gotoLogin()} className="btn btn-primary">Add to Cart</button>
                }
            </div>
            <div className="card-footer">
                <h5>Price <del>{item.marcket_price}</del> {item.selling_price}</h5>
            </div>
        </div>
    );
};

export default SingleProduct;