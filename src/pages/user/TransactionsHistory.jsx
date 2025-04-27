import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const TransactionsHistory = () => {
    useEffect(() => {
        document.title = "Transactions History | Ocean View";
    }, []);
    return (
        <>
            Transactions
        </>
    );
}

export default TransactionsHistory;