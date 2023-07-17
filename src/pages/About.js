import { Stack } from "react-bootstrap";

const About = () => {
    return (
        <Stack >
            Simple-shop-app is a front-end application created by Mateusz Grajko using React, Redux-toolkit, React-Router and React-bootstrap.
            <br />
            The application allows you to search for products by title, or by category and also add and remove them from the shopping cart. Application uses an external api from https://jsonplaceholder.typicode.com/
            <br></br>
            <br />
            Thanks for stopping by.
        </Stack>
    );
}

export default About;