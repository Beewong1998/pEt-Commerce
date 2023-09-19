import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";
import { string } from "yup";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() {   //call the backend to grab the information from our Strapi - grabs all the products and items stored in the backend
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            { method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    };

    console.log(typeof(items));

    useEffect(() => {
        getItems();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const dogItems = items.filter(   //items in this case is the items in the cart state
        (item) => item.attributes.category === "dogs"   //returns a new array with items of 'topRated' category
    );
    const catItems = items.filter(   
        (item) => item.attributes.category === "cats"   
    );
    const rabbitItems = items.filter(   
        (item) => item.attributes.category === "rabbits"   
    );
    const birdItems = items.filter(   
        (item) => item.attributes.category === "birds"   
    );

    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none"}}}
                sx={{ 
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap"
                    }
                }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="DOGS" value="dogItems" />
                <Tab label="CATS" value="catItems" />
                <Tab label="RABBITS" value="rabbitItems" />
                <Tab label="BIRDS" value="birdItems" />
            </Tabs>
            <Box   //images go into this grid
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"  //each column will be 300px and it will be auto filled will as many pictures as possible depending on space
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" && items.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "dogItems" && dogItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "catItems" && catItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "rabbitItems" && rabbitItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "birdItems" && birdItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
            </Box>
        </Box>
    );
};


export default ShoppingList;