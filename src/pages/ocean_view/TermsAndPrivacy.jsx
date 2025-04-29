import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const TermsAndPrivacy = () => {
    useEffect(() => {
        document.title = "Terms and Privacy | Ocean View";
    }, []);
    return (
        <>
            Terms and Privacy
        </>
    );
}

export default TermsAndPrivacy;