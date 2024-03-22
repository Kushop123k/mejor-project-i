import styled from "@emotion/styled";
import { FormControl, FormGroup, InputLabel, Input, TextField, Typography ,Button, Styled} from "@mui/material";
const Container= styled(FormGroup)`
width:50%;
margin:5% auto 0 auto;
&>div{
    margin-top:20px
}`
const Register=()=>{
    return(
        //<p>Hello Register</p>
        <Container>
            <Typography variant="h3">Add User</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
               <Input/>
            </FormControl>
            <FormControl>
                <InputLabel>Email </InputLabel>
                <Input/>
            </FormControl>
            <FormControl>
                <InputLabel>Phno</InputLabel>
                <Input />
            </FormControl>
            <FormControl>
            <TextField id="outlined-password-input"
             label="Password"
            type="password"
            autoComplete="current-password"/>
         </FormControl>
         <FormControl>
         <Button variant="contained">AddUser</Button>
         </FormControl>
        </Container>
    )
}
export default Register;