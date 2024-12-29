import React from 'react';
import { AppSidebar } from '../components/app-sidebar';
import { ThemeProvider } from '../components/theme-provider';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss, SiMongodb } from 'react-icons/si';

const About: React.FC = () => {
    return (
        <ThemeProvider>
            <div className="flex">
                <AppSidebar />
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold mb-4">About Us</h1>
                    <p className="text-lg mb-6">
                        Welcome to Connect! Our mission is to help you find the best businesses in your area.
                    </p>
                    <h2 className="text-2xl font-semibold mb-4">Technologies We Use</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <FaReact className="text-blue-500 mr-2" size={24} />
                            <span className="text-lg">React</span>
                        </li>
                        <li className="flex items-center">
                            <SiTypescript className="text-blue-700 mr-2" size={24} />
                            <span className="text-lg">TypeScript</span>
                        </li>
                        <li className="flex items-center">
                            <SiJavascript className="text-yellow-500 mr-2" size={24} />
                            <span className="text-lg">JavaScript</span>
                        </li>
                        <li className="flex items-center">
                            <img src='/src/assets/tanstack.png' className="text-red-500 mr-2" width={24} height={24} />
                            <span className="text-lg">TanStack</span>
                        </li>
                        <li className="flex items-center">
                            <img src='/src/assets/shadcn.png' className="text-red-500 mr-2 bg-white rounded" width={24} height={24} />
                            <span className="text-lg">shadcn</span>
                        </li>
                        <li className="flex items-center">
                            <SiTailwindcss className="text-teal-500 mr-2" size={24} />
                            <span className="text-lg">Tailwind CSS</span>
                        </li>
                        <li className="flex items-center">
                            <FaNodeJs className="text-green-500 mr-2" size={24} />
                            <span className="text-lg">Node.js</span>
                        </li>
                        <li className="flex items-center">
                            <SiMongodb className="text-gray-700 mr-2" size={24} />
                            <span className="text-lg">MongoDB</span>
                        </li>
                    </ul>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
                    <p className="text-lg mb-6">
                        Our team is composed of experienced professionals dedicated to providing the best service possible.
                    </p>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default About;