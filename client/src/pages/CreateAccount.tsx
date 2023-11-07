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

const CREATE_USER = gql`
    mutation CreateUser($email: String!, $username: String!, $password: String!){
        createUser(email: $email, username: $username, password: $password){
            email
            username
            token
        }
    }
`;

function CreateAccount(props) {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function createUserCallback() {
        console.log("createUserCallback");
        createUser();
        
    }

    const { onChange, onSubmit, values } = useForm(createUserCallback, {
        email: '',
        username: '',
        password: '',
    });
    
    
    const [ createUser, { loading }] = useMutation(CREATE_USER,{
        update(proxy, { data: {createUser: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({graphQLErrors}) {
            setErrors(graphQLErrors)
        },
        variables: {createUser: values}
    });

    const [checked, setChecked] = useState(false);

    const toast = useRef<Toast>(null);

    const show = () => {
        toast.current?.show({ severity: 'info', summary: 'Terms of Service', detail: 'Man skal ikke plage andre, man skal være grei og snill, og for øvrig kan man gjøre hva man vil.' });
    };
    
    return (
        <>
            <div className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <Avatar image={placeholder_avatar} size="xlarge" shape="circle"/>
                        <div className="text-900 text-3xl font-medium mb-3">Welcome to Deckbuilder!</div>
                        <span className="text-600 font-medium line-height-3">Already have an account?</span>
                        <Link to="../login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Log in here!</Link>
                    </div>
                    
                        <div className="card flex justify-content-center w-full mb-2">
                            <span className="p-float-label w-full mb-3">
                                <InputText aria-labelledby="emailLabel" required={true} name="email" type="email" id="email" className="w-full mb-3" onChange={onChange}/>
                                <label id="emailLabel" htmlFor="email">Email</label>
                            </span>
                        </div>
                        <div className="card flex justify-content-center w-full mb-2">
                            <span className="p-float-label w-full mb-3">
                                <InputText required={true} type="username" name="username" id="username" className="w-full mb-3" onChange={onChange}/>
                                <label id="usernameLabel" htmlFor="username">Username</label>
                            </span>
                        </div>
                        <div className="card flex justify-content-center w-full mb-2">
                            <span className="p-float-label w-full mb-3 card flex">
                                <InputText aria-labelledby="passwordLabel" required={true} name="password" type="password" id="password" className="w-full mb-3" onChange={onChange}/>
                                <label id="usernameLabel" htmlFor="password">Password</label>
                            </span>
                        </div>
                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                <Checkbox aria-labelledby="rememberMeLabel" required={true} type="checkbox" name="rememberMe" id="rememberMe" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                                <Toast ref={toast} />
                                <label id="rememberMeLabel" htmlFor="rememberMe">I accept the <a href="javascript:undefined;" onClick={show}>Terms of Service</a></label>
                            </div>
                        </div>
                        {errors.map(function(error){
                            return (
                                <>
                                <Toast ref={toast} />
                                    {toast.current?.show({ severity: 'error', summary: 'Error Message', detail: error.message })};
                                </>
                            )
                        })}
                        <Button label="Create account" icon="pi pi-user" className="w-full" onClick={onSubmit}/>
                    
                </div>
            </div>
        </>
    )
}

export default CreateAccount;
