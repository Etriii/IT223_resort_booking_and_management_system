import Table from '../../components/ui/table/Table';
import TableData from '../../components/ui/table/TableData';
import ToggleDiv from "../../components/ui/modals/ToggleDiv";
import { FiFilter } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

import InputField from "../../components/ui/form/InputField";
import Modal from "../../components/ui/modals/Modal";
import ActionNotification from "../../components/ui/modals/ActionNotification";
import { apiFetch } from '../../utils/apiFetch';
import CreateUserModal from "./modals/CreateUserModal";

import Pagination from '../../components/ui/table/Pagination';

const Accounts = () => {

    const containerRef = useRef(null);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notify, setNotify] = useState();
    const [usernameFilter, setUsernameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [filters, setFilters] = useState({ paginate: 5, page: 1 });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVariant, setModalVariant] = useState('create');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const [createUserForm, setCreateUserForm] = useState({
        username: '',
        email: '',
        role: '',
    });

    const openModal = (variant) => {
        setModalVariant(variant);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);
    const openFilterModal = () => setIsFilterModalOpen(true);
    const closeFilterModal = () => setIsFilterModalOpen(false);

    const handleCreateUserInputChange = (e) => {
        const { name, value } = e.target;
        setCreateUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = async () => {
        if (modalVariant === 'create') {
            try {
                const response = await apiFetch('controller=User&action=createUser', {
                    method: 'POST',
                    body: JSON.stringify(createUserForm),
                });
                const result = await response.json();
                setNotify({ type: 'success', message: 'User created successfully' });

                const refetch = await apiFetch('controller=User&action=getAllUsers');
                setUsers(await refetch.json());

                closeModal();
                setCreateUserForm({ username: '', email: '', role: '' });
            } catch (error) {
                setNotify({ type: 'error', message: error.message || 'Failed to create user' });
            }
        } else {
            console.log("Other action confirmed");
            closeModal();
        }
    };

    const handleCancel = () => {
        closeModal();
    };

    useEffect(() => {
        document.title = "Users | Ocean View";

        const fetchUsers = async () => {
            try {
                const response = await apiFetch('controller=User&action=getAllUsers');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setNotify({ type: 'error', message: error.message || 'Failed to fetch users' });
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users?.filter(user => {
        const usernameMatch = user.username?.toLowerCase().includes(usernameFilter.toLowerCase());
        const statusMatch = statusFilter === 'all' || user.status?.toLowerCase() === statusFilter.toLowerCase();
        return usernameMatch && statusMatch;
    });

    const totalPages = Math.ceil(filteredUsers.length / filters.paginate);
    const paginatedUsers = filteredUsers.slice(
        (filters.page - 1) * filters.paginate,
        filters.page * filters.paginate
    );

    useEffect(() => {
        setFilters(prev => ({ ...prev, page: 1 }));
    }, [usernameFilter, statusFilter, filters.paginate]);

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                variant={modalVariant}
                title={modalVariant === 'create' ? 'Create User' : 'User Action'}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            >
                {modalVariant === 'create' && (
                    <CreateUserModal 
                        handleCreateFormInputChange={handleCreateUserInputChange} 
                        formData={createUserForm}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isFilterModalOpen}
                onClose={closeFilterModal}
                variant="filter"
                title="Filter Users"
                onConfirm={closeFilterModal}
                onCancel={closeFilterModal}
            >
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="deactivated">Deactivated</option>
                        </select>
                    </label>
                </div>
            </Modal>

            {notify && (
                <ActionNotification isOpen={true} variant={`${notify.type}`}>
                    {notify.message}
                </ActionNotification>
            )}

            <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-4">
                    <button
                        className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
                        onClick={openFilterModal}
                    >
                        <FiFilter className="text-lg" />
                        Filter
                    </button>

                    <select
                        value={filters.paginate}
                        onChange={(e) => setFilters(prev => ({ ...prev, paginate: parseInt(e.target.value) }))}
                        className="px-3 py-2 border rounded-md text-sm text-gray-700 focus:outline-green-600"
                    >
                        {[10, 20, 30, 40, 50].map(num => (
                            <option key={num} value={num}>{num} entries</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <InputField
                            value={usernameFilter}
                            onChange={(e) => setUsernameFilter(e.target.value)}
                            placeholder="Search by Username"
                        />
                    </div>
                    <button
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                        onClick={() => openModal('create')}
                    >
                        <IoMdAdd className="text-base" />
                        <span>Add User</span>
                    </button>
                </div>
            </div>

            <Table theadings={['Id', 'Profile_Photo', 'Username', 'Email', 'Role', 'Status', 'Action']} isLoading={loading} containerRef={containerRef}>
                {paginatedUsers && paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => (
                        <TableData
                            key={user.id || index}
                            columns={[
                                user.id,
                                <div className="flex justify-center items-center">
                                    <img
                                        src={user.profile_photo || '/images/user_profiles/default_profile.png'}
                                        alt="Profile"
                                        className="size-10 object-cover bg-center rounded-full border border-gray-200 shadow-lg"
                                        onError={(e) => { e.target.src = '/images/user_profiles/default_profile.png'; }}
                                    />
                                </div>,
                                user.username,
                                user.email,
                                user.role_names?.map((role, i) => (
                                    <span key={i} className="mr-1 text-gray-600 px-2 py-1 rounded">{role}</span>
                                )),
                                <span className={`${user.status === 'active' ? 'text-green-600' : 'text-red-600'} font-bold`}>
                                    {user.status}
                                </span>,
                                <ToggleDiv buttonText="Actions" containerRef={containerRef}>
                                    <div className="px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer" onClick={() => openModal('read')}>
                                        <LuEye className="size-5 mr-2" /> View
                                    </div>
                                    <div className="px-2 py-1 flex items-center text-orange-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal('update')}>
                                        <BiSolidEditAlt className="size-5 mr-2" /> Edit
                                    </div>
                                    <div className="px-2 py-1 flex items-center text-red-500 hover:bg-gray-200 cursor-pointer" onClick={() => openModal('delete')}>
                                        <MdOutlineDeleteForever className="size-5 mr-2" /> Delete
                                    </div>
                                </ToggleDiv>
                            ]}
                        />
                    ))
                ) : (
                    <tr><td colSpan={7}>No users found.</td></tr>
                )}
            </Table>

            <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages} filtered={filteredUsers} />


            {/* <div className="flex justify-between items-center mt-4 flex-wrap">
                <div>
                    <span>Showing {(filters.page - 1) * filters.paginate + 1} to {Math.min(filters.page * filters.paginate, filteredUsers.length)} of {filteredUsers.length} entries</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        disabled={filters.page === 1}
                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                        className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        &laquo;
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            className={`px-3 py-1 rounded-md ${filters.page === i + 1 ? 'bg-green-500 text-white' : 'text-green-500 hover:bg-green-100'}`}
                            onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={filters.page === totalPages}
                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                        className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        &raquo;
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default Accounts;
