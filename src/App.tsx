import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { UserPlus, UserCog } from 'lucide-react';
import { useUsers } from './hooks/useUsers';
import { UserForm } from './components/UserForm';
import { UserTable } from './components/UserTable';
import { DeleteConfirm } from './components/DeleteConfirm';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import type { User, UserDTO } from './types/user';

type ModalState = 'create' | 'edit' | 'delete' | null;

export default function App() {
  const { users, isLoading, isError, refetch, createUser, updateUser, deleteUser, isCreating, isUpdating, isDeleting } = useUsers();
  const [modal,        setModal]        = useState<ModalState>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const openCreate = () => { setSelectedUser(null); setModal('create'); };
  const openEdit   = (user: User) => { setSelectedUser(user); setModal('edit'); };
  const openDelete = (user: User) => { setSelectedUser(user); setModal('delete'); };
  const closeModal = () => { setModal(null); setSelectedUser(null); };

  const handleCreate = async (data: UserDTO) => {
    await createUser(data);
    closeModal();
  };

  const handleUpdate = async (data: UserDTO) => {
    if (!selectedUser) return;
    await updateUser({ id: selectedUser.id, data });
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.id);
    closeModal();
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      {/* Ambient background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-brand-500/10 rounded-xl border border-brand-500/20">
                <UserCog size={22} className="text-brand-500" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                User Management
              </h1>
            </div>
            <p className="text-slate-500 text-sm ml-14">
              Manage your users with full CRUD operations
            </p>
          </div>
          <Button onClick={openCreate} icon={<UserPlus size={16} />} size="lg">
            Add User
          </Button>
        </header>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Users',  value: users.length,                      color: 'text-brand-500' },
            { label: 'Active Today', value: Math.min(users.length, 2),          color: 'text-emerald-400' },
            { label: 'Last Updated', value: new Date().toLocaleDateString(),    color: 'text-slate-400' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 font-mono ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* User Table */}
        <UserTable
          users={users}
          isLoading={isLoading}
          isError={isError}
          onEdit={openEdit}
          onDelete={openDelete}
          onRefresh={refetch}
        />
      </div>

      {/* Create Modal */}
      <Modal isOpen={modal === 'create'} onClose={closeModal} title="Create New User" maxWidth="max-w-2xl">
        <UserForm
          mode="create"
          onSubmit={handleCreate}
          onCancel={closeModal}
          isLoading={isCreating}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={modal === 'edit'} onClose={closeModal} title="Edit User" maxWidth="max-w-2xl">
        <UserForm
          mode="edit"
          defaultValues={selectedUser ?? undefined}
          onSubmit={handleUpdate}
          onCancel={closeModal}
          isLoading={isUpdating}
        />
      </Modal>

      {/* Delete Confirm */}
      <DeleteConfirm
        user={selectedUser}
        isOpen={modal === 'delete'}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color:      '#f1f5f9',
            border:     '1px solid #334155',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}