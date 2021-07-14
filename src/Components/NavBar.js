// FUNCTION COMPONENT 

// import React from "react";

// function NavBar() {
//     return (
//     <>                              
//     <p>Hello from NavBar</p>
//     <p>Helllo</p>
//     </>
//     );
// }

// // <> ki jagah <React.Fragment> bhi use kar sakte hai

// export default NavBar;

// CLASS COMPONENT 

import { AppBar, Toolbar, Typography,IconButton} from "@material-ui/core";
import { Component } from "react";
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import { amber } from "@material-ui/core/colors";

export default class NavBar extends Component {
    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <IconButton>
                        <SportsCricketIcon style = {{color: amber[500]}}></SportsCricketIcon>
                    </IconButton>
                    <Typography variant = 'h5'> Cricket Scores</Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

// export default NavBar;       // uper na likh ke aise bhi likh sakte hai
// By default Typography P tag use karta hai