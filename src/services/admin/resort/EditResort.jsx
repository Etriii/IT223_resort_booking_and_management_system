import { apiFetch } from "../../../utils/apiFetch";

const editResort = async (input_data) => {
    try {
        console.log('yes', input_data);
        const response = await apiFetch(`controller=Resorts&action=updateResort`, {
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

export default editResort;