import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

//components imports
import Socials from '../../components/Social-Media/Socials.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx';

const Error: React.FC = () => {
    return (
        <div className="main">
            <Navbar />
            <div className="main__container">
                <div className="main__content">
                    <h2>Page Not Found</h2>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Link to="/">
                        <button className="main__btn">
                            Go Home
                        </button>
                    </Link>
                </div>
                <div className="main__img--container">
                    <img src='../../assets/images/pic4.svg' alt="pic4" id="main__img" />
                </div>
            </div>
            <Socials />
        </div>
    );
};

export default Error;