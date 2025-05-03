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

import { CreateResortModal, ReadResortModal, UpdateResortModal, DeleteResortModal } from "./modals";

const Resorts = () => {

    const containerRef = useRef(null);

    const [resorts, setResorts] = useState();
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

    const [loading, setLoading] = useState(true);

    const [notify, setNotify] = useState();

    const [modal, setModal] = useState({ isOpen: false, variant: 'default', children: <div></div>, loading: false, title: '' });

    const openModal = (variant, resort) => {
        let children;
        let modal_title = '';

        switch (variant) {
            case 'create':
                children = <CreateResortModal handleFormInputChange={handleFormInputChange} formData={createResortFormData} />;
                modal_title = 'Create Resort';
                break;
            case 'read':
                children = <ReadResortModal />;
                modal_title = 'View Resort';
                break;
            case 'update':
                children = <UpdateResortModal />;
                modal_title = 'Edit Resort';
                break;
            case 'delete':
                children = <DeleteResortModal />;
                modal_title = 'Delete Resort';
                break;
            case 'filter':
                children = <div>Wala pakoi ma huna^2 an aning unsay filteron</div>;
                modal_title = 'filter';
                break;
            default:
                children = <>Nahh wala</>;
        }

        setModal({ isOpen: true, variant, children, loading: false, title: modal_title });
    };

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

    const handleConfirm = () => {

        setModal(prev => ({ ...prev, loading: true }));//pang loading rani sa button

        // Check where 
        // Validation

        const timer = setTimeout(() => {//for delay rani
            setModal(prev => ({ ...prev, loading: false }));//pang remove nga loading button

            console.log("Form submitted:", createResortFormData);

            setNotify({
                open: true,
                type: 'create',
                message: 'Resort Successfully Created!'
            });
            closeModal();
        }, 500);

        setNotify({}); //reset ang notif ni ha
    };

    // Table Filters

    const [filters, setFilters] = useState({ paginate: 10, page: 1, resort_name: null, status: '', tax_rate: '', contact_details: '', });

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
            {notify && ( <ActionNotification isOpen={notify.open} variant={`${notify.type}`}> {notify.message} </ActionNotification> )}

            <FilterAndActions filters={filters} setFilters={setFilters} openModal={openModal} add_title={'Add Resort'} />

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
                                    <div className=" px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => openModal('read')}> <LuEye className="size-5 mr-2" />View </div>
                                    <div className=" px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal('update')}> <BiSolidEditAlt className="size-5 mr-2" />Edit </div>
                                    <div className=" px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal('delete')}> <MdOutlineDeleteForever className="size-5 mr-2" />Delete </div>
                                </ToggleDiv>
                            ]}
                        />
                    ))
                ) : (
                    <tr><td colSpan={7}><div className=" p-2 border border-gray-100">No resorts found.</div></td></tr>
                )}
            </Table>

            <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filteredResorts={filteredResorts} />

        </div>
    );
}

export default Resorts;