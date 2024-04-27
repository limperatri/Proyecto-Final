import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../../context/store";
import { useTranslation } from "react-i18next";
import logo from "../../../../media/logonavbar.png";
// import SearchBar from "../../../SearchBar/SearchBar";
import SearchBarAdmin from "../../SearchBarADMIN/SearchBarAdmin";
// import {
//   fetchCategories,
//   fetchProducts,
// } from "../../../../redux/actions/actions";
export default function LoggedAdmin() {
  const { t } = useTranslation();
  const [state, dispatch] = useStore();
  const logOutSession = () => {
    localStorage.clear();
  };

  // const adminName = state.admin.data.name;
  return (
    <div className="navbar-space">
      <nav
        className="navbar navbar-expand-lg navbar-light  fixed-top"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <Link to="/admin/home" className="navbar-brand">
            <img src={logo} alt="" height="80" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ">
              <li className="nav-item dropdown  white-text-nav">
                <Link
                  to=""
                  className="dropdown-toggle"
                  id="dropdownMenuClickableInside"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  {t("adminLoggedNavBar.admin")}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    className="dropdown-item category-list-item"
                    to="/admin/user"
                  >
                    {t("adminLoggedNavBar.user")}
                  </Link>
                  <Link
                    className="dropdown-item category-list-item"
                    to="/admin/Buys"
                  >
                    {t("adminLoggedNavBar.buys")}
                  </Link>
                  <Link
                    className="dropdown-item category-list-item"
                    to="/admin/addCategories"
                  >
                    {t("adminLoggedNavBar.adminCategories")}
                  </Link>
                  <Link
                    onClick={logOutSession}
                    className="dropdown-item category-list-item log-out"
                    to="/home"
                  >
                    {t("adminLoggedNavBar.switch")}
                  </Link>
                  <Link
                    className="dropdown-item category-list-item log-out"
                    onClick={logOutSession}
                    to="/admin/login"
                  >
                    {t("adminLoggedNavBar.logOut")}
                  </Link>
                </ul>
              </li>
              <li className="nav-item white-text-nav">
                <Link className="nav-item white-text-nav" to="/admin/home">
                  {t("adminLoggedNavBar.inventory")}
                </Link>
              </li>
              <li className="nav-item white-text-nav">
                <Link className="nav-item white-text-nav" to="/admin/QaS">
                  {t("adminLoggedNavBar.qas")}
                </Link>
              </li>
              <li className="nav-item white-text-nav">
                <Link
                  className="nav-item white-text-nav"
                  to="/admin/sellProduct"
                >
                  {t("adminLoggedNavBar.sell")}
                </Link>
              </li>
            </ul>
          </div>
          <SearchBarAdmin />
        </div>
      </nav>
    </div>
  );
}
