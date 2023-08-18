import React, { useEffect, useRef }  from 'react';
import withLanguage from '../../hocs/withLanguage';
import { Nav, NavLink, MobileNavButton, MobileCloseButton } from './Navigation.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMenuContext } from '../../contexts/MenuContext';

const Navigation = ({ content }) => {
  const navRef = useRef();
  const { menuOpen, setMenuOpen } = useMenuContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    }

    // Adding the click listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Removing the click listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setMenuOpen]); // Include setMenuOpen in the dependency array to capture the latest reference

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const displayValue = menuOpen ? 'flex' : 'none';

    return (
      <div ref={navRef}>
        {!menuOpen && (
          <MobileNavButton onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </MobileNavButton>
        )}
        <Nav display={displayValue}>
          <MobileCloseButton onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes}/>
          </MobileCloseButton>
            {content.map((item, index) => (
              <NavLink key={index} href={item.url}>
                {item.label}
              </NavLink>
            ))}
        </Nav>
      </div>
    );
};

export default withLanguage(Navigation, "Navigation");