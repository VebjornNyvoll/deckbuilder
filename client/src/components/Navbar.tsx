import React, { useContext, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";

//const { changeTheme } = useContext(PrimeReactContext);

//changeTheme(currentTheme: "string", newTheme: "string", linkElementId: "string", callback: Function)

export default function Navbar({
  layout,
  setLayout,
}: {
  layout: "grid" | "list";
  setLayout: (newLayout: "grid" | "list") => void;
}) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  var page: boolean = false;
  switch (window.location.pathname) {
    case "/":
      page = true;
      break;
    case "/decks":
      page = true;
      break;
    default:
      page = false;
      break;
  }

  const onLogout = () => {
    logout();
    navigate("/");
  };
  var sortorder: boolean = true;
  var datasaver: boolean = false;
  const [darkmode, setTheme] = useState<true | false>(false);

  const switchLayout = () => {
    setLayout(layout === "grid" ? "list" : "grid");
  };

  function DataSaver() {
    datasaver = !datasaver;
    //Code to log out and route to loginpage
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
          icon: "",
          items: [
            {
              label: "High to low",
              icon: "",
            },
            {
              label: "Low to high",
              icon: "",
            },
          ],
        },
        {
          label: "Faction",
          icon: "",
          items: [],
        },
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
    {
      separator: true,
    },
    {
      template: (
        <InputText placeholder="Search" type="text" className="w-full" />
      ),
    },
    {
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
        //end={end}
        pt={{
          action: ({ props, state, context }) => ({
            className: context.active
              ? "bg-primary-200 border-round-sm"
              : undefined,
          }),
        }}
      />
    </div>
  );
}
