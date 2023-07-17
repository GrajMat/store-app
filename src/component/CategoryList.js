import { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import ProductDataService from '../services/products';
import { useDispatch } from 'react-redux';
import Media from 'react-media'

import { getProducts } from '../redux/productSlice';


const CategoryList = (props) => {

    const { skip, limit } = props
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

        ProductDataService.findByCategory(skip, limit, category)
            .then(response => {
                dispatch(getProducts(response.data))
            })
            .catch(e => {
                console.log(e)
            })


    }

    useEffect(() => {
        retriveCategories()
    }, [])

    const categories = categoryList.map((item, id) => {
        if (item === activeItem) {
            return (

                <ListGroup.Item
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
                    style={{ cursor: "pointer" }}
                    key={id}
                    onClick={searchOnCategory}
                    name={item}
                    variant="light"
                >
                    {item}
                </ListGroup.Item>
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
                    null
            }

        </Media>
    );
}

export default CategoryList;