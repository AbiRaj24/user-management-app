import { AlertTriangle } from 'lucide-react';
import type { User } from '../types/user';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface DeleteConfirmProps {
  user:       User | null;
  isOpen:     boolean;
  isLoading:  boolean;
  onConfirm:  () => void;
  onCancel:   () => void;
}

export function DeleteConfirm({ user, isOpen, isLoading, onConfirm, onCancel }: DeleteConfirmProps) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete User" maxWidth="max-w-sm">
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
          <AlertTriangle size={22} className="text-red-400" />
        </div>
        <p className="text-slate-300">
          Are you sure you want to delete{' '}
          <span className="font-bold text-slate-100">
            {user.firstName} {user.lastName}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={isLoading} className="flex-1">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}