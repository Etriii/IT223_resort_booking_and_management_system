import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import { IoClose } from "react-icons/io5";

import Button from '../button/Button';

const Modal = ({
    isOpen,
    onClose,
    variant,
    loading,
    title,
    onConfirm,
    onCancel,
    children,
}) => {

    if (!isOpen) return null;

    //enable rani if mag peform na
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

    const initial_heading_theme = {
        create: 'bg-gray-50 text-teal-800',
        read: 'bg-blue-50 text-blue-800',
        update: 'bg-gray-50 text-yellow-800',
        delete: 'bg-red-50 text-red-800',
        filter: 'bg-white'
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'create':
                return {
                    background: 'bg-gray-50',
                    textColor: 'text-teal-800',
                    buttons: (
                        <>
                            <Button variant="create" size="md" onClick={onConfirm} disabled={loading} loading={loading} className={'w-auto bg-teal-500 text-white rounded-md hover:bg-teal-600'}>
                                {loading ? "Creating..." : "Create"}
                            </Button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={onCancel}>
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
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={onClose} >
                            Close
                        </button>
                    ),
                };
            case 'update':
                return {
                    background: 'bg-gray-50',
                    textColor: 'text-yellow-800',
                    buttons: (
                        <>
                            <Button btn_type='submit' variant="update" size="md" onClick={onConfirm} disabled={loading} loading={loading} className={'w-auto px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={onCancel}>
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
                            <Button btn_type='submit' variant="delete" size="md" onClick={onConfirm} disabled={loading} loading={loading} className={'w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'}>
                                {loading ? "Deleting..." : "Delete"}
                            </Button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={onCancel}     >
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
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={onConfirm}>
                                Confirm
                            </button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400" onClick={onCancel} >
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
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={onClose}   >
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
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={onClose}    >
                                Close
                            </button>
                        </>
                    ),
                };
        }
    };

    const { background, textColor, buttons } = getVariantStyles();

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black bg-opacity-50">
            <div className={` max-w-[90%] rounded-lg shadow-lg max-h-[90%] overflow-y-auto ${background}`}  >
                <div className={`flex justify-between items-center mb-2 z-10 sticky top-0 px-5 pt-5 pb-2 ${initial_heading_theme[`${variant}`]}`}>
                    <h3 className={`text-xl font-semibold  ${textColor}`}>{title}</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900" >
                        <IoClose className='size-7' />
                    </button>
                </div>
                <div className='pl-4 pr-4 pb-4'>
                    <div className='p-2'>
                        {children}
                    </div>
                    <div className="flex justify-end space-x-3 mt-2">{buttons}</div>
                </div>
            </div>
        </div >
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