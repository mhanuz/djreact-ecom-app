import React,{useEffect,useState} from 'react';
import  Axios  from 'axios';
import { domain } from '../env';
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';
const HomePage = () => {
   const [products,setProducts] = useState(null)
   const [category,setCategory] =useState(null)

    useEffect(() => {
        const getdata=async()=>{
            await Axios({
                method:"GET",
                url:`${domain}/api/product/`,

            }).then((response)=>{
                setProducts(response.data)

            })
        }
        getdata()
    }, [])

    useEffect(() => {
        const getcategory =async()=>{
            await Axios({
                method:"GET",
                url:`${domain}/api/category/`
            }).then(response=>
                setCategory(response.data)
            )
        }
        getcategory()
    }, [])
    const previousProducts = async ()=>{
        await Axios({
            method: "GET",
            url: products?.previous
        }).then(response=>{
            // console.log("Previous", response.data["previous"])
            // console.log("Next", response.data["next"])
            setProducts(response.data)
        })
    }
    const nextProducts = async ()=>{
        await Axios({
            method:"GET",
            url:products?.next
        }).then(response=>{
            // console.log("Previous", response.data["previous"])
            // console.log("Next", response.data["next"])
            setProducts(response.data)
        })
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                        <div className="row">
                        {
                            products != null && 
                            products?.results.map((item,i)=>
                                <div className="col-md-4 my-5" key={i}>
                                    <SingleProduct item={item} />
                                </div>
                                
                              )
                        }
                        </div>
                        <div className="hompage__pagination">
                            {
                                products?.previous != null? (<>
                                    <button onClick={previousProducts} className="btn btn-danger">Previous</button>
                                </>):(<>
                                    <button className="btn btn-danger" disabled>Previous</button>
                                </>)
                            }
                            <div>
                            {
                                products?.next != null? (<>
                                    <button onClick={nextProducts} className="btn btn-success">Next</button>
                                </>):(<>
                                    <button className="btn btn-danger" disabled>Next</button>
                                </>)
                            }
                            
                            </div>
                        </div>
                </div>
                <div className="col-md-3" style={{backgroundColor:"rgba(51,51,0,.5)"}}>
                    <h1 style={{color:"white"}}>All Categories</h1>
                    {
                        category !=null &&
                        category?.map((data, i)=>
                            <div className="my-2" key={i}>
                                <Link className="btn btn-success" to={`category/${data.id}`}>{data.title}</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
    }

export default HomePage;