import { useContext, useEffect, useMemo, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { AuthContext } from '../context/authContext';
import { useAppSelector, useAppDispatch } from '../service/hooks';
import { setDataSaver } from '../service/cards/dataSaverSlice';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { PrimeReactContext } from 'primereact/api';
import './navbarIcon.css';

export default function Navbar() {
  // Gets filters from redux store
  const filters = useAppSelector((state) => state.filters);
  const sort = useAppSelector((state) => state.sort);
  const layout = useAppSelector((state) => state.layout.layout);
  const dataSaver = useAppSelector((state) => state.datasaver.datasaver);
  // Used to dispatch actions to redux store. See filterSlice.ts for supported actions and their expected payload.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const page = location.pathname == '/';
  const deckPage = location.pathname == '/decks';

  //Darkmode handling
  const { changeTheme } = useContext(PrimeReactContext);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Load dark mode preference from localStorage on component mount
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode != null ? JSON.parse(storedDarkMode) : false;
  });
  useEffect(() => {
    // Save dark mode preference to localStorage when it changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  useEffect(() => {
    // Check darkMode on component mount and call changeTheme if true
    const themeLink = document.getElementById('theme-link');
    if (darkMode && themeLink instanceof HTMLLinkElement) {
      themeLink.href = '/themes/viva-dark/theme.css';
    } else if (themeLink instanceof HTMLLinkElement) {
      themeLink.href = '/themes/lara-light-indigo/theme.css';
    }
  }, [darkMode]);
  function toggleTheme() {
    if (darkMode) {
      setDarkMode(false);
      changeTheme?.('viva-dark', 'lara-light-indigo', 'theme-link');
    } else {
      setDarkMode(true);
      changeTheme?.('lara-light-indigo', 'viva-dark', 'theme-link');
    }
  }
  const activeFilterColor = 'bg-teal-100';

  //Searchbar handling
  const handleSearchChange = (e: { target: { value: string } }) => {
    addFilter({ field: 'name', values: [e.target.value] });
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, [handleSearchChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  const searchBar = <InputText id="search" placeholder="Search" type="search" onChange={debouncedResults} />;

  //Filterchange handling
  function addFilter(filter: { field: string; values: string[] }) {
    // Check if filter already exists
    if (filters[filter.field]?.includes(filter.values[0])) {
      // Remove filter if it does
      dispatch({ type: 'filters/removeFilter', payload: filter });
      return;
    }
    // Otherwise add filter
    dispatch({ type: 'filters/addFilter', payload: filter });
  }

  const resetFilters = () => {
    setSort('name', sortOrder.ASC);
    dispatch({ type: 'filters/clearFilters' });
    const searchBarById = document.getElementById('search');
    if (searchBarById instanceof HTMLInputElement) {
      searchBarById.value = '';
    }
  };

  const onLogout = () => {
    logout();
    resetFilters();
    navigate('/');
    if (location.pathname == '/') {
      window.location.reload();
    }
  };

  const switchLayout = () => {
    dispatch({ type: 'layout/switchLayout' });
  };

  function DataSaver() {
    dispatch(setDataSaver(!dataSaver));
  }

  enum sortOrder {
    ASC = 1,
    DESC = -1,
  }

  function setSort(field: string, order: sortOrder) {
    dispatch({ type: 'sort/sort', payload: { field: field, order: order } });
  }

  const items = [
    {
      id: 'menuitem-home',
      label: 'Home',
      icon: "pi pi-fw pi-home",
      command: () => {
        location.pathname == '/' ? resetFilters() : navigate('/'); // Reset filters if already on home page
      },
    },
    {
      id: 'menuitem-decks',
      label: 'Decks',
      icon: "pi pi-fw pi-database",
      command: () => {
        navigate('/decks');
      },
    },
    {
      id: 'menuitem-filter',
      visible: page,
      label: 'Filter',
      icon: "pi pi-fw pi-filter",
      className: Object.keys(filters).length > 0 ? activeFilterColor : '',
      items: [
        {
          id: 'menuitem-faction',
          label: 'Faction',
          icon: "pi pi-fw pi-prime",
          className: filters?.faction?.length > 0 ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-neutral',
              label: 'Neutral',
              className: filters?.faction?.includes('Neutral') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'faction', values: ['Neutral'] });
              },
            },
            {
              id: 'menuitem-alliance',
              label: 'Alliance',
              className: filters?.faction?.includes('Alliance') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'faction', values: ['Alliance'] });
              },
            },
            {
              id: 'menuitem-horde',
              label: 'Horde',
              className: filters?.faction?.includes('Horde') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'faction', values: ['Horde'] });
              },
            },
          ],
        },
        {
          id: 'menuitem-rarity',
          label: 'Rarity',
          icon: "pi pi-fw pi-box",
          className: filters?.rarity?.length > 0 ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-free',
              label: 'Free',
              className: filters?.rarity?.includes('Free') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Free'] });
              },
            },
            {
              id: 'menuitem-common',
              label: 'Common',
              className: filters?.rarity?.includes('Common') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Common'] });
              },
            },
            {
              id: 'menuitem-rare',
              label: 'Rare',
              className: filters?.rarity?.includes('Rare') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Rare'] });
              },
            },
            {
              id: 'menuitem-epic',
              label: 'Epic',
              className: filters?.rarity?.includes('Epic') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Epic'] });
              },
            },
            {
              id: 'menuitem-legendary',
              label: 'Legendary',
              className: filters?.rarity?.includes('Legendary') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Legendary'] });
              },
            },
          ],
        },
        {
          id: 'menuitem-type',
          label: 'Type',
          icon: "pi pi-fw pi-book",
          className: filters?.type?.length > 0 ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-spell',
              label: 'Spell',
              className: filters?.type?.includes('Spell') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Spell'] });
              },
            },
            {
              id: 'menuitem-minion',
              label: 'Minion',
              className: filters?.type?.includes('Minion') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Minion'] });
              },
            },
            {
              id: 'menuitem-hero',
              label: 'Hero',
              className: filters?.type?.includes('Hero') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Hero'] });
              },
            },
            {
              id: 'menuitem-hero-power',
              label: 'Hero power',
              className: filters?.type?.includes('Hero Power') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Hero Power'] });
              },
            },
            {
              id: 'menuitem-weapon',
              label: 'Weapons',
              className: filters?.type?.includes('Weapon') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Weapon'] });
              },
            },
            {
              id: 'menuitem-location',
              label: 'Location',
              className: filters?.type?.includes('Location') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Location'] });
              },
            },
          ],
        },
        {
          separator: true,
        },
        {
          id: 'menuitem-reset-filters',
          disabled: Object.keys(filters).length <= 0,
          label: 'Reset filters',
          icon: "pi pi-fw pi-filter-slash",
          command: () => {
            resetFilters();
          },
        },
      ],
    },
    {
      id: 'menuitem-sort',
      visible: page,
      label: 'Sort',
      icon: "pi pi-fw pi-sort-alt",
      items: [
        {
          id: 'menuitem-cost',
          label: 'Cost',
          icon: "pi pi-fw pi-money-bill",
          className: sort?.field == 'cost' ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-cost-htl',
              label: 'High to low',
              icon: "pi pi-fw pi-sort-numeric-down-alt",
              className: sort?.field == 'cost' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('cost', sortOrder.DESC);
              },
            },
            {
              id: 'menuitem-cost-lth',
              label: 'Low to high',
              icon: "pi pi-fw pi-sort-numeric-up",
              className: sort?.field == 'cost' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('cost', sortOrder.ASC);
              },
            },
          ],
        },
        {
          id: 'menuitem-name',
          label: 'Name',
          icon: "pi pi-fw pi-id-card",
          className: sort?.field == 'name' ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-name-az',
              label: 'A-Z',
              icon: "pi pi-fw pi-sort-alpha-down",
              className: sort?.field == 'name' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('name', sortOrder.ASC);
              },
            },
            {
              id: 'menuitem-name-za',
              label: 'Z-A',
              icon: "pi pi-fw pi-sort-alpha-up-alt",
              className: sort?.field == 'name' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('name', sortOrder.DESC);
              },
            },
          ],
        },
        {
          id: 'menuitem-attack',
          label: 'Attack',
          icon: "pi pi-fw pi-wrench",
          className: sort?.field == 'attack' ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-attack-htl',
              label: 'High to low',
              icon: "pi pi-fw pi-sort-numeric-down-alt",
              className: sort?.field == 'attack' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('attack', sortOrder.DESC);
              },
            },
            {
              id: 'menuitem-attack-lth',
              label: 'Low to high',
              icon: "pi pi-fw pi-sort-numeric-up",
              className: sort?.field == 'attack' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('attack', sortOrder.ASC);
              },
            },
          ],
        },
        {
          id: 'menuitem-health',
          label: 'Health',
          icon: "pi pi-fw pi-heart",
          className: sort?.field == 'health' ? activeFilterColor : '',
          items: [
            {
              id: 'menuitem-health-htl',
              label: 'High to low',
              icon: "pi pi-fw pi-sort-numeric-down-alt",
              className: sort?.field == 'health' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('health', sortOrder.DESC);
              },
            },
            {
              id: 'menuitem-health-lth',
              label: 'Low to high',
              icon: "pi pi-fw pi-sort-numeric-up",
              className: sort?.field == 'health' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('health', sortOrder.ASC);
              },
            },
          ],
        },
      ],
    },
    {
      id: 'menuitem-layout',
      visible: page || deckPage,
      label: layout == 'grid' ? 'List' : 'Grid',
      icon: layout == 'grid' ? "pi pi-fw pi-list" : "pi pi-fw pi-th-large",
      command: () => {
        switchLayout();
      },
    },
    {
      id: 'menuitem-searchbar',
      visible: page,
      label: 'Searchbar',

      template: searchBar,
    },
    {
      id: 'menuitem-profile',
      label: 'Profile',
      icon: "pi pi-fw pi-user",
      items: [
        {
          id: 'menuitem-login-logout',
          label: user ? 'Log out' : 'Login',
          icon: user ? "pi pi-fw pi-user-minus" : "pi pi-fw pi-user-plus",
          command: () => {
            user ? onLogout() : navigate('/login');
          },
        },
        {
          separator: true,
        },
        {
          id: 'menuitem-data-saver',
          label: dataSaver ? 'Disable Data Saver' : 'Enable Data Saver',
          icon: dataSaver ? "pi pi-fw pi-times" : "pi pi-fw pi-bolt",
          command: () => {
            DataSaver();
          },
        },
        {
          id: 'menuitem-theme-change',
          label: darkMode ? 'Light mode' : 'Dark mode',
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
      <Menubar model={items.filter((item) => item !== null)} />
    </div>
  );
}
