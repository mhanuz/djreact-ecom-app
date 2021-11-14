import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
import  Axios  from 'axios';
import { domain } from '../env';
import SingleProduct from './SingleProduct';
const CategoryProducts = () => {
    const {id} = useParams()
    const [category,setCategory] = useState(null)
    useEffect(() => {
        const getcategoryproduct= async()=>{
            await Axios({
                method:"GET",
                url:`${domain}/api/category/${id}/`
            }).then(response=>{
                setCategory(response.data[0])
        })
            
        }
        getcategoryproduct()
    }, [])

    return (
        <div className="container">
            <h2>{category?.title} products list</h2>
            <hr></hr>
            <div className="row">
                {
                    category !=null && 
                    category.category_product?.map((category,i)=>
                    <div className="col-md-3 my-3" key={i}>
                        <SingleProduct item={category} />
                    </div>
                    
                    )
                    
                }
            </div>
        </div>
    );
};

export default CategoryProducts;