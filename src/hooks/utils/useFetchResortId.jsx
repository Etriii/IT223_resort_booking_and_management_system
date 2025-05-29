import React from 'react'

const useFetchResortId = () => {
    // const resort_id = [JSON.parse(localStorage.getItem('user_role'))][0]['resort_id'];
    const resort_id = JSON.parse(localStorage.getItem("user_role"))?.[0]?.resort_id;
    return resort_id;
}

export default useFetchResortId