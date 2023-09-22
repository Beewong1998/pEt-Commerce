import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
    PersonOutline,
    ShoppingBagOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; //allows us to go to different URLs
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);   //state with the name of cart, and then the property of cart of that state



 // material ui allows you to pass in css properties directly into the Box component (cannot do it for any other component)
    return (
        <Box   /* creating the outer box for the nav bar */
            display="flex"
            alignItems="center"
            width="100%"
            height="80px"
            backgroundColor="rgba(250,242,231,0.99)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
        >
            <Box   /* creating the inner box for the nav bar */
                width="85%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}  /* clicking uses useNavigate which takes you to the home page */
                    sx={{ 
                        "&:hover": { cursor: "pointer" },
                        fontSize: "25px"}}   /* &:hover takes in whatever the class of Box is and applies the hover styles to that class*/
                    color={shades.secondary[500]}
                >
                    {/* <img src="https://i.imgur.com/NnEEGeo.png" alt="logo" width="170px"/> */}
                    Busy Bee
                </Box>
                <Box   /* creating the box where the icons go */
                    display="flex"
                    justifyContent="space-between"   /* space between and the columnGap to create space between each children component */
                    columnGap="40px"
                    zIndex="2"
                >
                    <IconButton sx={{ 
                        color: "black",
                        height: "50px",
                        width: "50px" }}>
                        <PersonOutline sx={{fontSize: "25px"}}/>
                    </IconButton>

                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px",
                            },
                        }}
                    >
                        <IconButton 
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ 
                                color: "black",
                                height: "50px",
                                width: "50px" }}>
                            <ShoppingBagOutlined sx={{fontSize: "25px"}}/>
                        </IconButton>
                    </Badge>
                </Box>

            </Box>

        </Box>
    );
};

export default Navbar;