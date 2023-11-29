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
  const searchBar = (
    <InputText id="search"  placeholder="Search" type="search" onChange={debouncedResults}   />
    );

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
    setSort('name', sortOrder.ASC)
    dispatch({ type: 'filters/clearFilters'});
    const searchBarById = document.getElementById('search');
    if (searchBarById instanceof HTMLInputElement) {
      searchBarById.value = '';
    }
  };

  const onLogout = () => {
    logout();
    resetFilters();
    navigate('/');
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
      label: 'Home',
      icon: <i className="pi pi-fw pi-home" />,
      command: () => {
        location.pathname == '/'? resetFilters() : navigate('/'); // Reset filters if already on home page
      },
    },
    {
      label: 'Decks',
      icon: <i className="pi pi-fw pi-database" />,
      command: () => {
        navigate('/decks');
      },
    },
    {
      visible: page,
      label: 'Filter',
      icon: <i className="pi pi-fw pi-filter" />,
      className: Object.keys(filters).length > 0 ? activeFilterColor : '',
      items: [
        {
          label: 'Faction',
          icon: <i className="pi pi-fw pi-prime" />,
          className: filters?.faction?.length > 0 ? activeFilterColor : '',
          items: [
            {
              label: 'Neutral',
              className: filters?.faction?.includes('Neutral') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'faction', values: ['Neutral'] });
              },
            },
            {
              label: 'Alliance',
              className: filters?.faction?.includes('Alliance') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'faction', values: ['Alliance'] });
              },
            },
            {
              label: 'Horde',
              className: filters?.faction?.includes('Horde') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'faction', values: ['Horde'] });
              },
            },
          ],
        },
        {
          label: 'Rarity',
          icon: <i className="pi pi-fw pi-box" />,
          className: filters?.rarity?.length > 0 ? activeFilterColor : '',
          items: [
            {
              label: 'Free',
              className: filters?.rarity?.includes('Free') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Free'] });
              },
            },
            {
              label: 'Common',
              className: filters?.rarity?.includes('Common') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Common'] });
              },
            },
            {
              label: 'Rare',
              className: filters?.rarity?.includes('Rare') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Rare'] });
              },
            },
            {
              label: 'Epic',
              className: filters?.rarity?.includes('Epic') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Epic'] });
              },
            },
            {
              label: 'Legendary',
              className: filters?.rarity?.includes('Legendary') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'rarity', values: ['Legendary'] });
              },
            },
          ],
        },
        {
          label: 'Type',
          icon: <i className="pi pi-fw pi-book" />,
          className: filters?.type?.length > 0 ? activeFilterColor : '',
          items: [
            {
              label: 'Spell',
              className: filters?.type?.includes('Spell') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Spell'] });
              },
            },
            {
              label: 'Minion',
              className: filters?.type?.includes('Minion') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Minion'] });
              },
            },
            {
              label: 'Hero',
              className: filters?.type?.includes('Hero') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Hero'] });
              },
            },
            {
              label: 'Hero power',
              className: filters?.type?.includes('Hero Power') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Hero Power'] });
              },
            },
            {
              label: 'Weapons',
              className: filters?.type?.includes('Weapon') ? activeFilterColor : '',
              command: () => {
                addFilter({ field: 'type', values: ['Weapon'] });
              },
            },
            {
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
          disabled: Object.keys(filters).length > 0 ? false : true,
          label: 'Reset filters',
          icon: <i className="pi pi-fw pi-filter-slash" />,
          command: () => {
            resetFilters();
          },
        }
      ],
    },
    {
      visible: page,
      label: 'Sort',
      data: <div data-testid="sort-menuitem"></div>,
      icon: <i data-testid="sort-menuitem" className="pi pi-fw pi-sort-alt" />,
      items: [
        {
          label: 'Cost',
          icon: <i className="pi pi-fw pi-money-bill" />,
          className: sort?.field == 'cost' ? activeFilterColor : '',
          items: [
            {
              label: 'High to low',
              icon: <i className="pi pi-fw pi-sort-numeric-down-alt" />,
              className: sort?.field == 'cost' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('cost', sortOrder.DESC);
              },
            },
            {
              label: 'Low to high',
              icon: <i className="pi pi-fw pi-sort-numeric-up" />,
              className: sort?.field == 'cost' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('cost', sortOrder.ASC);
              },
            },
          ],
        },
        {
          label: 'Name',
          icon: <i className="pi pi-fw pi-id-card" />,
          className: sort?.field == 'name' ? activeFilterColor : '',
          items: [
            {
              label: 'A-Z',
              icon: <i className="pi pi-fw pi-sort-alpha-down" />,
              className: sort?.field == 'name' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('name', sortOrder.ASC);
              },
            },
            {
              label: 'Z-A',
              icon: <i className="pi pi-fw pi-sort-alpha-up-alt" />,
              className: sort?.field == 'name' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('name', sortOrder.DESC);
              },
            },
          ],
        },
        {
          label: 'Attack',
          data: <div data-testid="attack" />,
          icon: <i data-testid="attack" className="pi pi-fw pi-wrench" />,
          className: sort?.field == 'attack' ? activeFilterColor : '',
          items: [
            {
              label: 'High to low',
              data: <div data-testid="attack-htl" />,
              icon: <i data-testid="attack-htl" className="pi pi-fw pi-sort-numeric-down-alt" />,
              className: sort?.field == 'attack' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('attack', sortOrder.DESC);
              },
            },
            {
              label: 'Low to high',
              icon: <i className="pi pi-fw pi-sort-numeric-up" />,
              className: sort?.field == 'attack' && sort?.order == sortOrder.ASC ? activeFilterColor : '',
              command: () => {
                setSort('attack', sortOrder.ASC);
              },
            },
          ],
        },
        {
          label: 'Health',
          icon: <i className="pi pi-fw pi-heart" />,
          className: sort?.field == 'health' ? activeFilterColor : '',
          items: [
            {
              label: 'High to low',
              icon: <i className="pi pi-fw pi-sort-numeric-down-alt" />,
              className: sort?.field == 'health' && sort?.order == sortOrder.DESC ? activeFilterColor : '',
              command: () => {
                setSort('health', sortOrder.DESC);
              },
            },
            {
              label: 'Low to high',
              icon: <i className="pi pi-fw pi-sort-numeric-up" />,
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
      visible: page || deckPage,
      label: layout == 'grid' ? 'List' : 'Grid',
      icon: layout == 'grid' ? <i className="pi pi-fw pi-list" /> : <i className="pi pi-fw pi-th-large" />,
      command: () => {
        switchLayout();
      },
    },
    {
      visible: page,
      label: 'Searchbar',
      
      template: searchBar,
    },
    {
      label: 'Profile',
      icon: <i className="pi pi-fw pi-user" />,
      items: [
        {
          label: user ? 'Log out' : 'Login',
          icon: user ? <i className="pi pi-fw pi-user-minus" /> : <i className="pi pi-fw pi-user-plus" />,
          command: () => {
            user ? onLogout() : navigate('/login');
          },
        },
        {
          separator: true,
        },
        {
          label: dataSaver ? 'Disable Data Saver' : 'Enable Data Saver',
          icon: dataSaver ? <i className="pi pi-fw pi-times" /> : <i className="pi pi-fw pi-bolt" />,
          command: () => {
            DataSaver();
          },
        },
        {
          label: darkMode ? 'Light mode' : 'Dark mode',
          icon: darkMode ? <i className="pi pi-fw pi-sun" /> : <i className="pi pi-fw pi-moon" />,
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
