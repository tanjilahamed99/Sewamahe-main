import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Cookie,
  Server,
  Bell,
  Mail,
  Users,
  Globe,
  Clock,
  Download,
  Trash2,
  Edit
} from 'lucide-react';

const Privacy = () => {
  const dataCollectionCategories = [
    {
      category: "Personal Identification Information",
      items: [
        "Full name and contact details",
        "Email address and phone number",
        "Profile information and biography",
        "Professional credentials and qualifications",
        "Government-issued identification (for verification)"
      ]
    },
    {
      category: "Financial Information",
      items: [
        "Payment method details (encrypted)",
        "Billing address and transaction history",
        "Tax identification numbers",
        "Earnings and payout information",
        "Subscription and plan details"
      ]
    },
    {
      category: "Usage and Technical Data",
      items: [
        "IP addresses and device information",
        "Browser type and operating system",
        "Pages visited and time spent",
        "Clickstream data and navigation patterns",
        "Error logs and performance metrics"
      ]
    },
    {
      category: "Communication Data",
      items: [
        "Messages and chat transcripts",
        "Consultation recordings (with consent)",
        "Email correspondence",
        "Feedback and survey responses",
        "Support ticket information"
      ]
    }
  ];

  const dataUsagePurposes = [
    {
      purpose: "Service Provision and Operation",
      description: "To provide, maintain, and improve our platform services including consultation scheduling, payment processing, and communication features."
    },
    {
      purpose: "Security and Fraud Prevention",
      description: "To monitor for fraudulent activities, unauthorized access, and ensure the security of our platform and user data."
    },
    {
      purpose: "Communication and Support",
      description: "To send important notifications, respond to inquiries, provide customer support, and share platform updates."
    },
    {
      purpose: "Legal and Compliance",
      description: "To comply with legal obligations, respond to lawful requests, enforce our terms, and protect rights and safety."
    },
    {
      purpose: "Analytics and Improvement",
      description: "To analyze platform usage, improve user experience, develop new features, and conduct research."
    }
  ];

  const userRights = [
    {
      right: "Right to Access",
      icon: <Eye className="h-5 w-5" />,
      description: "Request a copy of your personal data held by us"
    },
    {
      right: "Right to Rectification",
      icon: <Edit className="h-5 w-5" />,
      description: "Correct inaccurate or incomplete personal data"
    },
    {
      right: "Right to Erasure",
      icon: <Trash2 className="h-5 w-5" />,
      description: "Request deletion of your personal data under certain conditions"
    },
    {
      right: "Right to Restriction",
      icon: <Lock className="h-5 w-5" />,
      description: "Limit how we use your personal data"
    },
    {
      right: "Right to Data Portability",
      icon: <Download className="h-5 w-5" />,
      description: "Receive your data in a structured, machine-readable format"
    },
    {
      right: "Right to Object",
      icon: <Bell className="h-5 w-5" />,
      description: "Object to processing of your personal data"
    }
  ];

  const securityMeasures = [
    {
      measure: "Encryption",
      level: "End-to-End",
      description: "All sensitive data is encrypted in transit and at rest using industry-standard protocols"
    },
    {
      measure: "Access Controls",
      level: "Multi-Layer",
      description: "Role-based access control with multi-factor authentication and strict permission management"
    },
    {
      measure: "Regular Audits",
      level: "Quarterly",
      description: "Comprehensive security audits and vulnerability assessments conducted by third-party experts"
    },
    {
      measure: "Data Backups",
      level: "Redundant",
      description: "Automated, encrypted backups stored in geographically separate locations"
    },
    {
      measure: "Incident Response",
      level: "24/7 Monitoring",
      description: "Continuous monitoring with established incident response protocols"
    }
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
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Privacy <span className="text-black">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Comprehensive protection of your personal information across the Sewamahe platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Last Updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Effective Immediately</span>
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
              Table of <span className="text-black">Contents</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Introduction', 'Data Collection', 'Data Usage', 'Your Rights', 'Security', 'Cookies', 'Changes', 'Contact'].map((item, index) => (
                <a 
                  key={index}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="bg-white hover:bg-black hover:text-white border border-gray-300 hover:border-black px-4 py-3 rounded-lg font-medium transition-all duration-300 text-center"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="introduction" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-8 mb-12">
            <div className="p-3 bg-black rounded-lg flex-shrink-0">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                1. Introduction and Scope
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  Welcome to Sewamahe's comprehensive Privacy Policy. This document outlines our commitment 
                  to protecting your privacy and explains how we collect, use, disclose, and safeguard your 
                  information when you use our platform, services, and applications.
                </p>
                <p>
                  This Privacy Policy applies to all users of the Sewamahe platform, including visitors, 
                  registered users, consultants, and administrators. It governs our data collection, 
                  processing, and usage practices. By accessing or using Sewamahe, you acknowledge that 
                  you have read, understood, and agree to be bound by the terms of this Privacy Policy.
                </p>
                <p>
                  We are committed to maintaining the trust and confidence of our users. This policy 
                  provides detailed information about when and why we collect personal information, 
                  how we use it, the limited conditions under which we may disclose it to others, 
                  and how we keep it secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section id="data-collection" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-center">
            2. Information We Collect
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-black">Categories of Collected Data</h3>
              <div className="space-y-8">
                {dataCollectionCategories.map((category, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xl font-bold mb-4 text-black flex items-center gap-3">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                      {category.category}
                    </h4>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-gray-600">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <div className="bg-black text-white p-8 rounded-xl mb-8">
                  <h3 className="text-2xl font-bold mb-4">Collection Methods</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <UserCheck className="h-5 w-5" />
                      <span>Direct user input during registration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Server className="h-5 w-5" />
                      <span>Automated technical data collection</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <span>Communication through our platform</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <span>Third-party integrations and APIs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-black">Legal Basis for Collection</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-bold text-black mb-1">Contractual Necessity</div>
                      <p className="text-gray-600 text-sm">Data required to provide our services</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-bold text-black mb-1">Legal Obligations</div>
                      <p className="text-gray-600 text-sm">Compliance with applicable laws</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-bold text-black mb-1">Legitimate Interests</div>
                      <p className="text-gray-600 text-sm">Platform improvement and security</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-bold text-black mb-1">Consent</div>
                      <p className="text-gray-600 text-sm">Where explicitly provided by user</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Usage */}
      <section id="data-usage" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-center">
            3. How We Use Your Information
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {dataUsagePurposes.map((purpose, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-black transition-colors">
                <div className="text-4xl font-bold text-black mb-4">{index + 1}</div>
                <h3 className="text-xl font-bold mb-4 text-black">{purpose.purpose}</h3>
                <p className="text-gray-600">{purpose.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-black">Data Retention Periods</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-lg">
                <div className="text-2xl font-bold text-black mb-2">7 Years</div>
                <div className="text-gray-600">Financial Records</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg">
                <div className="text-2xl font-bold text-black mb-2">3 Years</div>
                <div className="text-gray-600">User Accounts</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg">
                <div className="text-2xl font-bold text-black mb-2">1 Year</div>
                <div className="text-gray-600">Analytics Data</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg">
                <div className="text-2xl font-bold text-black mb-2">30 Days</div>
                <div className="text-gray-600">Temporary Logs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section id="your-rights" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-center">
            4. Your Data Protection Rights
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {userRights.map((right, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-black rounded-lg">
                    {right.icon}
                  </div>
                  <h3 className="text-lg font-bold text-black">{right.right}</h3>
                </div>
                <p className="text-gray-600">{right.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">How to Exercise Your Rights</h3>
            <div className="space-y-4">
              <p>To exercise any of your data protection rights, you may:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Submit a request through your account settings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Contact our Data Protection Officer at privacy@sewamahe.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Use our automated data request tools in the dashboard</span>
                </li>
              </ul>
              <p className="text-gray-300 mt-4">
                We will respond to all legitimate requests within 30 days. If your request is 
                particularly complex or you have made multiple requests, we may extend this period 
                by an additional 60 days and will notify you of this extension.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section id="security" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-center">
            5. Security and Data Protection
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {securityMeasures.map((measure, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">{measure.measure}</h3>
                    <div className="text-sm text-gray-500">Security Level: {measure.level}</div>
                  </div>
                  <div className="px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
                    Level {index + 1}
                  </div>
                </div>
                <p className="text-gray-600">{measure.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-yellow-800 mb-3">Data Breach Notification</h3>
                <p className="text-yellow-700 mb-3">
                  In the unlikely event of a data breach, we will notify affected users and 
                  relevant authorities within 72 hours of becoming aware of the breach, in 
                  accordance with applicable data protection laws.
                </p>
                <p className="text-yellow-700">
                  Our incident response team is trained to handle security incidents and will 
                  take immediate action to contain any breach and mitigate potential harm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section id="cookies" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-center">
            6. Cookies and Tracking Technologies
          </h2>
          
          <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Cookie className="h-8 w-8 text-black" />
              <h3 className="text-2xl font-bold text-black">Our Use of Cookies</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-black mb-3">Essential Cookies</h4>
                <p className="text-gray-600 text-sm">Required for basic platform functionality</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-black mb-3">Analytics Cookies</h4>
                <p className="text-gray-600 text-sm">Help us understand platform usage patterns</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-black mb-3">Marketing Cookies</h4>
                <p className="text-gray-600 text-sm">Used for personalized advertising (opt-in)</p>
              </div>
            </div>

            <p className="text-gray-600">
              You can control cookies through your browser settings. However, disabling certain 
              cookies may affect your experience on our platform. For detailed information about 
              specific cookies we use, please visit our Cookie Policy page.
            </p>
          </div>

          <div className="bg-black text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Third-Party Services</h3>
            <p className="text-gray-300 mb-4">
              We use trusted third-party services that may set their own cookies or tracking 
              technologies. These include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Analytics providers (Google Analytics)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Payment processors (Stripe, PayPal)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Customer support tools</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Email marketing services</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section id="changes" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black text-center">
            7. Changes to This Privacy Policy
          </h2>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-6">
              <Clock className="h-8 w-8 text-black" />
              <div>
                <h3 className="text-2xl font-bold text-black">Update Procedure</h3>
                <p className="text-gray-600">How we communicate policy changes</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg">
                <h4 className="font-bold text-black mb-3">Notification Methods</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email notification to registered users for significant changes</li>
                  <li>• Banner notification on the platform for 30 days</li>
                  <li>• Updated "Last Updated" date at the top of this page</li>
                  <li>• Archive of previous versions available upon request</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white rounded-lg">
                <h4 className="font-bold text-black mb-3">Your Continued Use</h4>
                <p className="text-gray-600">
                  Your continued use of the Sewamahe platform after any changes to this Privacy 
                  Policy constitutes your acceptance of those changes. If you do not agree with 
                  any changes, you may close your account and cease using our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="py-16 md:py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            8. Contact Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Data Protection Officer</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span>privacy@sewamahe.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <span>Attn: Data Protection Officer</span>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gray-900 rounded-lg">
                <h4 className="font-bold mb-3">Response Time</h4>
                <p className="text-gray-300">
                  We aim to respond to all privacy-related inquiries within 48 hours. 
                  For formal data subject requests, we will acknowledge receipt within 
                  24 hours and provide a full response within 30 days.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Regulatory Authorities</h3>
              <p className="text-gray-300 mb-6">
                If you have concerns about our data processing activities, you have the 
                right to lodge a complaint with your local data protection authority.
              </p>
              
              <div className="p-6 bg-gray-900 rounded-lg">
                <h4 className="font-bold mb-3">Supervisory Authority</h4>
                <p className="text-gray-300 text-sm">
                  Please contact your national or regional data protection authority 
                  for information about how to file a complaint regarding our 
                  data processing practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Notice */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full">
            <Shield className="h-5 w-5 text-black" />
            <span className="font-medium">
              This Privacy Policy was last reviewed and updated on {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            By using Sewamahe, you acknowledge that you have read, understood, and agree to 
            be bound by this Privacy Policy. We recommend reviewing this policy periodically 
            to stay informed about our privacy practices.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;