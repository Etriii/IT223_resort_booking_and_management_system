import { useEffect } from "react";
import { DiAws } from "react-icons/di";

const createResort = async (input_data) => {

    try {
        const response = await fetch(`http://localhost:8000/api.php?controller=Resorts&action=createResort`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
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