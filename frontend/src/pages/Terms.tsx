import { useEffect, useState } from "react";
import getWebsiteInfo from "@/actions/getWebsiteInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  Scale,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  Shield,
  User,
  Clock,
  Globe,
  Lock,
  MessageSquare,
  CreditCard,
  Users,
  TrendingUp,
  BarChart,
  HelpCircle,
  BookOpen,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  const [termsData, setTermsData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        const { data } = await getWebsiteInfo();
        if (data?.data?.termsAndCondition) {
          setTermsData(data.data.termsAndCondition);
        }
      } catch (err) {
        console.error("Failed to load Terms of Service information.", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTerms();
  }, []);

  const termsSections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <CheckCircle className="h-6 w-6" />,
      points: [
        "By accessing or using Sewamahe, you agree to be bound by these Terms",
        "You represent that you are at least 18 years old or have parental consent",
        "If using on behalf of an organization, you have authority to bind that organization",
        "These Terms constitute a legally binding agreement between you and Sewamahe",
      ],
    },
    {
      id: "accounts",
      title: "Account Registration & Security",
      icon: <User className="h-6 w-6" />,
      points: [
        "You must provide accurate and complete registration information",
        "You are responsible for maintaining account confidentiality",
        "You must notify us immediately of any unauthorized account use",
        "We reserve the right to suspend or terminate accounts violating these Terms",
      ],
    },
    {
      id: "user-conduct",
      title: "User Conduct & Responsibilities",
      icon: <Users className="h-6 w-6" />,
      points: [
        "Use the platform only for lawful purposes",
        "Do not harass, threaten, or impersonate other users",
        "Respect intellectual property rights of others",
        "Do not attempt to circumvent platform security or payment systems",
      ],
    },
    {
      id: "consultations",
      title: "Consultation Services",
      icon: <MessageSquare className="h-6 w-6" />,
      points: [
        "Consultants set their own per-minute rates",
        "Users agree to pay for consultation time used",
        "Consultations are professional advisory services only",
        "We are not responsible for advice given during consultations",
      ],
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: <CreditCard className="h-6 w-6" />,
      points: [
        "All payments are processed through secure third-party providers",
        "Fees are charged per minute of consultation",
        "Refunds are handled according to our Refund Policy",
        "Consultants receive payments minus platform fees",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <FileText className="h-6 w-6" />,
      points: [
        "Sewamahe owns all platform software, design, and branding",
        "Users retain ownership of content they create and share",
        "By posting content, you grant us license to display it on the platform",
        "Consultants own the intellectual property in their advice",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      icon: <XCircle className="h-6 w-6" />,
      points: [
        "You may terminate your account at any time",
        "We may terminate accounts violating these Terms",
        "Termination does not relieve outstanding payment obligations",
        "Certain provisions survive termination of your account",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      icon: <AlertCircle className="h-6 w-6" />,
      points: [
        "Platform is provided 'as is' without warranties",
        "We do not guarantee uninterrupted or error-free service",
        "We are not responsible for advice given by consultants",
        "You use the platform at your own risk",
      ],
    },
    {
      id: "limitation",
      title: "Limitation of Liability",
      icon: <Scale className="h-6 w-6" />,
      points: [
        "We are not liable for indirect, incidental, or consequential damages",
        "Maximum liability limited to fees paid in last 6 months",
        "Not liable for third-party actions or content",
        "Does not limit liability for gross negligence or willful misconduct",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law & Disputes",
      icon: <Globe className="h-6 w-6" />,
      points: [
        "These Terms are governed by applicable laws",
        "Disputes will be resolved through arbitration",
        "Class action lawsuits are waived",
        "You agree to mandatory individual arbitration",
      ],
    },
  ];

  const prohibitedActivities = [
    "Sharing login credentials or account access",
    "Engaging in fraudulent or deceptive practices",
    "Violating any applicable laws or regulations",
    "Harassing, bullying, or threatening other users",
    "Sharing malicious software or harmful code",
    "Attempting to reverse engineer the platform",
    "Spamming or unsolicited communications",
    "Impersonating Sewamahe staff or other users",
  ];

  const feeStructure = [
    {
      type: "User Consultation Fee",
      description: "Per-minute rate set by consultant",
      note: "Billed in real-time during consultation",
    },
    {
      type: "Platform Service Fee",
      description: "Percentage of consultation fee",
      note: "Transparently disclosed before booking",
    },
    {
      type: "Payment Processing Fee",
      description: "Third-party payment processor charges",
      note: "Applied per transaction",
    },
    {
      type: "Consultant Payout Fee",
      description: "Processing fee for consultant earnings",
      note: "Deduced before transfer to consultant",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-black rounded-full mb-8 shadow-xl">
              <Scale className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Terms of <span className="text-black">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Legal agreement governing your use of the Sewamahe consultation
              platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="font-medium">
                  Last Updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-full">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Version 2.1</span>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2">
                    Important Legal Document
                  </h3>
                  <p className="text-yellow-700">
                    Please read these Terms carefully before using Sewamahe. By
                    accessing or using our platform, you agree to be bound by
                    these Terms and our Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Quick <span className="text-black">Navigation</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {termsSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="bg-white hover:bg-black hover:text-white border border-gray-300 hover:border-black px-3 py-2 rounded-lg font-medium transition-all duration-300 text-center text-sm">
                  {section.title.split(" ")[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Backend or Default */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="mb-16">
            <div className="flex items-start gap-6 mb-10">
              <div className="p-3 bg-black rounded-lg flex-shrink-0">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                  Introduction & Scope
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                  <p>
                    Welcome to Sewamahe. These Terms of Service ("Terms") govern
                    your access to and use of the Sewamahe website, mobile
                    applications, and services (collectively, the "Platform").
                    Sewamahe provides a consultation platform connecting users
                    with expert consultants for paid advisory services.
                  </p>
                  <p>
                    These Terms form a legally binding agreement between you
                    ("User") and Sewamahe ("we," "us," or "our"). By registering
                    for an account or using our Platform, you acknowledge that
                    you have read, understood, and agree to be bound by these
                    Terms, our Privacy Policy, and all applicable laws and
                    regulations.
                  </p>
                  <p>
                    We reserve the right to modify these Terms at any time. We
                    will notify you of material changes via email or platform
                    notification. Your continued use of the Platform after
                    changes constitutes acceptance of the modified Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Terms Sections */}
          <div className="space-y-20">
            {termsSections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-start gap-6 mb-8">
                  <div className="p-3 bg-black rounded-lg flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-black">
                        {index + 1}.
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-black">
                        {section.title}
                      </h3>
                    </div>

                    <ul className="space-y-4 mt-6">
                      {section.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex items-start bg-gray-50 p-4 rounded-lg">
                          <div className="w-2 h-2 bg-black rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Additional Details for Specific Sections */}
                    {section.id === "user-conduct" && (
                      <div className="mt-8">
                        <h4 className="text-xl font-bold mb-4 text-black">
                          Prohibited Activities
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {prohibitedActivities.map((activity, idx) => (
                            <div
                              key={idx}
                              className="flex items-start bg-red-50 p-3 rounded-lg">
                              <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === "payments" && (
                      <div className="mt-8">
                        <h4 className="text-xl font-bold mb-4 text-black">
                          Fee Structure
                        </h4>
                        <div className="space-y-4">
                          {feeStructure.map((fee, idx) => (
                            <div
                              key={idx}
                              className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-bold text-black">
                                  {fee.type}
                                </h5>
                                <DollarSign className="h-5 w-5 text-gray-500" />
                              </div>
                              <p className="text-gray-600 mb-1">
                                {fee.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {fee.note}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === "disclaimer" && (
                      <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                        <h4 className="text-xl font-bold mb-4 text-black">
                          Important Limitations
                        </h4>
                        <p className="text-gray-600 mb-4">
                          The Platform facilitates connections between users and
                          consultants. Sewamahe does not:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li>
                            • Endorse or guarantee the qualifications of any
                            consultant
                          </li>
                          <li>
                            • Review, monitor, or verify consultation content
                          </li>
                          <li>• Provide legal, medical, or financial advice</li>
                          <li>
                            • Assume responsibility for advice given during
                            consultations
                          </li>
                        </ul>
                      </div>
                    )}

                    {section.id === "governing-law" && (
                      <div className="mt-8 bg-black text-white p-6 rounded-xl">
                        <h4 className="text-xl font-bold mb-4">
                          Dispute Resolution Process
                        </h4>
                        <ol className="space-y-3">
                          <li className="flex items-start">
                            <span className="font-bold mr-3">1.</span>
                            <span>Informal negotiation period of 30 days</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-3">2.</span>
                            <span>
                              Mandatory binding arbitration if unresolved
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-3">3.</span>
                            <span>
                              Arbitration conducted by neutral third-party
                              organization
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-3">4.</span>
                            <span>Each party bears own arbitration costs</span>
                          </li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Platform-Specific Policies */}
          <div className="mt-20 p-8 bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-black">
              Platform-Specific Policies
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-black mb-3">
                  Consultation Quality Guidelines
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consultants must maintain professional conduct</li>
                  <li>• Users must respect consultant expertise</li>
                  <li>
                    • Both parties should arrive prepared for consultations
                  </li>
                  <li>• Clear communication of expectations required</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-black mb-3">
                  Dispute Resolution for Services
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Report issues within 48 hours of consultation</li>
                  <li>• Provide evidence of service quality concerns</li>
                  <li>• Platform mediates disputes in good faith</li>
                  <li>• Refund decisions made on case-by-case basis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-black">
              Third-Party Services & Integration
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600 mb-4">
                Sewamahe integrates with various third-party services. Your use
                of these services is subject to their respective terms:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-black mb-2">
                    Payment Processors
                  </h5>
                  <p className="text-sm text-gray-600">Stripe, PayPal, etc.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-black mb-2">
                    Communication Tools
                  </h5>
                  <p className="text-sm text-gray-600">
                    Video conferencing, messaging
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-black mb-2">
                    Analytics Services
                  </h5>
                  <p className="text-sm text-gray-600">
                    Usage tracking and analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="mt-20 p-8 bg-black text-white rounded-xl">
            <h3 className="text-2xl font-bold mb-6">
              Contact Information & Support
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Support
                </h4>
                <p className="text-gray-300">sewamahe@gmail.com</p>
                <p className="text-gray-300 text-sm mt-1">
                  For legal inquiries
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Support Hours
                </h4>
                <p className="text-gray-300">Mon-Fri, 9AM-6PM EST</p>
                <p className="text-gray-300 text-sm mt-1">Excluding holidays</p>
              </div>
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help Center
                </h4>
                <p className="text-gray-300">sewamahe@gmail.com</p>
                <p className="text-gray-300 text-sm mt-1">FAQs and guides</p>
              </div>
            </div>
          </div>

          {/* Final Agreement */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-black">
                Your Agreement
              </h3>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                By clicking "I Agree," registering an account, or using the
                Sewamahe platform, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service and
                our Privacy Policy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-black hover:text-white px-6 py-3 rounded-lg font-medium transition-all">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-all">
                  <ExternalLink className="h-4 w-4" />
                  Contact Legal Team
                </Link>
              </div>
            </div>
          </div>

          {/* Update Notice */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-black">Document Information</h4>
                <p className="text-gray-600 text-sm">
                  Version 2.1 • Effective Date:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">
                  Previous versions available upon request
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">
              These Terms constitute a legal agreement. If you do not agree, do
              not use the platform.
            </span>
          </div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            For questions about these Terms, please contact our legal department
            at legal@sewamahe.com or consult with a legal professional.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
