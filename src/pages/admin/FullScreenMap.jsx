import React from 'react';
import { useLocation } from 'react-router-dom';

function FullScreenMap() {

    document.title = "Map | Ocean View";
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const embedUrl = searchParams.get('embedUrl');

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {embedUrl ? (
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen="true"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            ) : (
                <p>Error: Embed URL not provided.</p>
            )}
        </div>
    );
}

export default FullScreenMap;