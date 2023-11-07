import React, { useState, useEffect, useRef } from "react";
import CardView from "./components/CardView";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { classNames } from "primereact/utils";
import { OverlayPanel } from "primereact/overlaypanel";
import Navbar from "./components/Navbar";

export default function Deck() {
  const overlayPanel = useRef(null);
  const items: MenuItem = [
    {
      label: "My decks",
      items: [
        { label: "My Collection", icon: "pi pi-fw pi-home" },
        { label: "High Priest Deck", icon: "pi pi-fw pi-book" },
        { label: "Shaman Deck", icon: "pi pi-fw pi-book" },
        { label: "Summon Deck", icon: "pi pi-fw pi-book" },
        { label: "Paladin Deck", icon: "pi pi-fw pi-book" },
      ],
    },
    {
      label: "Options",
      items: [
        {
          command: (e) => {
            overlayPanel.current.toggle(e);
            console.log(e);
          },
          template: (item, options) => {
            return (
              <div className="card flex justify-content-center">
                <button
                  onClick={(e) => options.onClick(e)}
                  className={classNames(
                    options.className,
                    "w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround",
                  )}
                >
                  New deck
                </button>
                <OverlayPanel ref={overlayPanel}>
                  <p>Unfortunately, the deck page is not finished yet</p>
                </OverlayPanel>
              </div>
            );
          },
        },
      ],
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex">
        <Menu model={items} />
        <div className="w-12">
          <CardView />
        </div>
      </div>
    </>
  );
}
