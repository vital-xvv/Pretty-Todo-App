import React from 'react';
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import {makeStyles} from "@mui/styles";
import {ListItem, ListItemText, List, ListItemIcon, Box, Avatar} from "@mui/material";
import {AddCircleOutlined, SubjectOutlined} from "@mui/icons-material";
import {useHistory, useLocation} from "react-router-dom"
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import {format} from 'date-fns';
import Container from "@mui/material/Container";
import {pink} from "@mui/material/colors";

const drawerWidth = 250;

const styles =  {
    page: {
        background: "#f9f9f9",
        width: "100%",
        height: "100vh",
        padding: "40px"
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper : {
        width: drawerWidth
    },
    root: {
        display: "flex"
    },
    active: {
        backgroundColor: "#f4f4f4"
    },
    title: {
        padding: "16px"
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: {
        height: "50px"
    },
    container: {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    },
    avatar: {
        marginLeft: "10px"
    }
}


const Layout = ({children}) => {
    const history = useHistory();
    const location = useLocation();
    const menuItems = [
        {
            text: "My notes",
            icon: <SubjectOutlined color="primary"/>,
            path: "/"
        },
        {
            text: "Create a note",
            icon: <AddCircleOutlined color="primary"/>,
            path: "/create"
        }
    ]

    const handleClick = (path) => {
        history.push(path);
    }

    return (
        <div style={styles.root}>
            {/*app bar*/}
            <AppBar sx={styles.appbar} elevation={1}>
                <ToolBar >
                    <Typography
                        sx={{flexGrow: 1}}
                        variant="h6"
                    >
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <Typography
                        variant="h6"
                    >
                        Bugs Bunny
                    </Typography>
                    <Avatar src="/public/cat.png" sx={styles.avatar}/>


                </ToolBar>
            </AppBar>
            {/*side drawer*/}
            <Drawer
                size="sm"
                variant="permanent"
                achor="left"
                sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper':
                            {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            },
                    }}
            >
                <Typography
                    variant="h4"
                    sx={styles.title}
                >
                    Notes
                </Typography>
                <List>
                    {
                        menuItems.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => handleClick(item.path)}
                                className={location.pathname === item.path ? styles.active: null}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        ))
                    }

                </List>
            </Drawer>

            <div style={styles.page}>
                <div style={styles.toolbar}></div>
                {children}
            </div>
        </div>

    );
};

export default Layout;