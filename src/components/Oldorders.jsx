import Axios from 'axios';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { domain, header } from '../env';


const Oldorders = () => {
    const [reload,setReload] = useState(null)
    const [orders,setOrders] =  useState(null)
    useEffect(() => {
        const getorders=async()=>{
            await Axios({
                method:"GET",
                url:`${domain}/api/orders/`,
                headers:header
            }).then(response=>{
                setOrders(response.data)
             })
        }
        getorders()
    }, [reload])

    const deleteOrder=async(id)=>{
        await Axios({
            method:"DELETE",
            url:`${domain}/api/orders/${id}/`,
            headers:header
        }).then((response)=>
            setReload(response.data)
        
        )
    }

    return (
        <div className="container">
            <h1>--Order History--</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Total</th>
                        <th>Product</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.length !==0?
                        orders?.map((order,i)=>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>TK. {order.total}</td>
                                <td>{order?.cartproducts?.length}s</td>
                                <td>{order?.orderstatus}</td>

                                <td>
                                    <Link className="btn btn-info" to={`/orderdetails/${order?.id}`}>Details</Link>
                                </td>

                                <td>
                                    <button onClick={()=>deleteOrder(order?.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        
                        ):(<div>
                            <h3>No orders available here</h3>
                            <Link className="/">GO TO HOME</Link>
                        </div>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Oldorders;
