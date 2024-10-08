import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { store } from "../../GlobalData/store"
import '../ComponentCss/Login.css';
import { useStore } from '../../StoreProvider';


export const LoginComponent:React.FC = () => {


    const { loggedInUser, setLoggedInUser } = useStore();

    const [user,setUser] = useState({
        "username":"",
        "password":""

    }); 
    
    


    const navigate = useNavigate();

    const storeValues = (input:any) => {
 
 
        if(input.target.name === "username"){
            setUser((user) => ({...user, username:input.target.value}))
        } else {
            setUser((user) => ({...user, password:input.target.value}))
        }



 
    }

    const login = async () => {

        //TODO: We should validate user input here AND on the backend 

        //use the username/password in state to send a POST to the java server
        //NOTE: with credentials is what lets us send/save user session info
        const response = await axios.post("http://localhost:8080/auth/login", user, {withCredentials:true})
        .then(
            (response) => {

                console.log(response.data)

                //Save the incoming user data in our global state (store.ts in the globalData folder)
                store.loggedInUser = response.data
                localStorage.setItem('loggedInUser', JSON.stringify(response.data))


                alert("Welcome, " + store.loggedInUser.username)

                //depending on the user's role value, send them to one of two components
                if(response.data.role === "employee"){
                    //use our useNavigate hook to switch views to the Car Container Component
                    navigate("/reimbursement")
                } 

                if(response.data.role === "manager"){
                    navigate("/employee")
                }
                
            }
        )
        .catch(
            (error) => {
                console.log(error)
                alert("Login failed!")
            }
        )



 

    }


    return(
        <Container>
            <div >
                <div className="text-container">
                    <h1>Log In</h1>
                    <div className="input-container">
                        <input type="text" placeholder="username" name="username" onChange={storeValues}/>
                    </div>

                    <div className="input-container">
                        <input type="password" placeholder="password" name="password" onChange={storeValues}/>
                    </div>

                    <Button className="login-button" variant="dark" onClick={login}>Login</Button>
                    <Button className="login-button" variant="dark" onClick={() => navigate("/register")}>Create Account</Button>

                </div>

            </div>
        </Container>

    )
}