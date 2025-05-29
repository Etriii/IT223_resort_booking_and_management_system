import { apiFetch } from "../../../utils/apiFetch";

const deleteUser = async (user_id) => {
    try {
        const response = await apiFetch(`controller=User&action=deleteUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id })
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

export default deleteUser;
