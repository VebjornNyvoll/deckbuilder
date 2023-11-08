import { Menubar } from 'primereact/menubar';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


export default function Navbar() {
    const navigate = useNavigate();
    const {user, logout} = useContext(AuthContext);
    const onLogout = () => {
        logout();
        navigate('/');
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/'); }
            
        },
        {
            label: 'Decks',
            icon: 'pi pi-fw pi-database',
            command: () => { navigate('/decks'); }
            
        },
        {
            label: user ? 'Logout' : 'Login',
            icon: 'pi pi-fw pi-user',
            command: () => { user ? onLogout() : navigate('/login'); },
        },
    ];
    // console.log(user);
    return (
        <div className="card relative z-2">
            <Menubar
                model={items}
                pt={{
                    action: ({ props, state, context }) => ({
                        className: context.active ? 'bg-primary-200 border-round-sm' : undefined
                    })
                }}
            />
        </div>
    )
}