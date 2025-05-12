import { useEffect } from "react";

const NotFound = () => {
    
    useEffect(() => {
        document.title = "Error | Ocean View";
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h2 className="text-5xl font-bold text-red-500 mb-4">404</h2>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h3>
                <p className="text-gray-600 mb-2">
                    Sorry, the page you're looking for doesn't exist or has been moved or removed.
                </p>
                <p className="text-gray-600 mb-6">
                    You can go back to our homepage or try searching for what you need.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
