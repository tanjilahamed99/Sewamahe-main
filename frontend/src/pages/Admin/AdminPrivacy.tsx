import { getWebData, updateWebData } from "@/actions/admin";
import { useState, useEffect } from "react";
import { FiSave, FiEye, FiEdit2, FiCode, FiFileText } from "react-icons/fi";
import { toast } from "sonner";

function AdminPrivacy() {
  const [privacyInfo, setPrivacyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Calculate character count and extract data types
  useEffect(() => {
    const textOnly = privacyInfo?.replace(/<[^>]*>/g, "");
    setCharacterCount(textOnly?.length || 0);
  }, [privacyInfo]);

  // Handle update (mock)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = formData.get("privacy") as string;

    setLoading(true);
    try {
      const { data } = await updateWebData({ privacy: updatedContent });
      if (data?.success) {
        toast.success("Privacy Policy updated successfully (mock)");
        setPrivacyInfo(updatedContent);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error updating about info:", error);
    }
  };

  // Handle preview toggle
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getWebData();
        setPrivacyInfo(data?.data?.privacy || "");
      } catch (err) {
        console.error("Error fetching terms info:", err);
      }
    };
    fetch();
  }, []);

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
            Privacy Policy Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Edit and manage your website privacy policy
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Characters</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {characterCount}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiFileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 capitalize">
                  {previewMode ? "Preview" : "Edit"}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiCode className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Editor/Preview Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Privacy Policy Editor
              </h2>
              <p className="text-gray-500 text-sm">
                Edit HTML content and preview how it will appear on your website
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={togglePreview}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  previewMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}>
                <FiEye className="inline-block w-4 h-4 mr-2" />
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="mb-8">
          {/* Editor Panel */}
          {!previewMode ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiEdit2 className="w-5 h-5 mr-2 text-blue-600" />
                HTML Editor
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Privacy Policy Content
                  </label>
                  <textarea
                    name="privacy"
                    value={privacyInfo}
                    onChange={(e) => setPrivacyInfo(e.target.value)}
                    className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="<h1>Privacy Policy</h1><p>Your content here...</p>"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Characters: {characterCount}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Update Policy
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiEye className="w-5 h-5 mr-2 text-green-600" />
                Live Preview
              </h3>
              <div className="border border-gray-200 rounded-lg p-6 min-h-96 overflow-auto">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: privacyInfo }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                This is how your privacy policy will appear on the website
              </div>
            </div>
          )}
        </div>
        {/* Bottom padding for better scrolling */}
        <div className="h-6 md:h-8"></div>
      </div>
    </div>
  );
}

export default AdminPrivacy;
