'use client';
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ pt: 6, pb: 3, textAlign: "center" }}>
            <Typography>
                © {new Date().getFullYear()} All rights reserved by{" "}
                {/* <Link to="https://www.wrappixel.com"> */}
                    <Typography color='primary.main' component='span'>
                        Se0nghyun</Typography>
                {/* </Link>{" "} */}
            </Typography>
        </Box>
    );
};

export default Footer;
