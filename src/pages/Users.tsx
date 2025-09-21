import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserEditModal } from '@/components/UserEditModal';
import { UserDeleteModal } from '@/components/UserDeleteModal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { showSuccessToast } from '@/utils/toastUtils';
import { useAppDispatch } from '@/store/store';
import { getUsers, createUser, updateUser, deleteUser } from '@/redux/userSlice';
import { setAuthToken } from "../../api";

export interface User {
  id: string;
  name: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserState, setDeleteUserState] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const getUsersList = async () => {
    dispatch(getUsers())
      .then((result) => setUsers(result))
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleAddUser = () => {
    setEditUser(null);
    setIsEditModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setDeleteUserState(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = async (user: User) => {
    try {
      if (editUser) {
        // Update existing user
        await dispatch(updateUser(editUser.id, user));
        showSuccessToast(`${user.name} updated successfully`);
      } else {
        // Create new user
        await dispatch(createUser(user));
        showSuccessToast(`${user.name} created successfully`);
      }
      getUsersList();
      setIsEditModalOpen(false);
      setEditUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteUserState) {
      try {
        await dispatch(deleteUser(deleteUserState.id));
        showSuccessToast(`${deleteUserState.name} deleted successfully`);
        getUsersList();
        setDeleteUserState(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    getUsersList();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">Manage user accounts.</p>
        </div>
        <Button onClick={handleAddUser} className="bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-soft">
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      <Card className="border-0 bg-gradient-surface shadow-soft pt-7">
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users?.length ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={user.name} alt={user.name} />
                          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UserEditModal
        user={editUser}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditUser(null);
        }}
        onSave={handleSaveUser}
      />

      <UserDeleteModal
        user={deleteUserState}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteUserState(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Users;
