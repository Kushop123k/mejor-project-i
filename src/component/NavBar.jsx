import { AppBar, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SlMagnifier } from "react-icons/sl";

const Header = styled(AppBar)`
width:100%;
background:#111111`
const Tab = styled(NavLink)`
font-size:20px;
margin-right:20px;
color:inherit;
text-decoration:none;
`

const NavBar = () => {
    return (
        <Header position='static'>
            <Toolbar>
                <div style={{"display":"flex","justifyContent":"space-between","width":"100%"}}>
                    <div style={{"display":'flex'}}>
                        <SlMagnifier />
                        <Tab>Hotels On The Go</Tab>
                    </div>
                    <div style={{"display":"flex","gap":10}}>
                        <Tab to='Home'>Home</Tab>
                        <Tab to='add'>AddUser</Tab>
                        <Tab to='view'>ViewUser</Tab>
                        <Tab to='Sing'>SignIn</Tab>
                    </div>

                </div>
            </Toolbar>
        </Header >
    )
}
export default NavBar;