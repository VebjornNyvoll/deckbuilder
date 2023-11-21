import { useContext, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";
import { useAppSelector, useAppDispatch } from "../service/hooks";
import { PrimeReactContext } from "primereact/api";
import { useEffect } from "react";


export default function Navbar({
  layout,
  setLayout,
  setFilter,
}: {
  layout: "grid" | "list";
  setLayout: (newLayout: "grid" | "list") => void;
  setFilter: (newFilter: string) => void;
}) {
  // Gets filters from redux store
  const filters = useAppSelector((state) => state.filters);
  // Used to dispatch actions to redux store. See filterSlice.ts for supported actions and their expected
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("")
  const { user, logout } = useContext(AuthContext);
  const page: boolean = true;
  const { changeTheme } = useContext(PrimeReactContext);
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Load dark mode preference from localStorage on component mount
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    // Save dark mode preference to localStorage when it changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Check darkMode on component mount and call changeTheme if true
    if (darkMode) {
      console.log("USEEFFECT: " + darkMode)
      changeTheme?.('lara-light-indigo', 'viva-dark', 'theme-link');
    }
  }, []);

  const onLogout = () => {
    logout();
    navigate("/");
  };
  var dataSaver: boolean = false;
  
  const switchLayout = () => {
    setLayout(layout === "grid" ? "list" : "grid");
  };

  function DataSaver() {
    dataSaver = !dataSaver;
    //Code to turn on datasaverMode 
  }
  function toggleTheme() {      
    console.log("TOGGLETHEME: " + darkMode)
    if (darkMode) {
      setDarkMode(false);
      console.log("setDarkMode(false)");
      changeTheme?.('viva-dark', 'lara-light-indigo', 'theme-link');
      // dispatch({type: 'darkMode/toggle'});
      // console.log("Dark mode is: " + darkMode)
    }
    else {
      setDarkMode(true);
      console.log("setDarkMode(true)");
      changeTheme?.('lara-light-indigo', 'viva-dark', 'theme-link');
      // dispatch({type: 'darkMode/toggle'});
      // console.log("Dark mode is: " + darkMode)
}}

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Decks",
      icon: "pi pi-fw pi-database",
      command: () => {
        navigate("/decks");
      },
    },
    {
      visible: page,
      label: "Filter",
      icon: "pi pi-fw pi-filter",
      items: [
        {
          label: "Cost",
          icon: "pi pi-fw pi-money-bill",
          items: [
            {
              label: "High to low",
              icon: "",
              command: () => {
                setFilter("cost:1")
              }
            },
            {
              label: "Low to high",
              icon: "",
              command: () => {
                setFilter("cost:0")
              }
            },
          ],
        },
        {
          label: "Faction",
          icon: "pi pi-fw pi-prime",
          items: [
            {
              label: "Neutral",
              command: () => {
                setFilter("faction:Neutral")
              }
            },
            {
              label: "Alliance",
              command: () => {
                setFilter("faction:Alliance")
              }
            }
          ],
        },
        {
          label: "Rarity",
          icon: "pi pi-fw pi-box",
          items: [
            {
              label: "Common",
              command: () => {
                setFilter("rarity:Common")
              }
            },
            {
              label: "Rare",
              command: () => {
                setFilter("rarity:Rare")
              }
            },
          ]
        }
      ],
    },
    {
      visible: page,
      label: layout == "grid" ? "List" : "Grid",
      icon: layout == "grid" ? "pi pi-fw pi-list" : "pi pi-fw pi-th-large",
      command: () => {
        switchLayout();
      },
    },
    { //Searchbar
      visible: page,
      template: (
        <InputText placeholder="Search" type="text" className="w-full" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if (e.keyCode === 13){ setFilter("name:"+search)}}}/>
      ),
    },
    { //Profile, swap out for avatar picture at const end, end = {end}
      label: "Profile",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: user ? "Log out" : "Login",
          icon: user ? "pi pi-fw pi-user-minus" : "pi pi-fw pi-user-plus",
          command: () => {
            user ? onLogout() : navigate("/login");
          },
        },
        {
          separator: true,
        },
        {
          label: dataSaver? "Disable data saver" : "Enable data saver",
          icon: "pi pi-fw pi-bolt",
          command: () => {
            DataSaver();
          },
        },
        {
          label: darkMode ? "Light mode" : "Dark mode",
          icon: darkMode ? "pi pi-fw pi-sun" : "pi pi-fw pi-moon",
          command: () => {
            toggleTheme();
          },
        },
      ],
    },
  ];

  return (
    <div className="card relative z-2">
      <Menubar
        model={items.filter((item) => item !== null)}
      />
    </div>
  );
}
