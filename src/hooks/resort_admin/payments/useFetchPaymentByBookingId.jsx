import React, { useEffect, useState } from 'react'

import { apiFetch } from '../../../utils/apiFetch';

const useFetchPaymentByBookingId = (booking_id) => {

    const [payment, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPayment = async () => {
        console.log('yes');
        try {
            const res = await apiFetch(`controller=PaymentSubmissions&action=getPaymentSubmissionByBookingId&booking_id=${booking_id}`);
            const data = await res.json();
            setPayment(data);
        } catch {
            setNotify({ type: "error", message: "Failed to fetch Payment" });
        } finally {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500);//hawaa rani or bawasi if hawaon ang dugat na loading :>

            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        fetchPayment();
    }, []);


    return { payment, setPayment, loading, error, setError, fetchPayment };
}

export default useFetchPaymentByBookingId