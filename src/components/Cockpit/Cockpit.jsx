import React from "react";
import { NavLink } from "react-router-dom";
import accessToken from "../../db/localStorage";

const Cockpit = props => {
  const logout = () => {
    localStorage.clear();
  };
  let cockpit = <></>;
  if (accessToken.authorization()) {
    cockpit = (
      <>
        <div className="header">
          <div className="header__upper">
            <div className="container">
              <ul className="list list--hr list--hr-separator">
                <li className="list__item">
                  <span className="info">
                    <i className="info__icon far fa-dot-circle"></i>
                    <span className="info__data">
                      1234 Street Name, City Name
                    </span>
                  </span>
                </li>
                <li className="list__item">
                  <span href="#" className="info">
                    <i className="info__icon fab fa-whatsapp"></i>
                    <span className="info__data">123-456-7890</span>
                  </span>
                </li>
                <li className="list__item">
                  <span href="#" className="info">
                    <i className="info__icon far fa-envelope"></i>
                    <span className="info__data">mail@domain.com</span>
                  </span>
                </li>
              </ul>
              <ul className="list list--hr">
                <li className="list__item">
                  <span href="#" className="link">
                    <i className="link__icon fas fa-angle-right"></i>
                    About Us
                  </span>
                </li>
                <li className="list__item">
                  <span href="#" className="link">
                    <i className="link__icon fas fa-angle-right"></i>
                    Contact Us
                  </span>
                </li>
                <li className="list__item">
                  <div className="dropdown ">
                    <div className="dropdown__header">
                      <span href="#" className="link">
                        <img className="flag flag-us" src="" alt="" />
                        English
                      </span>
                      <i className="fas fa-angle-down"></i>
                    </div>

                    <div className="dropdown__body">
                      <ul className="dropdown__items list">
                        <li className="dropdown__item list__item">
                          <span href="#" className="link">
                            <img className="flag flag-us" src="" alt="" />
                            English
                          </span>
                        </li>
                        <li className="dropdown__item list__item">
                          <span href="#" className="link">
                            <img className="flag flag-es" src="" alt="" />
                            Español
                          </span>
                        </li>
                        <li className="dropdown__item list__item">
                          <span href="#" className="link">
                            <img className="flag flag-fr" src="" alt="" />
                            Française
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header__middle container">
            <span className="header__logo-box">
              <img className="header__logo image-logo" alt="" />
            </span>
            <div className="header__user-options">
              <div className="dropdown">
                <div className="dropdown__header">
                  Welcome {accessToken.username()}
                  <NavLink
                    className="nav__link"
                    exact
                    to="/users/login"
                    onClick={logout}
                  >
                    {" "}
                    Logout{" "}
                  </NavLink>
                </div>
              </div>
              <div className="dropdown__body"></div>
            </div>
            <div className="dropdown dropdown--left  ">
              <div className="dropdown__header">
                <div className="image image--small image-cart-icon-big">
                  <div className="notification notification--danger">1</div>
                </div>
              </div>
              <div className="dropdown__body">
                <ul className="dropdown__items list list--vr-separator">
                  <li className="dropdown__item list__item">
                    <div className="item-small-1">
                      <div className="item-small-1__data">
                        <span href="" className="item-small-1__title">
                          Camera X1000
                        </span>
                        <span className="item-small-1__description">
                          1 X $890
                        </span>
                      </div>
                      <div className="item-small-1__image-box">
                        <span
                          href="#"
                          className="item-small-1__image image image-product-1"
                        ></span>
                        <span href="#" className="item-small-1__action">
                          <i className="fas fa-times"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="dropdown__item list__item">
                    <div className="item-small-1">
                      <div className="item-small-1__data">
                        <span href="" className="item-small-1__title">
                          Camera X2000
                        </span>
                        <span className="item-small-1__description">
                          2 X $990
                        </span>
                      </div>
                      <div className="item-small-1__image-box">
                        <span
                          href="#"
                          className="item-small-1__image image image-product-1"
                        ></span>
                        <span href="" className="item-small-1__action">
                          <i className="fas fa-times"></i>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="separator"></div>
                <div className="block">
                  <span className="lable">Total:</span>
                  <span className="lable">$2870</span>
                </div>
                <div className="block list list--hr">
                  <span className="list-item btn btn--gray" href="">
                    View Cart
                  </span>
                  <span className="list-item btn btn--primary" href="">
                    Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__lower container">
          <nav className="nav">
            <ul className="nav__items list list--hr">
              <li className="nav__item">
                <NavLink to="/" className="nav__link">
                  Home
                </NavLink>
              </li>
              <li className="nav__item dropdown ">
                <span className="nav__link dropdown__header">Products</span>
                <div className="dropdown__body">
                  <ul className=" list">
                    <li className="list__item">
                      <NavLink to="/products" className="nav__inner-link">
                        Product Listing
                      </NavLink>
                    </li>
                    <li className="list__item">
                      <NavLink to="/add" className="nav__inner-link">
                        Add Product
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav__item">
                <span className="nav__link">Contact Us</span>
              </li>
              <li className="nav__item">
                <span className="nav__link">About Us</span>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }

  return cockpit;
};

export default Cockpit;
