import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';
import Pagination from '../../components/ui/table/Pagination';
import FilterAndActions from '../../components/ui/table/FilterAndActions';
import ToggleDiv from "../../components/ui/modals/ToggleDiv";

import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

import Modal from "../../components/ui/modals/Modal";

import ActionNotification from "../../components/ui/modals/ActionNotification";

import { CreateResortModal, ReadResortModal, UpdateResortModal, DeleteResortModal, FilterModal } from "./modals";

import { createResort, editResort, deleteResort } from '../../services';
import { apiFetch } from '../../utils/apiFetch';

const Resorts = () => {

    const containerRef = useRef(null);
 
    const [resorts, setResorts] = useState();
    // Forms
    const [createResortForm, setCreateResortForm] = useState({
        values: { name: '', location: '', location_coordinates: '', tax_rate: '', status: '', contact_details: '' },
        errors: { name: '', location: '', location_coordinates: '', tax_rate: '', status: '', email: '', contact_details: '' }
    });

    const [editResortForm, setEditResortForm] = useState({
        values: { id: '', name: '', location: '', location_coordinates: '', tax_rate: '', status: '', contact_details: '' },
        errors: { id: '', name: 'ss', location: '', location_coordinates: '', tax_rate: '', status: '', email: '', contact_details: '' }
    });

    const [deleteResortForm, setDeleteResortForm] = useState({
        resort_id: ''
    });

    const fetchResorts = async () => {
        try {
            const response = await apiFetch(`controller=Resorts&action=getResorts`);
            const data = await response.json();
            setResorts(data);
        } catch (error) {
            setNotify({
                open: true,
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

    useEffect(() => {
        document.title = "Resorts | Ocean View";
        fetchResorts();
    }, []);

    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState({ open: '', variant: '', message: '' });

    const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });

    const openModal = (variant, resort) => {
        let children;
        let modal_title;

        switch (variant) {
            case 'create':
                children = <CreateResortModal handleCreateFormInputChange={handleCreateFormInputChange} formData={createResortForm} />;
                modal_title = 'Create Resort';
                break;
            case 'read':
                children = <ReadResortModal resort={resort} />;
                modal_title = 'View Resort';
                break;
            case 'update':
                // setEditResortForm({
                //     values: {
                //         id: resort.id || '',
                //         name: resort.name || '',
                //         location: resort.location || '',
                //         location_coordinates: resort.location_coordinates || '',
                //         tax_rate: resort.tax_rate || '',
                //         status: resort.status || '',
                //         contact_details: resort.contact_details || '',
                //     }
                // });
                children = <UpdateResortModal resort={resort} handleEditFormInputChange={handleEditFormInputChange} editResortForm={{ values: resort }} />;
                modal_title = 'Edit Resort';
                break;
            case 'delete':
                children = <DeleteResortModal resort={resort} setDeleteResortForm={setDeleteResortForm} />;
                modal_title = 'Delete Resort';
                break;
            case 'filter':
                children = <FilterModal filters={filters} setFilters={setFilters} />;
                modal_title = 'Filters';
                break;
            default:
                children = <>Nahh wala</>;
        }
        setModal({ isOpen: true, variant, children, loading: false, title: modal_title });
    };

    // useEffect(() => {
    //     if (modal.variant === 'update' && Object.keys(editResortForm.values).some(key => editResortForm.values[key] !== '')) {
    //         setModal({
    //             isOpen: true,
    //             variant: 'update',
    //             children: <UpdateResortModal handleEditFormInputChange={handleEditFormInputChange} editResortForm={editResortForm} />,
    //             loading: false,
    //             title: 'Edit Resort'
    //         });
    //     }
    // }, [modal.variant, editResortForm]);

    // Modal rendering:
    // {
    //     modal.isOpen && (
    //         modal.variant === 'update' ? (
    //             isOpeningUpdateModal ? (
    //                 <UpdateResortModal handleEditFormInputChange={handleEditFormInputChange} editResortForm={editResortForm} />
    //             ) : null // Or a loading state if needed
    //         ) : (
    //             modal.children
    //         )
    //     )
    // }

    const closeModal = () => {
        setModal(prev => ({ ...prev, isOpen: false }));
    };

    //i forgot e lahi man day dapat mi sila :> 
    const handleCreateFormInputChange = (e) => {
        const { name, value } = e.target;
        setCreateResortForm(prev => ({
            ...prev,
            values: {
                ...prev.values,
                [name]: value
            }
        }));
    };

    // const handleEditFormInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditResortForm(prev => ({
    //         ...prev,
    //         values: {
    //             ...prev.values,
    //             [name]: value
    //         }
    //     }));
    // }; 
    const handleEditFormInputChange = (allValues) => {
        setEditResortForm(prev => ({
            ...prev,
            values: allValues
        }));
    };
    // END FORM

    const handleConfirm = () => {

        setModal(prev => ({ ...prev, loading: true }));//pang loading rani sa button
        setNotify({}); //reset ang notif ni ha

        setTimeout(async () => {
            let result;

            try {
                switch (modal.variant) {
                    case 'create':
                        result = await createResort(createResortForm.values);
                        break;
                    case 'update':
                        // console.log(editResortForm.values);
                        result = await editResort(editResortForm.values);
                        break;
                    case 'delete':
                        result = await deleteResort(deleteResortForm.resort_id);
                        break;
                    default:
                        throw new Error("Unknown action mode");
                }
            } catch (error) {
                setModal(prev => ({ ...prev, loading: false }));
                setNotify({
                    open: true,
                    type: 'error',
                    message: error.message || 'Something went wrong!'
                });
                return;
            }

            setModal(prev => ({ ...prev, loading: false }));

            if (result.success) {
                fetchResorts();
                setNotify({
                    open: true,
                    type: modal.variant,
                    message: result.message
                });
                closeModal();
            } else {
                setNotify({
                    open: true,
                    type: 'error',
                    message: result.message
                });
            }
        }, 1000);
    };

    // Table Filters

    const [filters, setFilters] = useState({ paginate: 5, page: 1, resort_name: null, status: '', tax_rate: '', contact_details: '', });

    const filteredResorts = resorts?.filter(resort => {
        const nameMatch = !filters.resort_name || resort.name?.toLowerCase().includes(filters.resort_name.toLowerCase());
        const statusMatch = !filters.status || resort.status?.toLowerCase() === filters.status.toLowerCase();
        const taxRateMatch = !filters.tax_rate || Number(resort.tax_rate) === Number(filters.tax_rate);
        const contactMatch = !filters.contact_details || resort.contact_details?.includes(filters.contact_details);

        return nameMatch && statusMatch && taxRateMatch && contactMatch;
    }) || [];

    const totalPages = Math.ceil(filteredResorts.length / filters.paginate);
    const paginatedResorts = filteredResorts.slice((filters.page - 1) * filters.paginate, filters.page * filters.paginate);

    useEffect(() => {
        setFilters((prev) => ({ ...prev, page: 1 }));
    }, [filters.resort_name, filters.paginate]);

    return (
        <div>
            <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />
            {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}

            <FilterAndActions filters={filters} setFilters={setFilters} openModal={openModal} input_filter={{ key_to_filter: 'resort_name', placeholder: 'Resort Name', create_label: 'Add Resort' }} />

            <Table theadings={['id', 'resort name', 'tax rate', 'status', 'contact_details', 'created_at', 'actions']} isLoading={loading} containerRef={containerRef} >
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
                                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                                    <div className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('read', resort) }}> <LuEye className="size-5 mr-2" />View </div>
                                    <div className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('update', resort) }}> <BiSolidEditAlt className="size-5 mr-2" />Edit </div>
                                    <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => { openModal('delete', resort) }}> <MdOutlineDeleteForever className="size-5 mr-2" />Delete </div>
                                </ToggleDiv>
                            ]}
                        />
                    ))
                ) : (
                    <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No resorts found.</div></td></tr>
                )}
            </Table>

            <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filtered={filteredResorts} />

        </div>
    );
}

export default Resorts;