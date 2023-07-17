import { Button, Stack } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import formatCurrency from '../utilities/formatCurrency'
import { removeCartItem } from '../redux/cartSlice'

const CartItem = ({ id, quantity }) => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const item = products.find(i => i.id === id)
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: "100px", height: "50px", objectFit: 'cover' }}
                />
                <div className='me-auto'>
                    <div >
                        {item.title}
                        {quantity > 1 && <span className='text-muted' style={{ fontSize: "0.7rem" }}> x{quantity}</span>}
                    </div>
                    <div className='text-muted' style={{ fontSize: "0.8rem" }}>
                        {formatCurrency(item.price)}
                    </div>
                </div>
                <div className='d-flex justify-content-around align-items-center'>
                    {formatCurrency(item.price * quantity)}
                    &nbsp;
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => { dispatch(removeCartItem(item.id)) }}
                    >
                        &times;
                    </Button>
                </div>

            </Stack>

        </>

    );
}

export default CartItem;