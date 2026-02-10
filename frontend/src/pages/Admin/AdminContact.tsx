import { deleteContact, getAllContact } from "@/actions/admin";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiCalendar,
  FiEye,
  FiTrash2,
  FiDownload,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import { toast } from "sonner";

function AdminContact() {
  const [contactList, setContactList] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Calculate stats
  const stats = {
    total: contactList.length,
  };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(contactList.map((item) => item.subject)),
  ];

  // Fetch contacts (mock)
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const { data } = await getAllContact();
      if (data.success) {
        setContactList(data.data);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = contactList;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(lowerSearch) ||
          contact.email?.toLowerCase().includes(lowerSearch) ||
          contact.subject?.toLowerCase().includes(lowerSearch) ||
          contact.message?.toLowerCase().includes(lowerSearch) ||
          contact.phone?.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filterCategory !== "All") {
      result = result.filter((contact) => contact.subject === filterCategory);
    }

    // Sort by date (newest first)
    result = [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredContacts(result);
  }, [searchTerm, filterStatus, filterCategory, contactList]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryFilter = (e) => {
    setFilterCategory(e.target.value);
  };

  // Handle view message
  const handleViewMessage = (contact) => {
    setSelectedMessage(contact);
    setShowMessageModal(true);
    // Mark as read if unread
    if (contact.status === "unread") {
      setContactList((prev) =>
        prev.map((item) =>
          item._id === contact._id ? { ...item, status: "read" } : item
        )
      );
    }
  };

  // Handle delete message
  const handleDeleteMessage = async (id) => {
    try {
      const { data } = await deleteContact({ contactId: id });
      if(data.success){
        setContactList((prev) => prev.filter((item) => item._id !== id));
        setFilteredContacts((prev) => prev.filter((item) => item._id !== id));
        setSelectedMessages((prev) => prev.filter((msgId) => msgId !== id));
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Handle select/deselect message
  const handleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages((prev) => prev.filter((msgId) => msgId !== id));
    } else {
      setSelectedMessages((prev) => [...prev, id]);
    }
  };
  // Category badge component
  const CategoryBadge = ({ subject }) => {
    const colors = {
      general: "bg-blue-100 text-blue-800",
      technical: "bg-green-100 text-green-800",
      feedback: "bg-yellow-100 text-yellow-800",
      business: "bg-purple-100 text-purple-800",
      consultant: "bg-red-100 text-red-800",
      billing: "bg-orange-100 text-orange-800",
      report: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          colors[subject] || "bg-gray-100 text-gray-800"
        }`}>
        {subject}
      </span>
    );
  };

  return (
    <div
      className="h-full overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "calc(100vh - 64px)",
        scrollBehavior: "smooth",
      }}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Contact Submissions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and respond to user messages and inquiries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiMail className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Bulk Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or message content..."
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Filter and Bulk Actions */}
            <div className="flex flex-wrap gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterCategory}
                onChange={handleCategoryFilter}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Messages Grid (Card System) */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <FiMail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                  contact.status === "unread"
                    ? "border-l-4 border-l-red-500"
                    : contact.status === "replied"
                    ? "border-l-4 border-l-green-500"
                    : "border-gray-200"
                }`}>
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(contact._id)}
                          onChange={() => handleSelectMessage(contact._id)}
                          className="rounded border-gray-300"
                        />
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {contact.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 mt-1">
                        {new Date(contact.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Subject and Category */}
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {contact.subject}
                    </h4>
                    <CategoryBadge subject={contact.subject} />
                  </div>

                  {/* Message Preview */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {contact.message}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1 mb-1">
                      <FiUser className="w-3 h-3" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      <span>
                        {new Date(contact.createdAt).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewMessage(contact)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
                      <FiEye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(contact._id)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium">
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message View Modal */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-500">
                        {new Date(selectedMessage.createdAt).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Sender Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-medium text-gray-900">
                        {selectedMessage.name}
                      </div>
                      <div className="text-gray-600">
                        {selectedMessage.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Contact</div>
                      <div className="font-medium text-gray-900">
                        {selectedMessage.phone}
                      </div>
                      <div className="text-gray-600">
                        Submitted:{" "}
                        {new Date(
                          selectedMessage.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">Message</div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Reply Section */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default AdminContact;
