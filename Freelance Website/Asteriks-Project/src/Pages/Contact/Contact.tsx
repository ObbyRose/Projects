import React from 'react';
import './Contact.css';

//components imports
import Socials from '../../components/Social-Media/Socials.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx';

const Contact: React.FC = () => {
    return (
        <div className="main">
            <Navbar />
            <div className="main__container">
                <div className="main__content">
                    <h1>Contact Us</h1>
                    <h2>We'd love to hear from you</h2>
                    <p>Fill out the form below to get in touch with us</p>
                </div>
                <div className="main__contact--container">
                <form className="contact__form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                        
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                        
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                        
                        <button type="submit" className="contact__btn">Send Message</button>
                    </form>
                </div>
            </div>
            <Socials />
        </div>
    );
};

export default Contact;