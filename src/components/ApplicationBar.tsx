import { AppBar, Toolbar, Typography } from "@mui/material";

const ApplicationBar = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography 
                    variant="h5" 
                    component="div" 
                    textAlign="center"
                    width="100%"
                >
                    Stock Movement Forecaster App with Complaint Analysis
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;
