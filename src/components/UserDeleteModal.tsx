import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { User } from '@/data/mockUsers';

interface UserDeleteModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function UserDeleteModal({ user, isOpen, onClose, onConfirm }: UserDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-left">
                Delete User
              </DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{user?.name}</strong>? 
            This will permanently remove the user account and all associated data.
          </p>
          
          <div className="mt-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="text-xs text-destructive">
                <p className="font-medium">This action is permanent</p>
                <p>The user account and all data will be permanently deleted.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            variant="destructive"
            className="hover:bg-destructive/90 transition-all duration-300"
          >
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}