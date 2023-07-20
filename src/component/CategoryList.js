import { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import ProductDataService from '../services/products';
import { useDispatch } from 'react-redux';
import Media from 'react-media'

import { getProducts } from '../redux/productSlice';


const CategoryList = (props) => {

    const { limit, setSkip, setCurrentPage } = props
    const [categoryList, setCategoryList] = useState([])
    const [activeItem, setActiveItem] = useState("All products")

    const dispatch = useDispatch()




    const retriveCategories = () => {
        ProductDataService.getCategories()
            .then(response => {
                setCategoryList(['All products'].concat(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }


    const searchOnCategory = (e) => {
        const category = e.target.textContent
        setActiveItem(category)
        setCurrentPage(0)
        setSkip(() => {
            const newSkip = 0
            ProductDataService.findByCategory(newSkip, limit, category)
                .then(response => {
                    dispatch(getProducts(response.data))
                })
                .catch(e => {
                    console.log(e)
                })

            return newSkip
        })


    }

    useEffect(() => {
        retriveCategories()
    }, [])

    const categories = categoryList.map((item, id) => {
        if (item === activeItem) {
            return (

                <ListGroup.Item
                    className='m-1'
                    style={{ cursor: "pointer" }}
                    key={id}
                    onClick={searchOnCategory}
                    name={item}
                    active
                    variant="light"

                >
                    {item}
                </ListGroup.Item>

            )
        } else {
            return (
                <ListGroup.Item
                    className='m-1'

                    style={{ cursor: "pointer" }}
                    key={id}
                    onClick={searchOnCategory}
                    name={item}
                    variant="light"
                >
                    {item}
                </ListGroup.Item >
            )
        }
    })


    return (
        <Media query="(min-width: 768px)">
            {
                matches => matches ?
                    <ListGroup>
                        {categories}
                    </ListGroup>
                    :
                    <ListGroup horizontal className='flex-wrap'>
                        {categories}
                    </ListGroup>
            }

        </Media>
    );
}

export default CategoryList;