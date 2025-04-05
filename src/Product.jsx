

const Product = ({productDetails,AddtoCart}) => {


    const handleAddToCart = () => {
        AddtoCart(productDetails)
    }

    return(
        <div style={{backgroundColor:'white',borderRadius:'20px',width:"150px",padding:'15px'}}>
            <p style={{marginTop:'2px',fontFamily:'Roboto',fontWeight:'600'}}>{productDetails.name}</p>
            <p>$ {productDetails.price}</p>
            <button onClick={handleAddToCart} style={{backgroundColor:'blue',border:'none',outline:'none',padding:'10px',color:'white',borderRadius:'5px',width:'90%',fontSize:'15px'}}>Add to Cart</button>
        </div>
    )
}

export default Product;