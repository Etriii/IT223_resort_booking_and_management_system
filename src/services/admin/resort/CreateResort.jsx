import { useEffect } from "react";
import { DiAws } from "react-icons/di";

import { apiFetch } from "../../../utils/apiFetch";

const createResort = async (input_data) => {

    try {
        const response = await apiFetch(`controller=Resorts&action=createResort`, {
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

export default createResort;