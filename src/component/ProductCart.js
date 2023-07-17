import { Button, Card } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';

import { increaseCartQuantity, decreaseCartQuantity, removeCartItem } from '../redux/cartSlice'


const ProductCart = ({ id, title, price, thumbnail }) => {

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cartItems)

    let quantity = 0;
    cartItems.map(item => item.id === id ? quantity = item.quantity : null)



    return (

        <Card >
            <Card.Img src={thumbnail} variant="top" height="250px" style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column" style={{ gap: "1rem" }}>
                <Card.Title className="d-flex flex-column align-items-center" >
                    <span className='fs-4'>{title}</span>
                    <span className='text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='d-flex flex-column ' style={{ gap: "0.5rem" }}>
                    {quantity === 0 ?
                        (
                            <Button className="w-100" onClick={() => { dispatch(increaseCartQuantity({ id, price })) }}>Add to cart</Button>
                        )
                        :
                        (
                            <>
                                <div className='d-flex justify-content-center align-items-center' style={{ gap: '1rem' }}>
                                    <Button onClick={() => { dispatch(decreaseCartQuantity(id)) }}>-</Button>
                                    <div ><span className='fs-5'>{quantity}</span> in cart</div>

                                    <Button onClick={() => { dispatch(increaseCartQuantity({ id, price })) }}>+</Button>
                                </div>
                                <div className='d-flex justify-content-center' style={{ gap: '1rem' }}>
                                    <Button onClick={() => { dispatch(removeCartItem(id)) }} variant="danger" size="sm">Remove</Button>
                                </div>
                            </>
                        )

                    }
                </div>
            </Card.Body>
        </Card >


    );
}

export default ProductCart;