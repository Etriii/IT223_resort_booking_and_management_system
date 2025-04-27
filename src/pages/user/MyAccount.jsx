import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const MyAccount = () => {
    useEffect(() => {
        document.title = "My Account | Ocean View";
    }, []);
    return (
        <>
            My Account
        </>
    );
}

export default MyAccount;