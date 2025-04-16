import React from 'react';
import Navbar from '../../components/Navbar/Navbar.tsx';
import Socials from '../../components/Social-Media/Socials.tsx';
import './About.css';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div className="main">
                <Navbar />
                <div className="main__container">
                    <div className="main__content">
                        <h1>Why choose Asteriks?</h1>
                        {/* <h2>Freelancing service</h2> */}
                        <p>We create High-quality Custom-built websites, apps and Bots that are made by customer orders</p>
                        <Link to="/services">
                                <button className="main__btn">
                                    See Options
                                </button>
                        </Link>
                    </div>
                    <div className="main__img--container">
                    <img src='../../assets/images/pic2.svg' alt="pic2" id="main__img" />
                    </div>
                </div>
                <Socials />
            </div>
    );
};

export default About;