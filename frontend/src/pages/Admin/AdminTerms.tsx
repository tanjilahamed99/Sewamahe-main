import { getWebData, updateWebData } from "@/actions/admin";
import{ useState, useEffect } from "react";
import {
  FiSave,
  FiEye,
  FiEdit2,
  FiAlertCircle,
  FiFileText,
  FiCode,
} from "react-icons/fi";
import { toast } from "sonner";

function AdminTerms() {
  const [termsInfo, setTermsInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [showLegalTips, setShowLegalTips] = useState(false);

  // Calculate character count
  useEffect(() => {
    const textOnly = termsInfo?.replace(/<[^>]*>/g, "") || "";
    setCharacterCount(textOnly?.length);
  }, [termsInfo]);

  // Handle update (mock)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = formData.get("terms") as string;

    setLoading(true);
       try {
      const { data } = await updateWebData({ termsAndCondition: updatedContent });
         if (data?.success) {
        toast.success("Terms & Conditions updated successfully (mock)");
        setTermsInfo(updatedContent);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error updating terms info:", error);
    }
  };


  // Handle preview toggle
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Legal tips for users
  const legalTips = [
    "Include clear acceptance statements",
    "Define user responsibilities clearly",
    "Specify age restrictions",
    "Include limitation of liability",
    "Add modification terms",
    "Provide contact information",
    "Include privacy policy reference",
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getWebData();
        setTermsInfo(data?.data?.termsAndCondition || "");
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
            Terms & Conditions Editor
          </h1>
          <p className="text-gray-600 mt-2">
            Edit and manage your website terms and conditions
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
                Terms & Conditions Editor
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
              <button
                type="button"
                onClick={() => setShowLegalTips(!showLegalTips)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Legal Tips
              </button>
            </div>
          </div>
        </div>

        {/* Legal Tips Panel */}
        {showLegalTips && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-start">
              <FiAlertCircle className="text-yellow-600 w-5 h-5 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                  Legal Writing Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {legalTips.map((tip, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 border border-yellow-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-800">{tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-yellow-700 text-sm mt-4">
                  <strong>Note:</strong> Consult with a legal professional to
                  ensure your terms and conditions comply with applicable laws.
                </p>
              </div>
            </div>
          </div>
        )}

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
                    Terms & Conditions Content
                  </label>
                  <textarea
                    name="terms"
                    value={termsInfo}
                    onChange={(e) => setTermsInfo(e.target.value)}
                    className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="<h1>Terms and Conditions</h1><p>Your content here...</p>"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Characters: {characterCount} | Sections:{" "}
                    {(termsInfo?.match(/<h[1-6][^>]*>/gi) || []).length}
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
                        Update Terms
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm ">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiEye className="w-5 h-5 mr-2 text-green-600" />
                Live Preview
              </h3>
              <div className="border border-gray-200 rounded-lg p-6 min-h-96 overflow-auto">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: termsInfo }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                This is how your terms and conditions will appear on the website
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

export default AdminTerms;
