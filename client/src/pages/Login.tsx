import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Avatar } from "primereact/avatar";
import placeholder_avatar from '../img/placeholder_avatar.png'
import { Link, useNavigate } from "react-router-dom";
import {gql, useMutation} from '@apollo/client';


const LOGIN = gql`
    mutation SubmitLogin($username: String!, $password: String!){
        login(username: $username, password: $password){
            token
        }
    }
`;

function SubmitLogin({ username, password }: { username: string, password: string }) {
    const [login] = useMutation(LOGIN);
    const navigate = useNavigate();
    login({ variables: { username, password } });
    // if (localStorage.getItem('token') !== null) {
    //     window.location.href = '/decks';
    // }
    navigate("/decks");
}

export default function Login(){
const [checked, setChecked] = useState(false);
const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');



return(
<>
    <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="text-center mb-5">
                <Avatar image={placeholder_avatar} size="xlarge" shape="circle"/>
                <div className="text-900 text-3xl font-medium mb-3">Welcome Back!</div>
                <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                <Link to="../create-account" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
            </div>
            <form onSubmit={e => {
          e.preventDefault();
          SubmitLogin({ username: username, password: password }); 
        }}>
                <div className="card flex justify-content-center w-full mb-2">
                    <span className="p-float-label w-full mb-3">
                        <InputText id="usernameLabel" required={true} type="password" id="username" className="w-full mb-3" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                        <label id="usernameLabel" htmlFor="username">Username</label>
                    </span>
                </div>
                <div className="card flex justify-content-center w-full mb-2">
                    <span className="p-float-label w-full mb-3 card flex">
                        <InputText aria-labelledby="passwordLabel" required={true} type="password" id="password" className="w-full mb-3" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        <label id="usernameLabel" htmlFor="password">Password</label>
                    </span>
                </div>
                <div className="flex align-items-center justify-content-between mb-6">
                    <div className="flex align-items-center">
                        <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                        <label htmlFor="rememberme">Remember me</label>
                    </div>
                    <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                </div>

                <Button type="submit" label="Sign In" icon="pi pi-user" className="w-full" />
            </form>
        </div>
    </div>
</>
)
}
    