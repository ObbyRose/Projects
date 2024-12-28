import React from 'react';
import { LucideGithub, LucideLinkedin } from 'lucide-react';

const Team: React.FC = () => {
    return (
        <div className="text-center p-5 m-auto">
            <h1 className="text-4xl mb-5">Our Team</h1>
            <img 
                src="src/assets/TeamPhoto.jfif" 
                alt="Tal Maman" 
                className="rounded-full w-36 h-36 mb-5 m-auto" 
            />
            <p>This website was built by Tal Maman</p>
            <div className="flex justify-center gap-5 mt-5">
                <a href="https://github.com/ObbyRose" target="_blank" rel="noopener noreferrer">
                    <LucideGithub size={32} />
                </a>
                <a href="https://www.linkedin.com/in/tal-maman777/" target="_blank" rel="noopener noreferrer">
                    <LucideLinkedin size={32} />
                </a>
            </div>
        </div>
    );
};

export default Team;