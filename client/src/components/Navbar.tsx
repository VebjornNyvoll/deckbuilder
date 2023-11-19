import { useContext, useEffect, useMemo, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";
import { useAppSelector, useAppDispatch } from "../service/hooks";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import debounce from 'lodash.debounce';

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
  // Gets filters from redux store
  const filters = useAppSelector((state) => state.filters);
  // Used to dispatch actions to redux store. See filterSlice.ts for supported actions and their expected payload.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //const [search, setSearch] = useState<string>("")
  const { user, logout } = useContext(AuthContext);
  const page: boolean = true;
  
  const handleSearchChange = (e: { target: { value: string; }; }) => {
    addFilter({field: "name", values: [e.target.value]});
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  function addFilter(filter: {field: string, values: string[]}) {
    dispatch({ type: "filters/addFilter", payload: filter });
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

  enum sortOrder {
    ASC = 1,
    DESC = -1
  }

  function sort(field: String, sortOrder: sortOrder) {
    dispatch({ type: "sort/sort", payload: {field: field, sortOrder: sortOrder} });
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
                addFilter({field: "faction", values: ["Neutral"]})
              }
            },
            {
              label: "Alliance",
              command: () => {
                addFilter({field: "faction", values: ["Alliance"]})
              }
            },
            {
              label: "Horde",
              command: () => {
                addFilter({field: "faction", values: ["Horde"]});
              }
            },          
          ],
        },
        {
          label: "Rarity",
          icon: "pi pi-fw pi-box",
          items: [
            {
              label: "Free",
              command: () => {
                addFilter({field: "rarity", values: ["Free"]});
              }
            },
            {
              label: "Common",
              command: () => {
                addFilter({field: "rarity", values: ["Common"]});
              }
            },
            {
              label: "Rare",
              command: () => {
                addFilter({field: "rarity", values: ["Rare"]});
              }
            },
            {
              label: "Epic",
              command: () => {
                addFilter({field: "rarity", values: ["Epic"]});
              }
            },
            {
              label: "Legendary",
              command: () => {
                addFilter({field: "rarity", values: ["Legendary"]});
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
                addFilter({field: "type", values: ["Spell"]});
              }
            },
            {
              label: "Minion",
              command: () => {
                addFilter({field: "type", values: ["Minion"]});
              }
            },
            {
              label: "Hero",
              command: () => {
                addFilter({field: "type", values: ["Hero"]});
              }
            },
            {
              label: "Hero power",
              command: () => {
                addFilter({field: "type", values: ["Hero Power"]});
              }
            },
            {
              label: "Weapons",
              command: () => {
                addFilter({field: "type", values: ["Weapon"]});
              }
            },
            {
              label: "Location",
              command: () => {
                addFilter({field: "type", values: ["Location"]});
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
              sort("cost", sortOrder.DESC)
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            command: () => {
              sort("cost", sortOrder.ASC)
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
              sort("name", sortOrder.ASC)
            }
          },
          {
            label: "Z-A",
            icon: "pi pi-fw pi-sort-alpha-up-alt",
            command: () => {
              sort("name", sortOrder.DESC)
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
              sort("attack", sortOrder.DESC)
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            command: () => {
              sort("attack", sortOrder.ASC)
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
              sort("health", sortOrder.DESC)
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            command: () => {
              sort("health", sortOrder.ASC)
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
