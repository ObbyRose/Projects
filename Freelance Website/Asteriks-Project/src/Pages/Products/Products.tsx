import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';

const Products: React.FC = () => {
    return (
        <>
            <Navbar />
            <Helmet>
            <script src="https://kit.fontawesome.com/517d96b7d3.js" crossOrigin="anonymous"></script>
            <link rel="stylesheet" href="http://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap" />
            </Helmet>
        <section className="products">
            <div className="products__container">
                <h1 className="products__title">Our Services</h1>
                <div className="products__items">
                    <div className="products__item">
                        <i className="fa-solid fa-laptop-code"></i>
                        <h2>Website Building</h2>
                        <p>
                            Custom-built websites tailored to your needs. Whether you need a personal blog, a business site, or an e-commerce platform, we've got you covered.
                        </p>
                        <Link to="/services/website-building" className="products__btn">Learn More</Link>
                    </div>
                    <div className="products__item">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <h2>App Development</h2>
                        <p>
                            High-quality mobile and web apps that deliver seamless user experiences. From ideation to launch, we handle every aspect of app development.
                        </p>
                        <Link to="/services/app-development" className="products__btn">Learn More</Link>
                    </div>
                    <div className="products__item">
                        <i className="fa-solid fa-robot"></i>
                        <h2>AI Bot Creation</h2>
                        <p>
                            Advanced AI bots designed to automate tasks, provide customer support, or enhance user interaction. Leverage the power of AI for your business.
                        </p>
                        <Link to="/services/ai-bot-creation" className="products__btn">Learn More</Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Products;