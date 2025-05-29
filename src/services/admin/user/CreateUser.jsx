import { apiFetch } from "../../../utils/apiFetch";

const createUser = async (input_data) => {
    try {
        const response = await apiFetch(`controller=User&action=createUser`, {
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

export default createUser;
