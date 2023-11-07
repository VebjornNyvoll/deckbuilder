import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { Avatar } from "primereact/avatar";
import placeholder_avatar from './img/placeholder_avatar.png'
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";


export default function Login(){
const [checked, setChecked] = useState(false);
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [username, setUsername] = useState<string>('');

const toast = useRef<Toast>(null);

    const show = () => {
        toast.current?.show({ severity: 'info', summary: 'Terms of Service', detail: 'Man skal ikke plage andre, man skal være grei og snill, og for øvrig kan man gjøre hva man vil.' });
    };

return(
<>
<Navbar/>

<div className="flex align-items-center justify-content-center">
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <Avatar image={placeholder_avatar} size="xlarge" shape="circle"/>
            <div className="text-900 text-3xl font-medium mb-3">Welcome to Deckbuilder!</div>
            <span className="text-600 font-medium line-height-3">Already have an account?</span>
            <Link to="../login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Log in here!</Link>
        </div>
        <form>
            <div className="card flex justify-content-center w-full mb-2">
                <span className="p-float-label w-full mb-3">
                    <InputText aria-labelledby="emailLabel" required={true} type="email" id="email" className="w-full mb-3" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <label id="emailLabel" htmlFor="email">Email</label>
                </span>
            </div>
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
                    <Checkbox aria-labelledby="rememberMeLabel" required={true} type="checkbox" id="rememberMe" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                    <Toast ref={toast} />
                    <label id="rememberMeLabel" htmlFor="rememberMe">I accept the <a href="javascript:undefined;" onClick={show}>Terms of Service</a></label>
                </div>
            </div>

            <Button label="Create account" icon="pi pi-user" className="w-full" />
        </form>
    </div>
</div>
</>
)
}
    