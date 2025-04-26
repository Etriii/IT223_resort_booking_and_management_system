import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import { IoClose } from "react-icons/io5";

const Modal = ({
    isOpen,
    onClose,
    variant,
    title,
    message,
    onConfirm,
    onCancel,
    children,
}) => {
    if (!isOpen) return null;

    // useEffect(() => {
    //     const handleEscKeyPress = (event) => {
    //         if (event.key === 'Escape') {
    //             onClose();  
    //         }
    //     };

    //     document.addEventListener('keydown', handleEscKeyPress);

    //     return () => {
    //         document.removeEventListener('keydown', handleEscKeyPress);
    //     };
    // }, [onClose]); 

    const getVariantStyles = () => {
        switch (variant) {
            case 'create':
                return {
                    background: 'bg-teal-50',
                    textColor: 'text-teal-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                                onClick={onConfirm}
                            >
                                Create
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ),
                };
            case 'read':
                return {
                    background: 'bg-blue-50',
                    textColor: 'text-blue-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </>
                    ),
                };
            case 'update':
                return {
                    background: 'bg-yellow-50',
                    textColor: 'text-yellow-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                onClick={onConfirm}
                            >
                                Save Changes
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ),
                };
            case 'delete':
                return {
                    background: 'bg-red-50',
                    textColor: 'text-red-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={onConfirm}
                            >
                                Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ),
                };
            case 'confirmation':
                return {
                    background: 'bg-yellow-50',
                    textColor: 'text-yellow-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ),
                };
            case 'information':
                return {
                    background: 'bg-blue-50',
                    textColor: 'text-blue-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </>
                    ),
                };
            default:
                return {
                    background: 'bg-white',
                    textColor: 'text-gray-800',
                    buttons: (
                        <>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </>
                    ),
                };
        }
    };

    const { background, textColor, buttons } = getVariantStyles();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`w-full sm:w-96 p-4 rounded-lg shadow-lg ${background} ${textColor}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <IoClose className='size-7' />
                    </button>
                </div>
                <div className="text-sm text-gray-700 mb-4">{message}</div>
                <div className="flex justify-end space-x-3">{buttons}</div>
            </div>
        </div>
    );
};

// Modal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     variant: PropTypes.oneOf([
//         'create',
//         'read',
//         'update',
//         'delete',
//         'confirmation',
//         'information',
//     ]).isRequired,
//     title: PropTypes.string.isRequired,
//     message: PropTypes.string.isRequired,
//     onConfirm: PropTypes.func,
//     onCancel: PropTypes.func,
// };

export default Modal;