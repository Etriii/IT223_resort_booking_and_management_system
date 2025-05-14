import React from 'react'

const useFetchUserRoleWithResortId = () => {
    const resort_id = [JSON.parse(localStorage.getItem('user_role'))][0]['resort_id'];
    return (resort_id)
}

export default useFetchUserRoleWithResortId