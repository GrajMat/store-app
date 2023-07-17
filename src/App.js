import { Routes, Route } from "react-router-dom"

import ProductsList from "./pages/ProductsList";

import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./component/NavBar";
import ShoppingCart from "./component/ShoppingCart";

import { useState } from "react";

function App() {

    const [isOpen, setIsOpen] = useState(false)
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    return (
        <>
            <NavBar openCart={openCart} />
            <Container>
                <ShoppingCart isOpen={isOpen} closeCart={closeCart} />
                <main>
                    <Routes>
                        <Route path="/store" element={<ProductsList />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />

                    </Routes>
                </main>

            </Container>
        </>

    );
}

export default App;
