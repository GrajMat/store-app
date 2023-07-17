import { Offcanvas, OffcanvasBody, Stack } from "react-bootstrap";
import CartItem from "./CartItem"
import { useSelector } from 'react-redux'
import formatCurrency from "../utilities/formatCurrency";

const ShoppingCart = ({ isOpen, closeCart }) => {

    const { cartItems } = useSelector(state => state.cartItems)

    const getTotalPrice = () => {
        let totalPrice = 0;
        if (cartItems.length > 0) {
            cartItems.forEach(i => {
                totalPrice = totalPrice + (i.quantity * i.price)
            })
        }
        return formatCurrency(totalPrice)
    }
    const totalPrice = getTotalPrice()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <OffcanvasBody>
                <Stack gap={3}>
                    {cartItems.length > 0 ? cartItems.map(item => <CartItem key={item.id} {...item} />) : null}
                    <div className="ms-auto fw-bold fs-5">Total: {totalPrice}</div>
                </Stack>

            </OffcanvasBody>
        </Offcanvas>
    );
}

export default ShoppingCart;