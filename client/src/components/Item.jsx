//This is in components as it is being reused many times

import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {     //the item will be the object that comes from the backend. item and width means props.item and props.width which we pass in
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);   //represents number of items we will add to the cart
    const [isHovered, setIsHovered] = useState(false);   //represents if the user has their mouse hovered over an item
    const { 
        palette: { neutral },
    } = useTheme();

    const { category, price, name, image } = item.attributes;
    const {   //destructuring
        data: {
            attributes: {
                formats: {
                    medium: { url },     // url stands for image(items.attributes as destructured above).data.attributes.formats.medium.url (it is how Strapi formats it)
                }
            }
        }
    } = image;

    return (
        <Box width={width}>
            <Box 
                position="relative" 
                onMouseOver={() => setIsHovered(true)} 
                onMouseOut={() => setIsHovered(false)}
            >
                <img 
                    alt={item.name}
                    width="300px"
                    height="400px"
                    src={`http://localhost:1337${url}`}
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{ 
                        cursor: 'pointer',
                        objectFit: 'cover'}}
                />
                <Box
                    display={isHovered ? "block" : "none"}
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >
                    <Box display="flex" justifyContent="center">
                        {/* AMOUNT */}
                        <Box 
                            display="flex" 
                            alignItems="center" 
                            backgroundColor={shades.neutral[100]} 
                            borderRadius="3px"
                        >
                            <IconButton
                                onClick={() => setCount(Math.max(count - 1, 1))}
                            >
                                <RemoveIcon />                                                
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton
                                onClick={() => setCount(count + 1)}
                            >
                                <AddIcon />                                                
                            </IconButton>
                        </Box>

                        {/* BUTTON */}
                        <Button onClick={() => { 
                            dispatch(addToCart({ item: {...item, count}}))
                            }}
                            sx={{ backgroundColor: shades.primary[300], color: "white "}}
                        >
                            Add to Cart
                        </Button>
                    </Box>

                </Box>

            </Box>

            <Box mt="3px">
                <Typography mt="0px">{name}</Typography>
                <Typography fontWeight="bold">£{price}</Typography>
            </Box>

        </Box>
    )

};

export default Item;