import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
    const { palette: { neutral }} = useTheme();
    return (
        <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(20%, 30%, 40%)">
                    <Typography 
                        variant="h4" 
                        fontWeight="bold" 
                        mb="30px" 
                        color={shades.secondary[500]}
                    >
                        Busy Bee
                    </Typography>
                    <div>
                        Welcome to Busy Bee, the place to be for all your styling needs!
                    </div>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        About Us
                    </Typography>
                    <Typography mb="30px">
                        Careers
                    </Typography>
                    <Typography mb="30px">
                        Our Stores
                    </Typography>
                    <Typography mb="30px">
                        Terms & Conditions
                    </Typography>
                    <Typography mb="30px">
                        Privacy Policy
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        Customer Care
                    </Typography>
                    <Typography mb="30px">
                        Help Center
                    </Typography>
                    <Typography mb="30px">
                        Track Your Order
                    </Typography>
                    <Typography mb="30px">
                        Corporate & Bulk Purchasing
                    </Typography>
                    <Typography mb="30px">
                        Returns & Refunds
                    </Typography>
                </Box>

                <Box width="clamp(20%, 25%, 30%">
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        Contact Us
                    </Typography>
                    <Typography mb="30px">
                        <a href="https://www.linkedin.com/in/kin-wong-50a189189/" target="_blank">LinkedIn</a>
                    </Typography>
                    <Typography mb="30px">
                        Email: <a href="mailto:beewong2014@hotmail.com">Beewong2014@hotmail.com</a>
                    </Typography>
                    <Typography mb="30px">
                        07702577398
                    </Typography>
                </Box>
            </Box>
        </Box>
    )

}

export default Footer;