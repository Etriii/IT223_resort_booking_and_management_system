import { useEffect } from "react";
import { DiAws } from "react-icons/di";

import { apiFetch } from "../../../utils/apiFetch";

const CreateUserRoleOfAdmin = async (input_data) => {

    try {
        console.log(input_data);
        const response = await apiFetch(`controller=UserRoles&action=createUserWithRole`, {
            method: "POST",
            body: JSON.stringify({ input_data })
        });

        const data = await response.json();

        if (data.error) {
            return {
                success: false,
                message: data.error
            };
        }
        return {
            success: data.success,
            message: data.message
        };
    } catch (e) {
        return {
            success: false,
            message: e.message
        };
    }
};

export default CreateUserRoleOfAdmin;