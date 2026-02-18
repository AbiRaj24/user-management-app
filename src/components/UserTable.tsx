import { Edit2, Trash2, RefreshCw, Users } from 'lucide-react';
import type { User } from '../types/user';
import { Button } from './ui/Button';
import { FORM_FIELDS } from '../config/formFields';

interface UserTableProps {
  users:      User[];
  isLoading:  boolean;
  isError:    boolean;
  onEdit:     (user: User) => void;
  onDelete:   (user: User) => void;
  onRefresh:  () => void;
}

// Build table columns dynamically from field config
const TABLE_COLUMNS = FORM_FIELDS.map((f) => ({
  key:   f.name,
  label: f.label,
}));

function LoadingSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <tr key={i} className="border-b border-border/50">
          {TABLE_COLUMNS.map((col) => (
            <td key={col.key} className="px-4 py-3">
              <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
            </td>
          ))}
          <td className="px-4 py-3">
            <div className="h-4 bg-white/10 rounded animate-pulse w-16" />
          </td>
        </tr>
      ))}
    </>
  );
}

export function UserTable({ users, isLoading, isError, onEdit, onDelete, onRefresh }: UserTableProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-500/10 rounded-lg">
            <Users size={18} className="text-brand-500" />
          </div>
          <div>
            <h2 className="font-bold text-slate-100">All Users</h2>
            <p className="text-xs text-slate-500">
              {users.length} {users.length === 1 ? 'record' : 'records'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          loading={isLoading}
          icon={<RefreshCw size={14} />}
        >
          Refresh
        </Button>
      </div>

      {/* Error state */}
      {isError && (
        <div className="m-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          ⚠️ Failed to load users. Make sure JSON Server is running on port 3001.
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMNS.length + 1} className="px-4 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <Users size={32} className="opacity-20" />
                    <p>No users found. Create your first user!</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr
                  key={user.id}
                  className="border-b border-border/50 hover:bg-white/5 transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {TABLE_COLUMNS.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-slate-300">
                      {user[col.key as keyof User] as string ?? '—'}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(user)}
                        icon={<Edit2 size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(user)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        icon={<Trash2 size={14} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}