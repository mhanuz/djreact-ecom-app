import React,{useEffect,useState} from 'react';
import { useParams,useHistory } from "react-router";
import  Axios from 'axios';
import {domain,header} from '../env'
import SingleProduct from './SingleProduct';
import { StateProvider } from './state/provider';
const ProductsDetails = () => {
    const [{profile},dispatch]=StateProvider()
    const history=useHistory()

    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [categoryProduct,setCategoryProduct] = useState(null)


    
    useEffect(() => {
        const getdata= async()=>{
        await Axios({
            method:"GET",
            url:`${domain}/api/product/${id}/`,
        }).then((response)=>{
            setProduct(response.data)
            getcategory(response.data["category"]["id"])
        })
        }
        getdata()
    }, [id])

    const getcategory=async(id)=>{
    await Axios({
        method:"GET",
        url:`${domain}/api/category/${id}/`
    }).then(response=>{
        setCategoryProduct(response.data)
    })
    } 


    const addToCart=async(id)=>{
        profile!==null ? (
            await Axios({
                method:"POST",
                url:`${domain}/api/addtocart/`,
                data:{"id":id},
                headers:header,
            }).then(response=>
                dispatch({
                    type:"add_pagereload",
                    value:response.data
                })
                
                )
        ):(
            history.push("/login")
        )
        
    }
    
    return (
        <div className="container">
            {
                product != null && 
                (
                    <div className="row">
                        <img src={product?.image} alt="productImage" />
                        <div className="col-md-7">
                           <h1> {product?.title} </h1>
                           <h2>Price: <del>{product?.marcket_price}</del> {product?.selling_price}</h2>
                        </div>

                        <div className="col-md-4">
                            <button onClick={()=>addToCart(product?.id)} className="btn btn-info">Add to Cart</button>
                        </div>
                        <p>{product?.description}</p>
                    </div>
                )
            }
            <div className="row">
                <h1> Related Products</h1>
                {
                    categoryProduct != null &&
                    categoryProduct[0]?.category_product?.map((product,i)=>
                        <div className="col-md-3" key={i}>
                            <SingleProduct item={product} />
                        </div>
                    )
                        
                }
            </div>
        </div>
    );
};

export default ProductsDetails;