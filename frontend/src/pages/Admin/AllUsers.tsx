import { deleteUser, getAllUsers, updateUser } from "@/actions/admin";
import { register } from "@/actions/auth";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiUserPlus, FiX, FiUser, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const contentRef = useRef(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "user",
    password: "",
    username: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data: users } = await getAllUsers();
      setUsers(users);
      setFilteredUsers(users);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          user?.lastName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          user?._id?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (filterRole !== "all") {
      result = result.filter((user) => user.type === filterRole);
    }

    setFilteredUsers(result);
  }, [searchTerm, filterStatus, filterRole, users]);

  // Auto-scroll to top when data changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [filteredUsers]);

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmEditUser = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      const { data } = await deleteUser({ data: { userId: userToDelete._id } });
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      setFilteredUsers(filteredUsers.filter((u) => u._id !== userToDelete._id));
      setToggleCleared(!toggleCleared);
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      // Logic to add a new user
      const reg = await register({
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        type: formData.type,
        password: formData.password,
        repeatPassword: formData.password,
      });

      if (reg.data.token) {
        setUsers([...users, reg.data.user]);
        setFilteredUsers([...filteredUsers, reg.data.user]);
        setCreateModalOpen(false);
        setIsSubmitting(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          type: "user",
          password: "",
          username: "",
        });
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setErrorMessage(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = userToEdit._id;
    const form = e.target;
    const username = form.username.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    setIsSubmitting(true);

    try {
      const res = await updateUser({
        userId: id,
        username,
        firstName,
        lastName,
        email,
        password,
      });
      if (res.data.success) {
        const updatedUser = res.data.user;
        const updatedUsers = users.map((user) =>
          user._id === id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setIsEditing(false);
        setUserToEdit(null);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      setErrorMessage(error.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div
      ref={contentRef}
      className="h-full overflow-auto w-full bg-gray-50"
      style={{ scrollBehavior: "smooth" }}>
      {/* Mobile Back Button */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center px-4 py-3">
          <Link to="/dashboard" className="mr-4">
            <button className="text-xl text-gray-700 hover:text-black">
              <FiArrowLeft />
            </button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">All Users</h1>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Desktop Header */}
        <div className="hidden md:block mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                All Users
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and monitor all registered users
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                <FiUserPlus className="w-5 h-5" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile Stack, Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FiUser className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Dropdowns - Stack on mobile, row on desktop */}
            <div className="flex flex-wrap gap-2">
              <select
                className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="Consultant">Consultant</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table/Cards Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden sm:block p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              User Management
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Manage and monitor all user accounts
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 md:p-12 text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-2 md:border-4 border-black border-t-transparent"></div>
              </div>
              <div className="text-gray-500 mt-4 text-sm md:text-base">
                Loading users...
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredUsers.length === 0 && (
            <div className="p-8 md:p-12 text-center">
              <div className="text-gray-500 text-base md:text-lg mb-2">
                No users found
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                Try adjusting your search or filters
              </div>
            </div>
          )}

          {/* Desktop Table (hidden on mobile) */}
          {!loading && filteredUsers.length > 0 && (
            <>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        #
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user._id || index}
                        className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.type === "Admin"
                                ? "bg-gray-100 text-gray-800"
                                : user.type === "Consultant"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {user.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button
                            onClick={() => confirmEditUser(user)}
                            className="text-gray-600 hover:text-black mr-3">
                            Edit
                          </button>
                          <button
                            onClick={() => confirmDeleteUser(user)}
                            className="text-red-600 hover:text-red-800">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Desktop Pagination */}
                <div className="px-4 py-3 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredUsers.length}
                      </span>{" "}
                      results
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Cards (shown on mobile) */}
              <div className="sm:hidden">
                {filteredUsers.map((user, index) => (
                  <div
                    key={user._id || index}
                    className="border-b border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {user.email}
                        </p>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {user.type}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => confirmEditUser(user)}
                          className="text-sm text-gray-600 hover:text-black">
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDeleteUser(user)}
                          className="text-sm text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && userToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete user
                <span className="font-semibold">{userToDelete.name}</span> (
                {userToDelete.userId})? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}>
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  onClick={handleDeleteUser}>
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create User Modal */}
        {createModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New User
                </h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Name *
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="Consultant">Consultant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <p className="text-sm text-red-500 font-bold mt-2">
                  {errorMessage}
                </p>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    onClick={() => setCreateModalOpen(false)}
                    disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-4 h-4" />
                        Create User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update User
                </h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Name *
                      </label>
                      <input
                        type="text"
                        name="username"
                        defaultValue={userToEdit.username}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        defaultValue={userToEdit.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={userToEdit.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={userToEdit.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      defaultValue={userToEdit.password}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <p className="text-sm text-red-500 font-bold mt-2">
                  {errorMessage}
                </p>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    onClick={() => setIsEditing(false)}
                    disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        updating...
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-4 h-4" />
                        Update
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom spacing for mobile */}
        <div className="h-4 md:h-8"></div>
      </div>
    </div>
  );
};

export default AllUsers;
