import React, { useContext, useState } from 'react';
import Logo from '../assets/images/logo.png';
import StoreNavigation from './StoreNavigation';
import { useNavigate, Link } from 'react-router-dom';
import MyContextCart from '../MyContextCart';
import DropdownUser from './DropdownUser';
import SearchModal from './SearchModal';


const Navbar = () => {
  const [gender, setGender] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { productsData } = useContext(MyContextCart);

  const handleMouseEnter = (event, gender) => {
    setGender(gender);
    setIsNavOpen(true);
  };

  const handleMouseLeave = () => {
    setIsNavOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className='Navbar'>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <ul>
          <li onMouseEnter={(e) => handleMouseEnter(e, 'Women')}><Link to="/women">Women</Link></li>
          <li onMouseEnter={(e) => handleMouseEnter(e, 'Men')}><Link to="/men">Men</Link></li>
          <li onMouseEnter={(e) => handleMouseEnter(e, 'Kid')}><Link to="/kid">Kids</Link></li>
          <li><Link to="/sport">Sport</Link></li>
          <li><Link to="/sale">Sale</Link></li>
        </ul>
        <div className="nav-buttons">
          <button onClick={() => setIsModalOpen(true)} className="button-search">
            <span className="span-button-search">SEARCH</span>
          </button>

          <SearchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <Link to="/cart"><div className="relative inline-block">
            <svg className="shopping-cart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="Interface / Shopping_Cart_01">
                <path id="Vector"
                  d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
                  stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>
            {productsData.length > 0 && (
              <span className="absolute bottom-9 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {productsData.length}
              </span>
            )}
          </div></Link>

          <DropdownUser />
        </div>
      </nav >

      {isNavOpen && gender && <StoreNavigation gender={gender} handleMouseLeave={handleMouseLeave} />}

    </div >
  );
};

export default Navbar;
