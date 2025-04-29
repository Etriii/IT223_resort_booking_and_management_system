import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const AboutOceanView = () => {
    useEffect(() => {
        document.title = "About | Ocean View";
    }, []);
    return (
        <>
           About Ocean View
        </>
    );
}

export default AboutOceanView;