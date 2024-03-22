import {AppBar,Toolbar,Typography, styled}from '@mui/material';
import { NavLink } from 'react-router-dom';
const Header=styled(AppBar)`
background:#111111`
const Tab=styled(NavLink)`
font-size:20px;
margin-right:20px;
color:inherit;
text-decoration:none;
`

const NavBar=()=>{
    return(
       <Header position='static'>
        <Toolbar>
        <Tab>Hotels On The Go</Tab>
        <Tab></Tab>
        <Tab></Tab>
        <Tab></Tab>
        <Tab to='Home'>Home</Tab>
        <Tab to='add'>AddUser</Tab>
        <Tab to='view'>ViewUser</Tab>
        <Tab to='Sing'>SignIn</Tab>

        </Toolbar>
       </Header>
    )
}
export default NavBar;