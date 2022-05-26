import React from "react";
import './CheckoutProduct.css';
import foto  from './canta.jpg';
import { useStateValue } from "./StateProvider";


const CheckoutProduct = ({id,rating,title,image,price}) => {

    const [{basket}, dispatch] = useStateValue();
    
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:id,
        });
    };


    return (

        
    <div className='CheckoutProduct ' >

        <img src={image} alt="İmage" className="checkoutProduct__image" />
        <div className="checkoutProduct__info" >
            <p className="checkoutProduct__title">
                {title}
            </p>

            <p className="checkoutProduct__price">
                <small>$</small>
                <strong>  {price} </strong>
            </p>

            <div className="checkoutProduct__rating">
            { Array(rating).fill().map( (_,i)=>(
                        <p>⭐</p>
                    ))}
            </div>
            <button onClick={removeFromBasket}>Remove from Basket</button>

        </div>
        
    </div>
    )

}

export default CheckoutProduct;