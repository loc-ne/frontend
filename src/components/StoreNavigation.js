import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categoriesShoe = ['Classic', 'Lifestyle', 'Suede', 'Palermo'];
const categoriesSportShoeWomen = ['Training', 'Running', 'Racquet', 'Soccer', 'Basketball', 'Motorsport', 'Yoga'];
const categoriesSportShoeMen = ['Training', 'Running', 'Racquet', 'Soccer', 'Basketball', 'Motorsport', 'Golf'];
const categoriesSportShoeKid = ['Running', 'Soccer', 'Basketball', 'Motorsport'];

const StoreNavigation = ({ gender, handleMouseLeave }) => {
  const navigate = useNavigate();

  const handleOnClick = (e, request, fit) => {
    e.preventDefault();
    navigate(`/shoes/${fit.toLowerCase()}/${request.toLowerCase()}`);
  };

  const renderSportCategories = () => {
    switch (gender) {
      case 'Women':
        return categoriesSportShoeWomen.map((category, index) => (
          <li key={index}><Link onClick={(e) => handleOnClick(e, category, gender)} to="#">{category}</Link></li>
        ));
      case 'Men':
        return categoriesSportShoeMen.map((category, index) => (
          <li key={index}><Link onClick={(e) => handleOnClick(e, category, gender)} to="#">{category}</Link></li>
        ));
      case 'Kid':
        return categoriesSportShoeKid.map((category, index) => (
          <li key={index}><Link onClick={(e) => handleOnClick(e, category, gender)} to="#">{category}</Link></li>
        ));
      default:
        return null;
    }
  };

  return (
    <nav className="card-nav" onMouseLeave={handleMouseLeave}>
      <div className="nav-column">
        <ul>
          {gender !== 'Kid' && (
            <li>
              <h3><Link onClick={(e) => handleOnClick(e, 'Launch Calendar', gender)} to="#">Launch Calendar</Link></h3>
            </li>
          )}
          <li>
            <h3><Link onClick={(e) => handleOnClick(e, 'Bestseller', gender)} to="#">Bestseller</Link></h3>
          </li>
          <li>
            <h3><Link onClick={(e) => handleOnClick(e, 'Sale', gender)} to="#">Sale</Link></h3>
          </li>
        </ul>
      </div>
      <div className="nav-column">
        <ul>
          <li>
            <h2><Link onClick={(e) => handleOnClick(e, 'all', gender)} to="#">{gender} Shoes</Link></h2>
          </li>
          {categoriesShoe.map((category, index) => (
            <li key={index}><Link onClick={(e) => handleOnClick(e, category, gender)} to="#">{category}</Link></li>
          ))}
        </ul>
      </div>
      <div className="nav-column">
        <ul>
          <li>
            <h2><Link onClick={(e) => handleOnClick(e, 'Sport', gender)} to="#">Sport</Link></h2>
          </li>
          {renderSportCategories()}
        </ul>
      </div>
    </nav>
  );
};

export default StoreNavigation;
