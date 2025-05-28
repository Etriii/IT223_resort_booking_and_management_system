import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, reservation, fetchReservations }) => {
    const [screenshot, setScreenshot] = useState(null);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    if (!reservation) {
        return null;
        // console.log("PaymentModal reservation:", reservation);
    }

    const handleFileChange = (e) => {
        setScreenshot(e.target.files[0]);
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reservation?.booking_id) {
        alert("Booking data is missing.");
        return;
    }

    if (!screenshot) {
        alert("Please upload a payment screenshot.");
        return;
    }

    if (!referenceNumber.trim()) {
        alert("Please enter the reference number.");
        return;
    }

    setSubmitting(true);

    try {
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (err) => reject(err);
            });

        const base64Image = await toBase64(screenshot);

        const uploadRes = await fetch('http://localhost:8000/api.php?controller=PaymentSubmissions&action=uploadScreenshot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                booking_id: reservation.booking_id,
                image: base64Image,
            }),
        });

        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
            alert('Screenshot upload failed: ' + (uploadData.error || 'Unknown error'));
            setSubmitting(false);
            return;
        }

        const screenshotPath = uploadData.url; 

        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const paymentPayload = {
            booking_id: reservation.booking_id,
            amount_paid: parseFloat(reservation.final_price),
            reference_number: referenceNumber.trim(),
            screenshot_path: screenshotPath,
            status: 'Pending',
            reviewed_by: null,
            reviewed_at: null,
            created_at: now,
            updated_at: now,
        };

        const paymentRes = await fetch('http://localhost:8000/api.php?controller=PaymentSubmissions&action=createPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentPayload),
        });

        const paymentData = await paymentRes.json();

        if (paymentData.success) {
            alert('Payment submitted successfully!');
            fetchReservations();
            onClose();
        } else {
            alert('Payment submission failed: ' + (paymentData.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Payment submission error:', error);
        alert('An error occurred during payment submission.');
    } finally {
        setSubmitting(false);
    }
};


    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-6 w-full max-w-md"
                encType="multipart/form-data"
            >
                <h2 className="text-xl font-semibold mb-4">Submit Payment for Booking #{reservation.booking_id}</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Upload Screenshot</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Reference Number</label>
                    <input
                        type="text"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Enter reference number"
                        required
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={submitting}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Payment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentModal;
