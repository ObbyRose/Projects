import React from 'react';
import { ModeToggle } from './mode-toggle';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-purpleCustom text-white p-4 flex items-center mb-76 w-auto mx-auto ml-10 mb-6">
            <Link to={"/"}>
            <img className="w-12 h-12 " src="src/assets/ConnectNew.svg" alt="" />
            </Link>
            <div className='ml-auto'>
                <Link className='mr-6' to="/team"> Our Team</Link>
                <ModeToggle />
            </div>
        </header>
    );
};
export default Header;
