import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Helmet } from 'react-helmet';

const Navbar: React.FC = () => {
    useEffect(() => {
        const menu = document.querySelector("#mobile-menu");
        const menuLinks = document.querySelector(".navbar__menu");

        const toggleMenu = () => {
            menu?.classList.toggle("is-active");
            menuLinks?.classList.toggle("active");
        };

        menu?.addEventListener("click", toggleMenu);

        return () => {
            menu?.removeEventListener("click", toggleMenu);
        };
    }, []);

    return (
        <>
            <Helmet>
                <script src="https://kit.fontawesome.com/517d96b7d3.js" crossOrigin="anonymous"></script>
                <link rel="stylesheet" href="http://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap" />
            </Helmet>
            <nav className="navbar">
                <div className="navbar__container">
                    <Link to="/" id="navbar__logo">
                        <i className="fa-solid fa-ghost"></i> Asteriks
                    </Link>
                    <div className="navbar__toggle" id="mobile-menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className="navbar__menu">
                        <li className="navbar__item">
                            <Link to="/" className="navbar__links">Home</Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/about" className="navbar__links">About</Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/services" className="navbar__links">Services</Link>
                        </li>
                        <li className="navbar__item">
                            <Link to="/contact" className="navbar__links">Contact</Link>
                        </li>
                        <li className="navbar__btn">
                            <Link to="/" className="Button"><i className="fa-solid fa-user-plus"></i></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;