import { apiFetch } from "../../../utils/apiFetch";

const getPayments = async () => {
    try {
        const response = await apiFetch(`?controller=PaymentsController&action=getPayments`);
        const data = await response.json();

        if (data.error) {
            return [];
        }

        return data;
    } catch (e) {
        console.error("Error fetching payments:", e);
        return [];
    }
};

export default getPayments;
