import React, { useState } from 'react';

const CLOUD_NAME = 'dpa4l9gxw';
const UPLOAD_PRESET = 'oceanview';

const PaymentModal = ({ isOpen, onClose, reservation, fetchReservations }) => {
    const [screenshotPath, setScreenshotPath] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen || !reservation) return null;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('folder', 'screenshot');

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.secure_url) {
                setScreenshotPath(data.secure_url);
            } else {
                console.error('Cloudinary response:', data);
                alert('Image upload failed. Please try again.');
            }
        } catch (err) {
            console.error('Image upload error:', err);
            alert('Error uploading image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!screenshotPath) {
            alert('Please upload a screenshot.');
            return;
        }

        if (!referenceNumber.trim()) {
            alert('Please enter the reference number.');
            return;
        }

        setSubmitting(true);

        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const payload = {
                booking_id: reservation.booking_id,
                amount_paid: reservation.final_price,
                reference_number: referenceNumber.trim(),
                screenshot_path: screenshotPath,
                status: 'Pending',
                reviewed_by: null,
                reviewed_at: null,
                created_at: now,
                updated_at: now
            };

            console.log("Payload being sent to backend:", payload);

            const res = await fetch('http://localhost:8000/api.php?controller=PaymentSubmissions&action=createPayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (result.success) {
                alert('Payment submitted successfully!');
                fetchReservations();
                onClose();
            } else {
                alert(`Submission failed: ${result.message || result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Payment submission error:', error);
            alert('An error occurred while submitting payment.');
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
                <h2 className="text-xl font-semibold mb-4">
                    Submit Payment for Booking #{reservation.booking_id}
                </h2>

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

                {screenshotPath && (
                    <div className="mb-4">
                        <img
                            src={screenshotPath}
                            alt="Uploaded Screenshot"
                            className="rounded shadow-md max-h-48"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Reference Number</label>
                    <input
                        type="text"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        className="border p-2 rounded w-full"
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
