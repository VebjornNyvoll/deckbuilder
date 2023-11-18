import { useContext, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";
import { useAppSelector, useAppDispatch } from "../service/hooks";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

//const { changeTheme } = useContext(PrimeReactContext);

//changeTheme(currentTheme: "string", newTheme: "string", linkElementId: "string", callback: Function)

export default function Navbar({
  layout,
  setLayout,
  setFilter,
}: {
  layout: "grid" | "list";
  setLayout: (newLayout: "grid" | "list") => void;
  setFilter: (newFilter: string) => void;
}) {

  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("")
  const { user, logout } = useContext(AuthContext);
  const page: boolean = true;
  
  

  const onLogout = () => {
    logout();
    navigate("/");
  };
  var datasaver: boolean = false;
  const [darkmode, setTheme] = useState<true | false>(false);

  const switchLayout = () => {
    setLayout(layout === "grid" ? "list" : "grid");
  };

  function DataSaver() {
    datasaver = !datasaver;
    //Code to turn on datasaverMode
  }
  function DarkMode() {
    setTheme(!darkmode);
  }

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
          label: "Datasaver",
          icon: "pi pi-fw pi-bolt",
          command: () => {
            DataSaver();
          },
        },
        {
          label: "Darkmode",
          icon: darkmode ? "pi pi-fw pi-sun" : "pi pi-fw pi-moon",
          command: () => {
            DarkMode();
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
      <p>Active filters: 
        <Tag className="p-2 m-1 text-base" value="Name: Castle" icon="pi pi-times"></Tag>
        <Tag className="p-2 m-1 text-base" value="Type: Opera" icon="pi pi-times"></Tag>
        <Tag className="p-2 m-1 text-base" value="Cost: 0" icon="pi pi-times"></Tag>

      </p>
      
     
    </div>
  );
}
