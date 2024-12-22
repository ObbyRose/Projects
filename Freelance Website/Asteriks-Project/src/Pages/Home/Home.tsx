import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

//components imports
import Socials from '../../components/Social-Media/Socials.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx';

const Home: React.FC = () => {
    return (
        <div className="main">
                <Navbar />
                <div className="main__container">
                    <div className="main__content">
                        <h1>Asteriks</h1>
                        <h2>Code and Design Services</h2>
                        <p>See what makes us stand out</p>
                        <button className="main__btn">
                            <Link to="/about">Get Started</Link>
                        </button>
                    </div>
                    <div className="main__img--container">
                        <img src='../../assets/images/pic1.svg' alt="pic1" id="main__img" />
                    </div>
                </div>
                <Socials/>
            </div>
    );
};

export default Home;