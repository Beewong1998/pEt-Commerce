import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";

//imports all image from assets folder

const importAll = (r) => 
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});

const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);




const MainCarousel = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")   //isNonMobile is true if screen is above 600px, otherwise it is false
    const navigate = useNavigate();

    //look through react-responsive-carousel documents to see what else you can change
    return (
        <Carousel
            onClickItem={()=>{navigate(`/shopPage`)}}
            useKeyboardArrows={true}
            autoFocus={true}
            autoPlay interval="7000"
            transitionTime="800"
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "2%",
                        color: "black",
                        padding: "5px",
                        zIndex: "10",
                    }}
                >
                    <NavigateBeforeIcon sx={{ fontSize: 40}} />
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "2%",
                        color: "black",
                        padding: "5px",
                        zIndex: "10",
                    }}
                >
                    <NavigateNextIcon sx={{ fontSize: 40}} />
                </IconButton>
            )}
        >
            {Object.values(heroTextureImports).map((texture, index) => (
                <Box key={`carousel-image-${index}`}>
                    <img 
                        src={texture}
                        alt={`carousel-${index}`}
                        style={{
                            width: "100%",
                            height: "750px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed"
                        }}
                    />
                    <Box
                        color="white"
                        padding="40px"
                        borderRadius="8px"
                        textAlign="center"
                        backgroundColor="rgb(0, 0, 0, 0.6)"
                        position="absolute"
                        top="46%"
                        left={isNonMobile ? "15%" : "0"}
                        right={isNonMobile ? undefined : "0"}
                        margin={isNonMobile ? undefined : "0 auto"}
                        maxWidth={isNonMobile ? undefined : "240px"}

                        
                    >
                        <Typography fontWeight="bold" variant="h3" color={shades.secondary[400]}>-- NEW SEASON --</Typography>
                        <Typography variant="h1">NEW DRIP</Typography>
                        <Typography 
                            fontWeight="bold" 
                            color={shades.secondary[400]}
                            // variant="h3" 
                        >
                            Discover More Here
                        </Typography>

                    </Box>
                </Box>
            ))}
        </Carousel>
    )

};

export default MainCarousel;