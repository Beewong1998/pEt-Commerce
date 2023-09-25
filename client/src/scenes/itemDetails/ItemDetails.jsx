import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();  //Client Component hook that lets you read a route's dynamic params filled in by the current URL. Lets us extract the itemId from the URL
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    async function getItem() {
        const item = await fetch(
            `https://orca-app-e4rgt.ondigitalocean.app/api/items/${itemId}?populate=image`,
            {method: "GET"}
        );
        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    async function getItems() {   //call the backend to grab the information from our Strapi - grabs all the products and items stored in the backend
        const items = await fetch(
            "https://orca-app-e4rgt.ondigitalocean.app/api/items?populate=image",
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
        <Box
            width="80%"
            m="80px auto"
            pt="30px"
        >
            <Box display="flex" flexWrap="wrap" columnGap="40px"> 
                {/* IMAGES */}
                <Box flex="1 1 40%" mb="40px">
                    <img 
                        alt={item?.name}
                        width="100%"
                        height="100%"
                        src={`https://orca-app-e4rgt.ondigitalocean.app${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                {/* ACTION */}
                <Box flex="1 1 50%" mb="40px">
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <a href="/">Home</a> / <a href="/shopPage">Shop Page</a> / Item</Box>
                    </Box>

                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.attributes?.name}</Typography>
                        <Typography>£{item?.attributes?.price}</Typography>
                        <Typography sx={{ mt: "20px" }}>
                            {item?.attributes?.longDescription}
                        </Typography>
                    </Box>

                    {/* COUNT AND BUTTON */}
                    <Box
                        display="flex" 
                        alignItems="center" 
                        minHeight="50px"
                    >
                        <Box 
                            display="flex" 
                            alignItems="center" 
                            border={`1.5px solid ${shades.neutral[300]}`} 
                            mr="20px" 
                            p="2px 5px"
                        >
                            <IconButton
                                onClick={() => setCount(Math.max(count - 1, 1))}
                            >
                                <RemoveIcon />                                                
                            </IconButton>
                            <Typography sx={{ p: "0 5px"}}>{count}</Typography>
                            <IconButton
                                onClick={() => setCount(count + 1)}
                            >
                                <AddIcon />                                                
                            </IconButton>
                        </Box>
                        <Button
                            sx={{ 
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px"
                            }}
                            onClick={() => dispatch(addToCart({ item: {...item, count}}))}
                        >ADD TO CART
                        </Button>
                    </Box>

                    <Box>

                        <Typography mt="15px">CATEGORIES: {item?.attributes?.category}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px">
                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === "reviews" && (
                    <div>reviews</div>
                )}
            </Box>

            {/* RELATED ITEMS */}
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
}

export default ItemDetails;