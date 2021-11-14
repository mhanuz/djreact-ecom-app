import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import { domain, header } from '../env';
import { useParams } from 'react-router';
const OrderDetails = () => {
    const {id} = useParams()
    const [orderDetails,setOrderDetails] = useState()
    useEffect(() => {
        const getorder = async()=>{
            await Axios({
                method:"GET",
                url:`${domain}/api/orders/${id}/`,
                headers:header
            }).then(response=>{
                console.log(response.data.data[0].cart.total);
                setOrderDetails(response.data["data"][0])
            })
        }
        getorder()
    }, [])
    return (
        <div>
            <h1> Order Details Page</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Discount</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetails !==null &&
                            <tr>
                                <td>{orderDetails?.date}</td>
                                <td>{orderDetails?.total}</td>
                                <td>{orderDetails?.email}</td>
                                <td>{orderDetails?.mobile}</td>
                                <td>{orderDetails?.discount}%</td>
                                <td>{orderDetails?.cart_products?.length}</td>
                            </tr>
                        }
                        
                    </tbody>
                </table>
                <h1>Product Details</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetails?.cart_products?.map((product,i)=>
                            <tr key={i}>
                                <td>{product.id}</td>
                                <td>{product.product[0].title}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.subtotal}</td>
                            </tr>

                            )
                        }
                        <tr>
                            <td  colspan="3"></td>
                            <td> Total:</td>
                            <td> ${orderDetails?.cart.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;