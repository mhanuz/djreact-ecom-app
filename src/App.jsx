import React,{useEffect} from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import CategoryProducts from './components/CategoryProducts'
import Navbar from './components/Navbar';
import ProductsDetails from './components/ProductsDetails';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import { domain,header,usertoken } from './env';
import { StateProvider } from './components/state/provider';
import Axios from 'axios'
import Cart from './components/Cart';
import Oldorders from './components/Oldorders';
import Order from './components/Order';
import OrderDetails from './components/OrderDetails';
import ProfileDetails from './components/ProfileDetails';

const App = () => {

  //  Gloabal State Profile
  const [{profile,user_image,user_data,pagereload},dispatch]=StateProvider()
  useEffect(() => {
    if(usertoken!== null){
      const getdata =async()=>{
        await Axios({
          method:"GET",
          url:`${domain}/api/profile/`,
          headers:header
        }).then(response=>{
            dispatch({
              type:'add_profile',
              value:response.data["data"]
            })
            
            dispatch({
              type:"add_image",
              value:null
            })

            dispatch({
              type:"user_update",
              value:null
            })
        })
    }
    getdata()
    }
  }, [user_image,user_data,]) //profile,user_image, user_data

//  GLoabal State for Cart Data
  useEffect(() => {
    const getcart=async()=>{
      await Axios({
        method:"GET",
        url:`${domain}/api/cart/`,
        headers:header,
      }).then((response)=>{

            const all_data=[]
            response.data?.map((data,i)=>{
                if(data.complete){
                  all_data.push(data)
                  return dispatch({
                    type:"add_completecartdata",
                    value:all_data
                  })
                  
                }else{
                  return dispatch({
                    type:"add_uncompletecartdata",
                    value:data
                  })
                }
      })

      })
      
    }

    getcart()
  }, [pagereload]) //pagereload,upncompletecartdata

  
  return (
    <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/:id" component={ProductsDetails} />
          <Route exact path="/category/:id" component={CategoryProducts} />
          {
            profile !=null ? (<>
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/oldorder" component={Oldorders} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/profiledetails" component={ProfileDetails} />
              <Route exact path="/orderdetails/:id" component={OrderDetails} />
              

            </>):
            (<>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />

            </>)
          } 
          <Route exact component={HomePage} />
        </Switch>
    </BrowserRouter>
  );
};

export default App;