import { useContext, useEffect, useMemo, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";
import debounce from 'lodash.debounce';

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

  const navigate = useNavigate();
  //const [search, setSearch] = useState<string>("")
  const { user, logout } = useContext(AuthContext);
  const page: boolean = true;
  const [filters, saveFilters] = useState<string[]>([":"]);
  
  const handleSearchChange = (e: { target: { value: string; }; }) => {
    setFilter("name:"+e.target.value)
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  
  function handleFilter(filter: string) {
    console.log(filters)

    if (!filters.includes(filter)) {
      const [category, value] = filter.split(':');
      // Check if a filter with the same category already exists
      const existingFilterIndex = filters.findIndex((f) => f.startsWith(`${category}:`));

      if (existingFilterIndex !== -1) {
        console.log("cat exist: " + category)
        // If exists, replace the existing filter with the new one
        saveFilters((prevFilters) => {
          const updatedFilters = [...prevFilters];
          updatedFilters.splice(existingFilterIndex, 1, filter);
          return updatedFilters;
        });
      } else {
        console.log("adding: " + filter)
        saveFilters((prevFilters) => [...prevFilters, filter]);
      }
    } else {
      console.log("Filter out "+filter)
      saveFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
    }
    console.log(filters)
    setFilter(filter)    //Can only handle 1 filter, takes the last filter
  }
  
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
          label: "Faction",
          icon: "pi pi-fw pi-prime",
          items: [
            {
              label: "Neutral",
              command: () => {
                handleFilter("faction:Neutral")
              }
            },
            {
              label: "Alliance",
              command: () => {
                handleFilter("faction:Alliance")
              }
            },
            {
              label: "Horde",
              command: () => {
                handleFilter("faction:Horde");
              }
            },
            /*
            {
              label: "Empire",
              command: () => {
                handleFilter("faction:Empire");
              }
            },
            {
              label: "Explorer",
              command: () => {
                handleFilter("faction:Explorer");
              }
            },
            {
              label: "Legion",
              command: () => {
                handleFilter("faction:Legion");
              }
            },
            {
              label: "Pirate",
              command: () => {
                handleFilter("faction:Pirate");
              }
            },
            {
              label: "Scourge",
              command: () => {
                handleFilter("faction:Scourge");
              }
            }  Does not exist any cards off*/          
          ],
        },
        {
          label: "Rarity",
          icon: "pi pi-fw pi-box",
          items: [
            {
              label: "Free",
              command: () => {
                handleFilter("rarity:Free");
              }
            },
            {
              label: "Common",
              command: () => {
                handleFilter("rarity:Common")
              }
            },
            {
              label: "Rare",
              command: () => {
                handleFilter("rarity:Rare")
              }
            },
            {
              label: "Epic",
              command: () => {
                handleFilter("rarity:Epic");
              }
            },
            {
              label: "Legendary",
              command: () => {
                handleFilter("rarity:Legendary");
              }
            }
            
          ]
        },
        {
          label: "Type",
          icon: "pi pi-fw pi-book",
          items: [
            {
              label: "Spell",
              command: () => {
                handleFilter("type:Spell");
              }
            },
            {
              label: "Minion",
              command: () => {
                handleFilter("type:Minion")
              }
            },
            {
              label: "Hero",
              command: () => {
                handleFilter("type:Hero")
              }
            },
            {
              label: "Hero power",
              command: () => {
                handleFilter("type:Hero Power");
              }
            },
            {
              label: "Weapons",
              command: () => {
                handleFilter("type:Weapon");
              }
            },
            {
              label: "Location",
              command: () => {
                handleFilter("type:Location");
              }
            }
            
          ]
        }
      ],
    },
    {
      label: "Sort",
      icon: "pi pi-fw pi-sort-alt",
      items: [
      {
        label: "Cost",
        icon: "pi pi-fw pi-money-bill",
        items: [
          {
            label: "High to low",
            icon: "pi pi-fw pi-sort-numeric-down-alt",
            command: () => {
              handleFilter("cost:-1")
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            command: () => {
              handleFilter("cost:1")
            }
          },
        ],
      },
      {
        label: "Name",
        icon: "pi pi-fw pi-id-card",
        items: [
          {
            label: "A-Z",
            icon: "pi pi-fw pi-sort-alpha-down",
            command: () => {
              handleFilter("name:1")
            }
          },
          {
            label: "Z-A",
            icon: "pi pi-fw pi-sort-alpha-up-alt",
            command: () => {
              handleFilter("name:-1")
            }
          },
        ],
      },
      {
        label: "Attack",
        icon: "pi pi-fw pi-wrench",
        items: [
          {
            label: "High to low",
            icon: "pi pi-fw pi-sort-numeric-down-alt",
            command: () => {
              handleFilter("attack:-1")
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            command: () => {
              handleFilter("attack:1")
            }
          },
        ],
      },
      {
        label: "Health",
        icon: "pi pi-fw pi-heart",
        items: [
          {
            label: "High to low",
            icon: "pi pi-fw pi-sort-numeric-down-alt",
            command: () => {
              handleFilter("health:-1")
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            command: () => {
              handleFilter("health:1")
            }
          },
        ],
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
    { //Searchbar
      visible: page,
      template: (
        <InputText placeholder="Search" type="text"  onChange={debouncedResults}/>
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
    </div>
  );
}
