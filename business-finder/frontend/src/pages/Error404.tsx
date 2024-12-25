import React from 'react';
import { AppSidebar } from '../components/app-sidebar.tsx';
import { ThemeProvider } from '../components/theme-provider.tsx';
import { Link } from 'react-router-dom';

const Error404: React.FC = () => {
    return (
        <ThemeProvider>
            <div className="flex">
                <AppSidebar />
                <div className="flex-1 p-6 min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
                    <p className="mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Error404;