import React from "react";

const useFetchUsername = async (user_id) => {
    try {
        const res = await fetch(
            `http://localhost:8000/api.php?controller=User&action=getUserById&id=${user_id}`
        );
        const data = await res.json();
        return data.username;
    } catch {
        console.log('error fetching username');
    }
};

export default useFetchUsername;

// const fetchUsername = async (user_id) => {
//     try {
//         const res = await fetch(
//             `http://localhost:8000/api.php?controller=User&action=getUserById&id=${user_id}`
//         );
//         const data = await res.json();
//         return data.username;
//     } catch (err) {
//         console.error('Error fetching username:', err);
//         return null;
//     }
// };

// export default fetchUsername;
