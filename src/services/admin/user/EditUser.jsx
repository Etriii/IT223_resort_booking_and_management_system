import { apiFetch } from "../../../utils/apiFetch";

const editUser = async (input_data) => {
    try {
        const response = await apiFetch(`controller=User&action=updateUser`, {
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

export default editUser;
