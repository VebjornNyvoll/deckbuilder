import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { func } from "prop-types";


var sortorder:boolean = true
var datasaver:boolean = false
var darkmode:boolean = false;

export default function Navbar() {
    const navigate = useNavigate();

  function LogOut() {
    //Code to log out and route to loginpage
  }
  function DataSaver() {
    datasaver = !datasaver
    //Code to log out and route to loginpage
  }
  function DarkMode() {
    darkmode = !darkmode
    navigate("/") //Needed to refresh the icon
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
      label: "Filter",
      icon: "pi pi-fw pi-filter",
      items: [
        {
          label: "Cost",
          icon: "",
          items: [
            {
              label: "High to low",
              icon: ""
            },
            {
              label: "Low to high",
              icon: ""
            },
          ]
        },
        {
          label: "Faction",
          icon: "",
          items: [
            
          ]
        },
      ]
    },
    {
      label: "Ordering",
      icon: "pi pi-fw pi-sort-alt",
      command: () => {
        sortorder = !sortorder;
      },
    },
    {
      label: "Profil",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Log out",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            LogOut();
          },
        },
        {
          separator: true
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
          icon: darkmode? "pi pi-fw pi-sun": "pi pi-fw pi-moon",
          command: () => {
            DarkMode();
          },
        }
      ]
    }
  ];

  const end = (
  <div>
    <InputText placeholder="Search" type="text" className="w-full" />
  </div>
  );

  return (
    <div className="card relative z-2">
      <Menubar
        model={items}
        end={end}
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
