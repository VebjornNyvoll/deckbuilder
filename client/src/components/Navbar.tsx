import { useContext, useEffect, useMemo, useState } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AuthContext } from "../context/authContext";
import { useAppSelector, useAppDispatch } from "../service/hooks";
import { setDataSaver } from "../service/cards/dataSaverSlice";
import { useLocation } from "react-router-dom";
import debounce from 'lodash.debounce';
import { PrimeReactContext } from "primereact/api";


export default function Navbar() {
  // Gets filters from redux store
  const filters = useAppSelector((state) => state.filters);
  const sort = useAppSelector((state) => state.sort);
  const layout = useAppSelector((state) => state.layout.layout);
  const dataSaver = useAppSelector((state) => state.datasaver.datasaver);
  // Used to dispatch actions to redux store. See filterSlice.ts for supported actions and their expected payload.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //const [search, setSearch] = useState<string>("")
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const page = location.pathname == "/" ? true : false;
  const deckPage = location.pathname == "/decks" ? true : false;
  
  const handleSearchChange = (e: { target: { value: string; }; }) => {
    addFilter({field: "name", values: [e.target.value]});
  };
  const { changeTheme } = useContext(PrimeReactContext);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Load dark mode preference from localStorage on component mount
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });


  const debouncedResults = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  

  function addFilter(filter: {field: string, values: string[]}) {
    // Check if filter already exists
    if (filters[filter.field]?.includes(filter.values[0])) {
      // Remove filter if it does
      dispatch({ type: "filters/removeFilter", payload: filter });
      return;
    }
    // Otherwise add filter
    dispatch({ type: "filters/addFilter", payload: filter });
  }
  
  

  useEffect(() => {
    // Save dark mode preference to localStorage when it changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    console.log("USEEFFECT")
    // Check darkMode on component mount and call changeTheme if true
    let themeLink = document.getElementById("theme-link");
    if (darkMode) {
      console.log(themeLink.href);
      themeLink.href = "/themes/viva-dark/theme.css";
    }else{
      themeLink.href = "/themes/lara-light-indigo/theme.css";
    }
  }, []);

  const onLogout = () => {
    logout();
    navigate("/");
  };
  
  const switchLayout = () => {
    dispatch({ type: "layout/switchLayout" });
  };

  function DataSaver() {
    dispatch(setDataSaver(!dataSaver));
  }

  enum sortOrder {
    ASC = 1,
    DESC = -1
  }

  function setSort(field: string, order: sortOrder) {
    dispatch({ type: "sort/sort", payload: {field: field, order: order} });
  }

  function toggleTheme() {      
    console.log("TOGGLETHEME: " + darkMode)
    if (darkMode) {

      setDarkMode(false);
      console.log("setDarkMode(false)");  
      changeTheme?.('viva-dark', 'lara-light-indigo', 'theme-link');
    }
    else {
      setDarkMode(true);
      console.log("setDarkMode(true)");
      changeTheme?.('lara-light-indigo', 'viva-dark', 'theme-link');
    }
  }
  const activeFilterColor = "bg-teal-100";

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
      className: Object.keys(filters).length > 0 ? activeFilterColor : "",
      items: [
        {
          label: "Faction",
          icon: "pi pi-fw pi-prime",
          className: filters?.faction?.length>0 ? activeFilterColor : "",
          items: [
            {
              label: "Neutral",
              className: filters?.faction?.includes("Neutral") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "faction", values: ["Neutral"]})
              }
            },
            {
              label: "Alliance",
              className: filters?.faction?.includes("Alliance") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "faction", values: ["Alliance"]})
              }
            },
            {
              label: "Horde",
              className: filters?.faction?.includes("Horde") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "faction", values: ["Horde"]});
              }
            },          
          ],
        },
        {
          label: "Rarity",
          icon: "pi pi-fw pi-box",
          className: filters?.rarity?.length>0 ? activeFilterColor : "",
          items: [
            {
              label: "Free",
              className: filters?.rarity?.includes("Free") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "rarity", values: ["Free"]});
              }
            },
            {
              label: "Common",
              className: filters?.rarity?.includes("Common") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "rarity", values: ["Common"]});
              }
            },
            {
              label: "Rare",
              className: filters?.rarity?.includes("Rare") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "rarity", values: ["Rare"]});
              }
            },
            {
              label: "Epic",
              className: filters?.rarity?.includes("Epic") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "rarity", values: ["Epic"]});
              }
            },
            {
              label: "Legendary",
              className: filters?.rarity?.includes("Legendary") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "rarity", values: ["Legendary"]});
              }
            }
            
          ]
        },
        {
          label: "Type",
          icon: "pi pi-fw pi-book",
          className: filters?.type?.length>0 ? activeFilterColor : "",
          items: [
            {
              label: "Spell",
              className: filters?.type?.includes("Spell") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "type", values: ["Spell"]});
              }
            },
            {
              label: "Minion",
              className: filters?.type?.includes("Minion") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "type", values: ["Minion"]});
              }
            },
            {
              label: "Hero",
              className: filters?.type?.includes("Hero") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "type", values: ["Hero"]});
              }
            },
            {
              label: "Hero power",
              'className': filters?.type?.includes("Hero Power") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "type", values: ["Hero Power"]});
              }
            },
            {
              label: "Weapons",
              className: filters?.type?.includes("Weapon") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "type", values: ["Weapon"]});
              }
            },
            {
              label: "Location",
              className: filters?.type?.includes("Location") ? activeFilterColor : "",
              command: () => {
                addFilter({field: "type", values: ["Location"]});
              }
            }
            
          ]
        }
      ],
    },
    {
      visible: page,
      label: "Sort",
      icon: "pi pi-fw pi-sort-alt",
      items: [
      {
        label: "Cost",
        icon: "pi pi-fw pi-money-bill",
        className: sort?.field == "cost" ? activeFilterColor : "",
        items: [
          {
            label: "High to low",
            icon: "pi pi-fw pi-sort-numeric-down-alt",
            className: sort?.field == "cost" && sort?.order == sortOrder.DESC ? activeFilterColor : "",
            command: () => {
              setSort("cost", sortOrder.DESC)
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            className: sort?.field == "cost" && sort?.order == sortOrder.ASC ? activeFilterColor : "",
            command: () => {
              setSort("cost", sortOrder.ASC)
            }
          },
        ],
      },
      {
        label: "Name",
        icon: "pi pi-fw pi-id-card",
        className: sort?.field == "name" ? activeFilterColor : "",
        items: [
          {
            label: "A-Z",
            icon: "pi pi-fw pi-sort-alpha-down",
            className: sort?.field == "name" && sort?.order == sortOrder.ASC ? activeFilterColor : "",
            command: () => {
              setSort("name", sortOrder.ASC)
            }
          },
          {
            label: "Z-A",
            icon: "pi pi-fw pi-sort-alpha-up-alt",
            className: sort?.field == "name" && sort?.order == sortOrder.DESC ? activeFilterColor : "",
            command: () => {
              setSort("name", sortOrder.DESC)
            }
          },
        ],
      },
      {
        label: "Attack",
        icon: "pi pi-fw pi-wrench",
        className: sort?.field == "attack" ? activeFilterColor : "",
        items: [
          {
            label: "High to low",
            icon: "pi pi-fw pi-sort-numeric-down-alt",
            className: sort?.field == "attack" && sort?.order == sortOrder.DESC ? activeFilterColor : "",
            command: () => {
              setSort("attack", sortOrder.DESC)
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            className: sort?.field == "attack" && sort?.order == sortOrder.ASC ? activeFilterColor : "",
            command: () => {
              setSort("attack", sortOrder.ASC)
            }
          },
        ],
      },
      {
        label: "Health",
        icon: "pi pi-fw pi-heart",
        className: sort?.field == "health" ? activeFilterColor : "",
        items: [
          {
            label: "High to low",
            icon: "pi pi-fw pi-sort-numeric-down-alt",
            className: sort?.field == "health" && sort?.order == sortOrder.DESC ? activeFilterColor : "",
            command: () => {
              setSort("health", sortOrder.DESC)
            }
          },
          {
            label: "Low to high",
            icon: "pi pi-fw pi-sort-numeric-up",
            className: sort?.field == "health" && sort?.order == sortOrder.ASC ? activeFilterColor : "",
            command: () => {
              setSort("health", sortOrder.ASC)
            }
          },
        ],
      },
      ],
    },
    {
      visible: page || deckPage,
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
          label: dataSaver ? "Disable Data Saver" : "Enable Data Saver",
          icon: dataSaver ? "pi pi-fw pi-times" : "pi pi-fw pi-bolt",
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
