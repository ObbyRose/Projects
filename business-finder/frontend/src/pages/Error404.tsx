import React from 'react';
import { AppSidebar } from '../components/app-sidebar.tsx';
import { ThemeProvider } from '../components/theme-provider.tsx';
import { Link } from 'react-router-dom';

const Error404: React.FC = () => {
    return (
        <ThemeProvider>
            <div className="flex m-auto">
                <AppSidebar />
                <div className="flex-1 p-6 min-h-screen flex flex-col items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:mr-6">
                            <h2 className="text-6xl font-semibold mb-6">Page Not Found</h2>
                            <h3 className='text-2xl'>
                                The page you're looking for doesn't exist or has been moved.
                            </h3>
                        </div>
                        <img className='w-96 h-96 ml-40' src="src/assets/pic4.svg" alt="" />
                    </div>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-purpleCustom text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Error404;