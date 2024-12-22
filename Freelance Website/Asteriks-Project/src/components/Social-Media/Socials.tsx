import React from 'react';
import './Socials.css';
import { Helmet } from 'react-helmet';

const Socials: React.FC = () => {
    return (
        <>
            <Helmet>
                <script src="https://kit.fontawesome.com/517d96b7d3.js" crossOrigin="anonymous"></script>
                <link rel="stylesheet" href="http://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap" />
            </Helmet>
            <section className="social-media">
                <div className="social-media__container">
                    <h2 className="social-media__title">Follow OnPoint on</h2>
                    <a href="https://twitter.com" className="social-media__icon" target="_blank" rel="noopener noreferrer" title="Follow us on X">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className="social-media__icon" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://facebook.com" className="social-media__icon" target="_blank" rel="noopener noreferrer" title="Like us on Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://reddit.com" className="social-media__icon" target="_blank" rel="noopener noreferrer" title="Follow us on Reddit">
                        <i className="fab fa-reddit-alien"></i>
                    </a>
                </div>
            </section>
        </>
    );
};

export default Socials;