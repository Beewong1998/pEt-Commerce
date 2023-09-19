import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery, Slider } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";
import { styled } from "@mui/material/styles";
import { shades } from "../../theme";
import PriceSlider from "./PriceSlider";

const ShopPage = () => {
    
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

    function valuetext(value) {
        return {value};
      }

    const CustomSlider = styled(Slider)(({ theme }) => ({
        color: shades.secondary[500], //color of the slider between thumbs
        "& .MuiSlider-thumb": {
            backgroundColor: shades.secondary[500] //color of thumbs
        },
        "& .MuiSlider-rail": {
            color: shades.secondary[500] ////color of the slider outside the area between thumbs
        }
        }));

    return (
        <>
            <Box width="100%" margin="120px 0" display="flex">
                <Box width="20%" maxHeight="900px" display="flex" flexDirection="column" position="fixed">
                    <Typography variant="h3" textAlign="center" mt="91px">
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
                        <Tab label={(<Typography variant="h3">DOGS</Typography>)} value="dogItems" />
                        <Tab label={(<Typography variant="h3">CATS</Typography>)} value="catItems" />
                        <Tab label={(<Typography variant="h3">RABBITS</Typography>)} value="rabbitItems" />
                        <Tab label={(<Typography variant="h3">BIRDS</Typography>)} value="birdItems" />
                    </Tabs>
                    {/* Price Filter */}
                    <Typography variant="h3" textAlign="center" mt="91px">
                        <b>Price Filter</b>
                    </Typography>
                    <Box margin="25px 40px">
                        <PriceSlider />                
                        {/* <CustomSlider
                            aria-label="Always visible"
                            defaultValue={15}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="on"
                            size="small"
                            max={20}
                            onChange={console.log(valuetext)}
                            /> */}
                    </Box>
                </Box>
                <Box width="80%" position="relative" left="20%">
                    <Typography variant="h1" textAlign="center" mb="35px">
                        Category: <b>{categoryName()}</b>
                    </Typography>
                    <Box   //images go into this grid
                        margin="0 auto"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fill, 300px)"  //each column will be 300px and it will be auto filled will as many pictures as possible depending on space
                        justifyContent="space-around"
                        rowGap="50px"
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
        </>
    );
};

export default ShopPage;