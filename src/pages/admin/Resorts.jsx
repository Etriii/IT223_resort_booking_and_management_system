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

    const [filters, setFilters] = useState({
        paginate: 5,
        page: 1,
        resort_name: null,
        status: '',
        tax_rate: '',
        contact_details: '',
        resort_id: null,
        tax_find: '',
    });

    const getFilteredResorts = () => {
        if (filters.resort_id && Array.isArray(resorts) && resorts.length > 0) {
            const targetId = Number(filters.resort_id);
            let left = 0;
            let right = resorts.length - 1;

            while (left <= right) {
                const middle = Math.floor((left + right) / 2);
                const midId = Number(resorts[middle].id);

                if (midId === targetId) {
                    return [resorts[middle]];
                } else if (targetId < midId) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }

            return [];
        }

        if (filters.tax_find && resorts.length > 0) {
            let bestResort = resorts[0];

            for (let i = 1; i < resorts.length; i++) {
                const current = resorts[i];
                if (filters.tax_find === "max" && Number(current.tax_rate) > Number(bestResort.tax_rate)) {
                    bestResort = current;
                }
                if (filters.tax_find === "min" && Number(current.tax_rate) < Number(bestResort.tax_rate)) {
                    bestResort = current;
                }
            }

            return bestResort ? [bestResort] : [];
        }

        return resorts?.filter(resort => {
            const nameMatch = !filters.resort_name || resort.name?.toLowerCase().includes(filters.resort_name.toLowerCase());
            const statusMatch = !filters.status || resort.status?.toLowerCase() === filters.status.toLowerCase();
            const taxRateMatch = !filters.tax_rate || Number(resort.tax_rate) === Number(filters.tax_rate);
            const contactMatch = !filters.contact_details || resort.contact_details?.includes(filters.contact_details);
            return nameMatch && statusMatch && taxRateMatch && contactMatch;
        }) || [];
    };


    const filteredResorts = getFilteredResorts();
    const totalPages = Math.ceil(filteredResorts.length / filters.paginate);
    const paginatedResorts = filteredResorts.slice(
        (filters.page - 1) * filters.paginate,
        filters.page * filters.paginate
    );

    useEffect(() => {
        setFilters((prev) => ({ ...prev, page: 1 }));
    }, [filters.resort_name, filters.paginate, filters.resort_id, filters.tax_find]);

    return (
        <div>
            <Modal isOpen={modal.isOpen} onClose={closeModal} variant={modal.variant} title={modal.title} loading={modal.loading} children={modal.children}/* Here ang mga body sa imong modal */ onConfirm={handleConfirm} onCancel={() => closeModal()} />
            {notify && (<ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification>)}

            <FilterAndActions filters={filters} setFilters={setFilters} openModal={openModal} input_filter={{ key_to_filter: 'resort_name', placeholder: 'Resort Name', create_label: 'Add Resort' }} />

            <div className="mb-4 mt-2 flex space-x-2">
                <div>
                    <label htmlFor="resort-id" className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Resort ID
                    </label>
                    <input
                        id="resort-id"
                        type="number"
                        placeholder="Enter Resort ID..."
                        className=" w-40 px-4 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => {
                            setFilters(prev => ({
                                ...prev,
                                resort_id: e.target.value ? Number(e.target.value) : null
                            }));
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="tax-find" className="block text-sm font-medium text-gray-700 mb-1">
                        Find Resort by Tax Rate
                    </label>
                    <select
                        id="tax-find"
                        className="w-40 px-3 py-[4.7px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.tax_find}
                        onChange={(e) => {
                            setFilters(prev => ({ ...prev, tax_find: e.target.value }));
                        }}
                    >
                        <option value="">None</option>
                        <option value="min">Lowest Tax Rate</option>
                        <option value="max">Highest Tax Rate</option>
                    </select>
                </div>
            </div>




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