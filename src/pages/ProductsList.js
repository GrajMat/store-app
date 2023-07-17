import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from "../redux/productSlice";

import ProductCart from "../component/ProductCart";
import CategoryList from "../component/CategoryList";
import ProductDataService from '../services/products'

import { Button, Col, FormControl, InputGroup, Row, Stack } from "react-bootstrap"

const ProductsList = () => {

    const { products, total } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [limit, setLimit] = useState(15)
    const [skip, setSkip] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")

    const getAllProducts = () => {

        ProductDataService.getProducts(skip, limit, searchQuery)
            .then(response => {
                dispatch(getProducts(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }

    const onChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value)
    }



    useEffect(() => {
        getAllProducts()
        // eslint-disable-next-line
    }, [limit, skip, searchQuery])




    const switchPage = (e) => {
        const switchType = e.target.name

        if (switchType === "next" && (skip + limit) < total) {
            setSkip(skip + limit)
            setCurrentPage(currentPage + 1)
        }
        else if (switchType === "prev" && skip !== 0) {
            setSkip(skip - limit)
            setCurrentPage(currentPage - 1)

        }
    }

    const setPage = (e) => {
        const pageNr = Number(e.target.name)
        if (pageNr === 1) {
            setSkip(0)
        }
        else {
            setSkip(limit * (pageNr - 1))
        }
        setCurrentPage(pageNr - 1)
    }

    const getPagination = () => {
        let pagination = []
        for (let i = 1; i <= Math.ceil(total / limit); i++) {
            if (i === currentPage + 1) {
                pagination.push(<Button key={i} >{i}</Button>)
            } else {
                pagination.push(<Button variant="outline-secondary" onClick={setPage} name={i} key={i} >{i}</Button>)

            }
        }
        return pagination
    }


    return (
        <>
            <Row>
                <Col lg={2} md={3} className="pb-2" >
                    <Stack gap={2}>
                        <InputGroup gap={2}>
                            <FormControl type="email" name="search" onChange={onChangeSearchQuery} value={searchQuery} />
                            <Button onClick={getAllProducts}>
                                <svg class="feather feather-search" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>

                            </Button>
                        </InputGroup>
                        <CategoryList skip={skip} limit={limit} setCurrentPage={setCurrentPage} setLimit={setLimit} setSkip={setSkip} />

                    </Stack>

                </Col>
                <Col >
                    <Row xl={3} lg={2} xs={1} >

                        {products.map((product, id) => (
                            <Col key={product.id}>
                                <ProductCart {...product} />
                            </Col>
                        ))}

                    </Row>
                    <Row >
                        <Stack className="p-2 " direction="horizontal" gap={1}>
                            {currentPage === 0
                                ?
                                <Button disabled name="prev">prev</Button>
                                :
                                <Button onClick={switchPage} name="prev"> prev </Button>
                            }
                            {getPagination()}
                            {currentPage + 1 < Math.ceil(total / limit)
                                ?
                                <Button onClick={switchPage} name="next" >next</Button>
                                :
                                <Button disabled name="next" >next</Button>

                            }


                        </Stack>
                        <div style={{ textAlign: "center" }}>Total results: {total}</div>


                    </Row>
                </Col >

            </Row >






            {/* <div div className="mainProductsContent">



                    <div>
                        <p>page: <span>{currentPage + 1}</span></p>
                        <button onClick={switchPage} name="prev">prev</button>
                        <button onClick={switchPage} name="next">next</button>
                        <p>Total results: {total}</p>

                    </div>
                </div>

             */}


        </>

    );
}

export default ProductsList
    ;