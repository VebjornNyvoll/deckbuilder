import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

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
  ];

  return (
    <div className="card relative z-2">
      <Menubar
        model={items}
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
