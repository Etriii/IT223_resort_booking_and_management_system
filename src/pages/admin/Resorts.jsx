import AdminLayout from "../../layouts/AdminLayout";
import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';
import ActionNotification from "../../components/ui/modals/ActionNotification";
import ToggleDiv from "../../components/ui/modals/ToggleDiv";

import { FiFilter } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import InputField from "../../components/ui/form/InputField";
import Modal from "../../components/ui/modals/Modal";

const Resorts = () => {

    const [resorts, setResorts] = useState();
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState('create'); // Default to create

    const openModal = (variant) => {
        setModalVariant(variant);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleConfirm = () => {
        console.log("Action Confirmed");
        closeModal();
    };

    const handleCancel = () => {
        console.log("Action Canceled");
        closeModal();
    };


    useEffect(() => {

        document.title = "Resorts | Ocean View";
        const fetchResorts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api.php?controller=Resorts&action=getResorts`);
                const data = await response.json();
                setResorts(data);
            } catch (error) {
                setNotify({
                    type: 'error',
                    message: error.message || 'Something went wrong!',
                });
            } finally {
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 500);

                return () => clearTimeout(timer);
            }
        };

        fetchResorts();
    }, []);

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                variant={modalVariant}
                title={
                    modalVariant === 'create'
                        ? 'Create Item'
                        : modalVariant === 'read'
                            ? 'View Item'
                            : modalVariant === 'update'
                                ? 'Edit Item'
                                : modalVariant === 'delete'
                                    ? 'Delete Item'
                                    : modalVariant === 'confirmation'
                                        ? 'Are you sure?'
                                        : 'Information'
                }
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            >
                yes
            </Modal>
            {notify && (
                <ActionNotification isOpen={true} variant={`${notify.type}`}>
                    {notify.message}
                </ActionNotification>
            )}
            <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                        <FiFilter className="text-lg" />
                        Filter
                    </button>

                    <select className="px-3 py-2 border rounded-md text-sm text-gray-700 focus: outline-green-600">
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} entries</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <span>username:</span>
                        <InputField />
                    </div>
                    <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition flex space-x-1 items-center text-nowrap" onClick={() => openModal('create')}>
                        <IoMdAdd /> <span>Add Resort</span>
                    </button>
                </div>
            </div>


            <Table theadings={['id', 'resort name', 'tax rate', 'status', 'contact_details', 'created_at', 'actions']} isLoading={loading}>
                {resorts && resorts.length > 0 ? (
                    resorts.map((resort, index) => (
                        <TableData
                            key={resort.id || index}
                            columns={[
                                resort.id,
                                resort.name || 'Resort Name',
                                (resort.tax_rate ?? '12') + '%',
                                resort.status || 'Active',
                                resort.contact_details || '09633127462',
                                resort.created_at || '2025-04-24',
                                <ToggleDiv buttonText="Actions">
                                    <div className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => openModal('read')}> <LuEye className="size-5 mr-2" />View </div>
                                    <div className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal('update')}> <BiSolidEditAlt className="size-5 mr-2" />Edit </div>
                                    <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal('delete')}> <MdOutlineDeleteForever className="size-5 mr-2" />Delete </div>
                                </ToggleDiv>
                            ]}
                        />
                    ))
                ) : (<tr></tr>)}
            </Table>

            <div className="flex md:justify-between md:items-center md:flex-row p-2 flex-wrap justify-center items-center flex-col-reverse space-y-2">
                <div>
                    <span>Showing n of n entries</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &laquo;
                    </button>
                    <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &lt;
                    </button>
                    <button className="px-3 py-1 rounded-md bg-green-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-500">
                        1
                    </button>
                    <button className="px-3 py-1 rounded-md text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        2
                    </button>
                    <button className="px-3 py-1 rounnded-md text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        3
                    </button>
                    <span className="text-gray-400">...</span>
                    <button className="px-3 py-1 rounded-md text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        10
                    </button>
                    <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &gt;
                    </button>
                    <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &raquo;
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Resorts;