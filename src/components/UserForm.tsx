import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORM_FIELDS } from '../config/formFields';
import { USER_SCHEMA } from '../utils/validation';
import { Input, Textarea } from './ui/Input';
import { Button } from './ui/Button';
import { Save, X } from 'lucide-react';
import type { UserDTO, User } from '../types/user';

interface UserFormProps {
  defaultValues?: Partial<User>;
  onSubmit:       (data: UserDTO) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
  mode:           'create' | 'edit';
}

export function UserForm({ defaultValues, onSubmit, onCancel, isLoading, mode }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserDTO>({
    resolver:      zodResolver(USER_SCHEMA),
    defaultValues: defaultValues as UserDTO,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Schema-driven field rendering */}
      <div className="grid grid-cols-2 gap-4">
        {FORM_FIELDS.map((field) => {
          const colClass = field.colSpan === 2 ? 'col-span-2' : 'col-span-2 sm:col-span-1';
          const error    = errors[field.name as keyof UserDTO]?.message as string | undefined;

          if (field.type === 'textarea') {
            return (
              <div key={field.name} className={colClass}>
                <Textarea
                  label={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  error={error}
                  {...register(field.name as keyof UserDTO)}
                />
              </div>
            );
          }

          return (
            <div key={field.name} className={colClass}>
              <Input
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                error={error}
                {...register(field.name as keyof UserDTO)}
              />
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} icon={<X size={14} />}>
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          disabled={mode === 'edit' && !isDirty}
          icon={<Save size={14} />}
        >
          {mode === 'create' ? 'Create User' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}