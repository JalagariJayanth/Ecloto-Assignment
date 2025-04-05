import { useEffect, useState } from 'react'

import './App.css'
import Product from './Product';


const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0,quantity : 1};

// price * quantity 
// { id: 4, name: "Smartwatch", price: 150,quantity:2},
// 300 / 1000 * 100 = 30%

function App() {
   const [cartItems,setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  
   const subTotal = cartItems.reduce((acc,curr) => acc+ curr.price * curr.quantity,0);
   const progress = (subTotal/ 1000) * 100

  //  console.log(progress,subTotal)
  

   useEffect(() => {
       const gift = cartItems.some((each) => each.id === FREE_GIFT.id)
      if(subTotal >= 1000 && !gift){
        setCartItems((prevItems) => [...prevItems,FREE_GIFT])
      }

   },[subTotal])

   useEffect(() => {
      localStorage.setItem('cartItems',JSON.stringify(cartItems))
   },[cartItems])

   const AddtoCart = (product) => {
        setCartItems((prevItems) => {
          const isPresent = prevItems?.find((item) => item.id === product.id);
          if(isPresent){
             return prevItems.map((item) => (
              item.id === product.id ? {...item,quantity:item.quantity+1} : item
             ))
          }else{
            return [...prevItems,{...product,quantity:1}]
          }
        })
   }

   const handleIncreaseItem = (id) => {
      setCartItems((prevItems) => {
        return prevItems.map((item) => (
          item.id === id ? {...item,quantity:item.quantity+1} :item
         ))
      })
   }
   
   const handleDecreaseItem= (id) => {
    setCartItems((prevItems) => {
      return prevItems.map((each) => (
        each.id === id ? {...each,quantity:each.quantity -1} : each
      )).filter((each) => each.quantity > 0)
    })
   }



  return (
    <div className='MainContainer'>
      <h1 className='heading'>Shopping Cart</h1>
      <h2 className='subHeading'>Products</h2>
      <div className='productsContainer'>
         {PRODUCTS?.map((each) => (
          <Product key={each.id} productDetails = {each} AddtoCart={AddtoCart} />
         ))}
      </div>

      <h2 className='subHeading'>Cart Summary</h2>
      <div className='summaryMainContianer'>
          <div className='topSummary'>
             <p>Subtotal :</p>
             <p> $ {subTotal}</p>
          </div>
          <hr />
          <div className='giftContainer'>
            <p>
            {subTotal >= 1000 ?
             "You got a free Wireless Mouse!"
             :
             `Add ${1000-subTotal} more to get FREE Wireless Mouse!`
            } </p>
          
          <div className='progressbarOuter'>
             <div style={{width:`${progress}%`}} className='progressbarInner'>

             </div>
          </div>
          </div>
      </div>

      <div className='cartButton'>
      <h2 className='subHeading'>Cart Items</h2>
      <button onClick={() => setCartItems([])} className='ClearButton'>Clear</button>
      </div>
     
      {cartItems.length === 0 ? 
       
         <div className='EmptyCartContainer'>
            <p>Your Cart is empty</p>
            <p>Add some products to see them here !</p>
         </div>
       :
       <div>
        {cartItems?.map((eachItem) => (
        <div key={eachItem.id} className='MainCartContainer'>
            <div>
               <p>{eachItem.name}</p>
               <p>${eachItem.price} * {eachItem.quantity} = $ {eachItem.price * eachItem.quantity}</p>
            </div>
            {eachItem.id !== FREE_GIFT.id ? 
             <div className='buttons'>
             <button className='removeButton' onClick={() => handleDecreaseItem(eachItem.id)}>-</button>
              
               <p>{eachItem.quantity}</p>
               <button className='addButton' onClick={() => handleIncreaseItem(eachItem.id)}>+</button>
             </div>
             :
             <div className='freegift'>
<p>Free Gift</p>
             </div>
            
            }
           
          </div>
      ))}
       </div>
    
    }
      
    </div>
  )
}

export default App
