import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";

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
            "https://orca-app-e4rgt.ondigitalocean.app/api/items?populate=image",
            { method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    };

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
        <Box backgroundColor="white">
        <Box width="80%" margin="-50px auto" padding="80px 0">
            <Typography variant="h2" textAlign="center" paddingTop="30px" id="tabs">
                Our Products
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
                <Tab label="ALL" value="all" href="#tabs" />
                <Tab label="CATS" value="catItems" href="#tabs" />
                <Tab label="DOGS" value="dogItems" href="#tabs" />
                <Tab label="RABBITS" value="rabbitItems" href="#tabs"/>
                <Tab label="BIRDS" value="birdItems" href="#tabs" />
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
        </Box>
    );
};


export default ShoppingList;