import { useEffect } from 'react';
const MyAccount = () => {
    useEffect(() => {
        document.title = "My Account | Ocean View";
    }, []);
    return (
        <div>MyAccount</div>
    )
}

export default MyAccount