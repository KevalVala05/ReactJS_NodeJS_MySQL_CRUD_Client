import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/pages/Users';

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

interface UserFormData {
  name: string;
  email: string;
}

export function UserEditModal({ user, isOpen, onClose, onSave }: UserEditModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    defaultValues: { name: '', email: '' },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    } else {
      reset({ name: '', email: '' });
    }
  }, [user, reset]);

  const submitHandler: SubmitHandler<UserFormData> = (data) => {
    const updatedUser: User = {
      id: user?.id || Date.now().toString(),
      name: data.name,
      email: data.email,
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {user ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogDescription>
            {user ? 'Update user information below.' : 'Create a new user account.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              {...register('name', { required: 'Name is required' })}
              className="h-10"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="h-10"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90 transition-all duration-300"
            >
              {user ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
