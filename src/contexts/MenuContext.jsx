import React, {createContext, useState, useContext} from 'react';

const defaultMenuContext = {
    menuOpen: false,
    setMenuOpen: () => {},
  };

const MenuContext = createContext(defaultMenuContext);


const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
    
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenuContext = () => useContext(MenuContext);

export { MenuProvider, useMenuContext };
