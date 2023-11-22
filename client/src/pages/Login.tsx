import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useContext, useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import placeholder_avatar from '../img/placeholder_avatar.png'
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useForm } from "../service/hooks";
import { useMutation } from '@apollo/client';
import {gql} from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            user {
                username
            }
            token
        }
    }
`;

function Login(props) {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);



    const { onChange, values } = useForm({
        username: '',
        password: '',
    });

    const validateForm = (event) => {
        event.preventDefault();
    
        const errors = [];
        // Ideally neither of these errors will appear due to the HTML5 required attribute, but it's good to have a backup
        if (!values.username) {
            errors.push('Username is required');
        }
    
        if (!values.password) {
            errors.push('Password is required');
        }
    
        console.log('Validation Errors:', errors);
    
        if (errors.length === 0) {
            login();
        } else {
            // Display validation errors using the toast
            errors.forEach(error => {
                toast.current?.replace({ severity: 'error', summary: 'Error Message', detail: error });
            });
        }
    };

    const [login, { loading }] = useMutation(LOGIN, {
        update(proxy, { data: {login: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({graphQLErrors}) {
            setErrors(graphQLErrors)
        },
        variables: {username: values.username, password: values.password}
    });
    const toast = useRef<Toast>(null);
    const showForgotPassword = () => {
        toast.current?.replace({severity: 'info', summary: 'Forgot password', detail: '✨No worries, you can just make a new account!✨'});
    }
    return (
            <>
            <Toast ref={toast} data-testid="loginToast"/>
                <div className="flex align-items-center justify-content-center">
                    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                        <div className="text-center mb-5">
                            <Avatar image={placeholder_avatar} size="xlarge" shape="circle"/>
                            <div className="text-900 text-3xl font-medium mb-3">Welcome Back!</div>
                            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                            <Link to="../create-account" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
                        </div>
                        <form onSubmit={validateForm}>
                        <div className="card flex justify-content-center w-full mb-2">
                                        <span className="p-float-label w-full mb-3">
                                            <InputText required={true} type="username" name="username" id="username" className="w-full mb-3" onChange={onChange} data-testid="loginUsername"/>
                                            <label id="usernameLabel" htmlFor="username">Username</label>
                                        </span>
                                    </div>
                                    <div className="card flex justify-content-center w-full mb-2">
                                        <span className="p-float-label w-full mb-3 card flex">
                                            <InputText aria-labelledby="passwordLabel" required={true} name="password" type="password" id="password" className="w-full mb-3" onChange={onChange} data-testid="loginPassword"/>
                                            <label id="usernameLabel" htmlFor="password">Password</label>
                                        </span>
                                    </div>
                            <div className="flex align-items-center justify-content-between mb-6">
                                <a href="javascript:undefined;" onClick={showForgotPassword} className="font-medium no-underline text-blue-500 cursor-pointer" data-testid="loginForgotPassword">Forgot your password?</a>
                            </div>
                            {errors.map(function(error){
                            return (
                                <>  
                                    {setErrors([...new Set(errors)])};
                                    {toast.current?.replace({ severity: 'error', summary: 'Error Message', detail: error.message })};
                                    {setErrors([])};
                                </>
                            )
                            })}
                            <Button type="submit" label="Sign In" icon="pi pi-user" className="w-full" data-testid="loginSubmit"/>
                        </form>
                    </div>
                </div>
            </>
    )
}



export default Login;
    