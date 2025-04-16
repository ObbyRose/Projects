import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

//components imports
import Socials from '../../components/Social-Media/Socials';
import Navbar from '../../components/Navbar/Navbar';

const Home: React.FC = () => {
    return (
        <div className="main">
                <Navbar />
                <div className="main__container">
                    <div className="main__content">
                        <h1>Asteriks</h1>
                        <h2>Code and Design Services</h2>
                        <p>See what makes us stand out</p>
                            <Link to="/about">
                                <button className="main__btn">
                                    Get Started
                                </button>
                            </Link>
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