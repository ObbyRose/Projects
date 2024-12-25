import React from 'react';
import { AppSidebar } from '../components/app-sidebar.tsx';
import { ThemeProvider } from '../components/theme-provider.tsx';

const About: React.FC = () => {
    return (
        <ThemeProvider>
            <div className="flex">
                <AppSidebar />
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold mb-4">About Us</h1>
                    <p className="text-lg">
                        Welcome to Connect! Our mission is to help you find the best businesses in your area.
                    </p>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default About;