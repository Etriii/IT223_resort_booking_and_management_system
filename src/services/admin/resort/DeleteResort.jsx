import { apiFetch } from "../../../utils/apiFetch";

const deleteResort = async (resort_id) => {
    try {
        const response = await apiFetch(`controller=Resorts&action=destroyResort`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resort_id })
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

export default deleteResort;