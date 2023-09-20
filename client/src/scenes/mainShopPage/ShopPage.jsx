import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, Slider, Stack, TextField } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShopPage = () => {
    
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);

    const [minNum, setMinNum] = useState(0);
    const [maxNum, setMaxNum] = useState(20);
    const minmin = 0;
    const maxmax = 20;
    const [priceRangeValue, setPriceRangeValue] = useState([0, 30]);

    const handlePriceRangeChange = (event, newValue) => {
        setMinNum(newValue[0]);
        setMaxNum(newValue[1]);
        setPriceRangeValue(newValue);
    };

  console.log(priceRangeValue);

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

    const allItems = items.filter( 
        (item) => item.attributes.price >= minNum && item.attributes.price <= maxNum 
    )

    const dogItems = items.filter(   //items in this case is the items in the cart state
        (item) => item.attributes.category === "dogs" && item.attributes.price >= minNum && item.attributes.price <= maxNum 
    );
    const catItems = items.filter(   
        (item) => item.attributes.category === "cats" && item.attributes.price >= minNum && item.attributes.price <= maxNum
    );
    const rabbitItems = items.filter(   
        (item) => item.attributes.category === "rabbits" && item.attributes.price >= minNum && item.attributes.price <= maxNum  
    );
    const birdItems = items.filter(   
        (item) => item.attributes.category === "birds" && item.attributes.price >= minNum && item.attributes.price <= maxNum  
    );

    function categoryName() {
        if (value === "all") {
            return "ALL"
        } else if (value === "dogItems") {
            return "DOGS"
        } else if (value === "catItems") {
            return "CATS"
        } else if (value === "rabbitItems") {
            return "RABBITS"
        } else if (value === "birdItems") {
            return "BIRDS"
        }
    }

    return (
        <>
            <Box 
                width="100%" 
                margin="120px 0" 
                display="flex"
            >
                <Box 
                    width="20%" 
                    maxHeight="900px" 
                    display="flex" 
                    flexDirection="column" 
                    position="sticky" 
                    top="0"
                >
                    <Typography 
                        variant="h3" 
                        textAlign="center" 
                        mt="130px"
                    >
                        <b>Categories</b>
                    </Typography>
                    {/* Category Filter */}
                    <Tabs
                        fullWidth={true}
                        textColor="primary"
                        indicatorColor="none"
                        value={value}
                        onChange={handleChange}
                        centered
                        sx={{ 
                            m: "20px auto",
                            "& .MuiTabs-flexContainer": {
                                flexDirection: "column",
                                alignContent: "center"
                            },
                        }}
                    >
                        <Tab label={(<Typography variant="h3">ALL</Typography>)} value="all" />
                        <Tab label={(<Typography variant="h3">CATS</Typography>)} value="catItems" />
                        <Tab label={(<Typography variant="h3">DOGS</Typography>)} value="dogItems" />
                        <Tab label={(<Typography variant="h3">RABBITS</Typography>)} value="rabbitItems" />
                        <Tab label={(<Typography variant="h3">BIRDS</Typography>)} value="birdItems" />
                    </Tabs>
                    {/* Price Filter */}
                    <Typography 
                        variant="h3" 
                        textAlign="center" 
                        mt="80px"
                    >
                        <b>Price Filter</b>
                    </Typography>
                    <Box margin="30px 50px">
                        <Slider
                            getAriaLabel={() => "Price range"}
                            value={priceRangeValue}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            min={minmin}
                            max={maxmax}
                        />
                        <Stack 
                            direction="row" 
                            justifyContent="space-evenly" 
                            alignItems="center"
                            sx={{ marginTop: "20px"}}
                        >
                            <TextField
                            label="min"
                            type="number"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "90px" }}
                            value={minNum}
                            onChange={(e) => {
                                setMinNum(Number(e.target.value));
                                setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
                            }}
                            />
                            <Typography>-</Typography>
                            <TextField
                            label="max"
                            type="number"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "90px" }}
                            value={maxNum}
                            onChange={(e) => {
                                setMaxNum(Number(e.target.value));
                                setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
                            }}
                            />
                        </Stack>
                    </Box>
                </Box>
                <Box width="80%">
                    <Typography 
                        variant="h1" 
                        textAlign="center" 
                        mb="35px"
                    >
                        Category: <b>{categoryName()}</b>
                    </Typography>
                    <Box   //images go into this grid
                        margin="0 auto"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fill, 300px)"  //each column will be 300px and it will be auto filled will as many pictures as possible depending on space
                        justifyContent="space-around"
                        rowGap="50px"
                        columnGap="1.33%"
                        minHeight="555px"
                    >
                        {value === "all" && allItems.map((item) => (
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
        </>
    );
};

export default ShopPage;