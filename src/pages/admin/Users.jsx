import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Accounts = () => {

    const [status, setStatus] = useState("Checking...");
    const [currentUser, setCurrentUser] = useState(1);

    useEffect(() => {
        // fetch("http://localhost:8000/api.php?controller=User&action=getAllUsers")
        fetch(`http://localhost:8000/api.php?controller=User&action=getUserById&id=${currentUser}`)
        // fetch(`http://localhost:8000/api.php?controller=User&action=getUserByEmail&email=${currentUser}`)
            // fetch(`http://localhost:8000/api.php?controller=User&action=getUserByEmail&email=${currentUser}`)
            .then((response) => response.json())
            .then((data) => setStatus(JSON.stringify(data)))
            .catch(() => setStatus("Error fetching data"));
    }, [currentUser]);

    return (
        <>
            <div>
                <p>Users</p>
                <div>{status}</div>
                <input type="text" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} />
            </div>
        </>
    );
}

export default Accounts;