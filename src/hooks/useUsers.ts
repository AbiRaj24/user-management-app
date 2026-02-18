import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { UserDTO } from '../types/user';
import toast from 'react-hot-toast';

const QUERY_KEY = ['users'] as const;

export function useUsers() {
  const queryClient = useQueryClient();

  // ─── Read ────────────────────────────────────────────────────
  const {
    data:    users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn:  userApi.getAll,
  });

  // ─── Create ──────────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: userApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('User created successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create user');
    },
  });

  // ─── Update ──────────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserDTO> }) =>
      userApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('User updated successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update user');
    },
  });

  // ─── Delete ──────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: userApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('User deleted successfully!');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete user');
    },
  });

  return {
    users,
    isLoading,
    isError,
    error,
    refetch,
    createUser:  createMutation.mutateAsync,
    updateUser:  updateMutation.mutateAsync,
    deleteUser:  deleteMutation.mutateAsync,
    isCreating:  createMutation.isPending,
    isUpdating:  updateMutation.isPending,
    isDeleting:  deleteMutation.isPending,
  };
}