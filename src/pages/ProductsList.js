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
        (ProductDataService.getProducts(0, limit, searchQuery)
            .then(response => {
                dispatch(getProducts(response.data))
            })
            .catch(e => {
                console.log(e)
            }))
    }

    const onChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value)
    }



    useEffect(() => {
        getAllProducts()
        setCurrentPage(0)
        // eslint-disable-next-line
    }, [limit, /*skip*/, searchQuery])




    const switchPage = (e) => {
        const switchType = e.target.name

        if (switchType === "next" || switchType === "prev") {
            if (switchType === "next" && (skip + limit) < total) {
                setSkip(skip => {
                    const newValue = skip + limit
                    ProductDataService.getProducts(newValue, limit, searchQuery)
                        .then(response => {
                            dispatch(getProducts(response.data))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    return newValue
                })
                setCurrentPage(currentPage + 1)
            }
            else if (switchType === "prev" && skip !== 0) {
                setSkip(skip => {
                    const newValue = skip - limit
                    ProductDataService.getProducts(newValue, limit, searchQuery)
                        .then(response => {
                            dispatch(getProducts(response.data))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    return newValue
                })
                setCurrentPage(currentPage - 1)
            }
        } else {
            const switchType = Number(e.target.name)
            if (switchType === 1) {
                setSkip(() => {
                    const newValue = 0
                    ProductDataService.getProducts(newValue, limit, searchQuery)
                        .then(response => {
                            dispatch(getProducts(response.data))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    return newValue
                })

            }
            else {
                // setSkip(limit * (switchType - 1))
                setSkip(skip => {
                    const newValue = limit * (switchType - 1)
                    ProductDataService.getProducts(newValue, limit, searchQuery)
                        .then(response => {
                            dispatch(getProducts(response.data))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                    return newValue
                })

            }
            setCurrentPage(switchType - 1)
        }

    }

    // const setPage = (e) => {
    //     const pageNr = Number(e.target.name)
    //     if (pageNr === 1) {
    //         setSkip(0)

    //     }
    //     else {
    //         setSkip(limit * (pageNr - 1))

    //     }
    //     setCurrentPage(pageNr - 1)
    // }

    const getPagination = () => {
        let pagination = []
        for (let i = 1; i <= Math.ceil(total / limit); i++) {
            if (i === currentPage + 1) {
                pagination.push(<Button key={i} >{i}</Button>)
            } else {
                pagination.push(<Button variant="outline-secondary" onClick={switchPage} name={i} key={i} >{i}</Button>)

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
                                <svg className="feather feather-search" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>

                            </Button>
                        </InputGroup>
                        <CategoryList skip={skip} limit={limit} setCurrentPage={setCurrentPage} setLimit={setLimit} setSkip={setSkip} total={total} />

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
                        <Stack className="p-2 flex-wrap" direction="horizontal" gap={1}>
                            {
                                currentPage === 0
                                    ?
                                    <Button disabled name="prev">prev</Button>
                                    :
                                    <Button onClick={switchPage} name="prev"> prev </Button>
                            }
                            {getPagination()}
                            {
                                currentPage + 1 < Math.ceil(total / limit)
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



        </>

    );
}

export default ProductsList
    ;