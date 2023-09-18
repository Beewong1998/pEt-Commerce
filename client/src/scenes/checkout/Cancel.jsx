import { useEffect, useState } from "react";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";


const Cancel = () => {
 
    const { itemId } = useParams();  //Client Component hook that lets you read a route's dynamic params filled in by the current URL. Lets us extract the itemId from the URL
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);



    async function getItem() {
        const item = await fetch(
            `http://localhost:1337/api/items/${itemId}?populate=image`,
            {method: "GET"}
        );
        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    async function getItems() {   //call the backend to grab the information from our Strapi - grabs all the products and items stored in the backend
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            { method: "GET"}
        );
        const itemsJson = await items.json();
        setItems(itemsJson.data);
    };

    function randomItem() {
        return Math.floor(Math.random()*(items.length-3))
    }

    const otherItemsLowerRange = randomItem();
    const otherItemsUpperRange = otherItemsLowerRange + 4;

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
    <Box m="90px auto" width="80%">
        <Alert severity="error">
            <AlertTitle>Order Cancelled</AlertTitle>
            Your order has been cancelled - {" "}
            <strong>You will not be charged.</strong>
        </Alert>
        <Box mt="50px" width="100%">
                <Typography variant="h3" fontWeight="bold">
                    Other items you may like
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                >
                    {items.slice(otherItemsLowerRange,otherItemsUpperRange).map((item, i) => (
                        <Item key={`${item.name}-${i}`} item={item} />
                    ))}
                </Box>
        </Box>
    </Box>
    )
};

export default Cancel;