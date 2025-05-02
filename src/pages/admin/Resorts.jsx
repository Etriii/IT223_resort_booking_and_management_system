import AdminLayout from "../../layouts/AdminLayout";
import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';
import ToggleDiv from "../../components/ui/modals/ToggleDiv";

import { FiFilter } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";

import InputField from "../../components/ui/form/InputField";
import Modal from "../../components/ui/modals/Modal";

import ActionNotification from "../../components/ui/modals/ActionNotification";

import { CreateResortModal, ReadResortModal, UpdateResortModal, DeleteResortModal } from "./modals";

const Resorts = () => {

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

    const [resorts, setResorts] = useState();
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState();

    const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false });

    const closeModal = () => {
        setModal(prev => ({ ...prev, isOpen: false }));
    };

    const [createResortFormData, setCreateResortFormData] = useState({
        name: '', location: '', location_coordinates: '', tax_rate: '', status: '', contact_details: ''
    });

    // const [createResortFormDataError, setCreateResortFormDataError] = useState({
    //     name: '', location: '', location_coordinates: '', tax_rate: '', status: '', email: '', contact_details: ''
    // });

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setCreateResortFormData(prev => ({ ...prev, [name]: value }));
    };

    const openModal = (variant, resort) => {
        let children;

        switch (variant) {
            case 'create':
                children = <CreateResortModal handleFormInputChange={handleFormInputChange} formData={createResortFormData} />;
                break;
            case 'read':
                children = <ReadResortModal />;
                break;
            case 'update':
                children = <UpdateResortModal />;
                break;
            case 'delete':
                children = <DeleteResortModal />;
                break;
            default:
                children = <>Nahh wala</>;
        }

        setModal({ isOpen: true, variant, children, loading: false });
    };

    const handleConfirm = () => {

        setModal(prev => ({ ...prev, loading: true }));//pang loading rani sa button

        // Check where 
        // Validation

        const timer = setTimeout(() => {
            setModal(prev => ({ ...prev, loading: false }));//pang remove nga loading button

            console.log("Form submitted:", createResortFormData);


            setNotify({
                open: true,
                type: 'create',
                message: 'Resort Successfully Created!'
            });
            closeModal();
        }, 2000);

        setNotify({});
    };


    // Table Filters

    const [filters, setFilters] = useState({
        paginate: 10,
        page: 1,
        resort_name: null,
        status: '',
        tax_rate: '',
        contact_details: '',
    });

    const filteredResorts = resorts?.filter(resort => {
        const nameMatch = !filters.resort_name || resort.name?.toLowerCase().includes(filters.resort_name.toLowerCase());
        const statusMatch = !filters.status || resort.status?.toLowerCase() === filters.status.toLowerCase();
        const taxRateMatch = !filters.tax_rate || String(resort.tax_rate) === String(filters.tax_rate);
        const contactMatch = !filters.contact_details || resort.contact_details?.includes(filters.contact_details);

        // return nameMatch;
        return nameMatch && statusMatch && taxRateMatch && contactMatch;
    }) || [];

    const totalPages = Math.ceil(filteredResorts.length / filters.paginate);
    const paginatedResorts = filteredResorts.slice(
        (filters.page - 1) * filters.paginate,
        filters.page * filters.paginate
    );

    useEffect(() => {
        setFilters((prev) => ({ ...prev, page: 1 }));
    }, [filters.resort_name, filters.paginate]);


    return (
        <div>
            <Modal isOpen={modal.isOpen}
                onClose={closeModal}
                variant={modal.variant}
                title={modal.variant === 'create' ?
                    'Create Resort' : modal.variant === 'read' ?
                        'View Resort' : modal.variant === 'update' ?
                            'Edit Resort' : modal.variant === 'delete' ?
                                'Delete Resort' : modal.variant === 'confirmation' ?
                                    'Are you sure?' : 'Information'
                }
                loading={modal.loading}
                children={modal.children}/* Here ang mga body sa imong modal */
                onConfirm={handleConfirm}
                onCancel={() => closeModal()}
            />
            {notify && (
                <ActionNotification isOpen={notify.open} variant={`${notify.type}`}>
                    {notify.message}
                </ActionNotification>
            )}
            <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                        <FiFilter className="text-lg" />
                        Filter
                    </button>

                    <select value={filters.paginate} onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            paginate: parseInt(e.target.value, 10),
                        }))
                    } className="bg-gray-100 rounded p-1">
                        {[...Array(5)].map((_, i) => (
                            <option key={i + 1} value={(i + 1) * 10}>
                                {(i + 1) * 10} entries
                            </option>
                        ))}
                    </select>

                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <InputField placeholder="Username" value={filters.resort_name || ''} onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                resort_name: e.target.value
                            }))
                        } />
                    </div>
                    <button className="px-3 py-[7px] bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition flex space-x-1 items-center text-nowrap" onClick={() => openModal('create')}>
                        <IoMdAdd /> <span>Add Resort</span>
                    </button>
                </div>
            </div>

            <Table theadings={['id', 'resort name', 'tax rate', 'status', 'contact_details', 'created_at', 'actions']} isLoading={loading}>
                {filteredResorts.length > 0 ? (
                    paginatedResorts.map((resort, index) => (
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
                ) : (
                    <tr><td colSpan={7}>No resorts found.</td></tr>
                )}

            </Table>

            <div className="flex md:justify-between md:items-center md:flex-row p-2 flex-wrap justify-center items-center flex-col-reverse space-y-2">
                <div>
                    <span>
                        Showing {(filters.page - 1) * filters.paginate + 1}
                        –
                        {Math.min(filters.page * filters.paginate, filteredResorts.length)} of {filteredResorts.length} entries
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    {/* First */}
                    <button
                        onClick={() => setFilters(prev => ({ ...prev, page: 1 }))}
                        disabled={filters.page === 1}
                        className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        &laquo;
                    </button>

                    {/* Prev */}
                    <button
                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                        disabled={filters.page === 1}
                        className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        &lt;
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                            className={`px-3 py-1 rounded-md ${filters.page === i + 1
                                ? 'bg-green-500 text-white font-semibold'
                                : 'text-green-500 hover:bg-green-100'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                        disabled={filters.page === totalPages}
                        className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        &gt;
                    </button>

                    {/* Last */}
                    <button
                        onClick={() => setFilters(prev => ({ ...prev, page: totalPages }))}
                        disabled={filters.page === totalPages}
                        className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        &raquo;
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Resorts;