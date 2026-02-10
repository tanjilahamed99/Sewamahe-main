import getWebsiteInfo from "@/actions/getWebsiteInfo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { 
  Users, 
  Shield, 
  Clock, 
  Zap, 
  MessageSquare, 
  TrendingUp,
  Globe,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const [aboutData, setAboutData] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await getWebsiteInfo();
        if (data?.data?.about) {
          setAboutData(data.data.about);
        }
      } catch (err) {
        console.error("Failed to load About Us information.", err);
      }
    };
    fetchAbout();
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Three Seamless Roles",
      description: "Users connect with experts, Consultants share knowledge, and Administrators ensure platform integrity."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Per-Minute Billing",
      description: "Fair and transparent pricing. Pay only for the time you actually spend with consultants."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Transactions",
      description: "Protected payments with complete transparency. Your financial security is our priority."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Connections",
      description: "Find and connect with the right consultant in minutes. No waiting, no hassle."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Direct Communication",
      description: "Clear, direct messaging with your chosen expert. Get answers when you need them."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Rigorous vetting ensures only qualified professionals serve as consultants."
    }
  ];

  const platformStats = [
    { value: "3", label: "Distinct Roles", suffix: "" },
    { value: "Pay", label: "Per Minute", suffix: "Only" },
    { value: "Secure", label: "Transactions", suffix: "" },
    { value: "24/7", label: "Support", suffix: "" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-24 md:py-24">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-black rounded-full mb-6">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              About <span className="text-black">Sewamahe</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              A revolutionary platform connecting knowledge seekers with expert consultants through transparent, 
              per-minute paid consultations.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-black text-white px-6 py-3 rounded-lg font-medium shadow-lg">
                For Users
              </div>
              <div className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium shadow-lg">
                For Consultants
              </div>
              <div className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg">
                For Administrators
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-black">Mission</span>
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                To democratize access to expert knowledge by creating a transparent, 
                efficient platform where every minute of consultation has value.
              </p>
              <p className="text-gray-600">
                We believe in fair compensation for expertise and affordable access 
                to quality advice.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-black">Vision</span>
              </h2>
              <p className="text-gray-600 text-lg">
                To become the global standard for professional consultation platforms, 
                where anyone can find expert guidance and every expert can share their 
                knowledge meaningfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Three Roles */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-black">Sewamahe</span> Ecosystem
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three distinct roles working in harmony to create value for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* User Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Users</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Find expert consultants
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Pay per minute of consultation
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Get immediate answers
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Rate and review consultants
                </li>
              </ul>
            </div>

            {/* Consultant Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Consultants</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Set your per-minute rate
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Share your expertise
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Earn fair compensation
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Build professional reputation
                </li>
              </ul>
            </div>

            {/* Admin Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Administrators</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Monitor platform integrity
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Manage user accounts
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Ensure security & compliance
                </li>
                <li className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  Oversee dispute resolution
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-black">Sewamahe</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built on principles of transparency, fairness, and efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-black transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center p-3 bg-black rounded-lg mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Platform <span className="text-white">Excellence</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Designed with precision for optimal user experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value} <span className="text-white">{stat.suffix}</span>
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content from Backend */}
      {aboutData && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-black rounded-full mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-black">Story</span>
              </h2>
            </div>
            <div 
              className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-xl shadow-sm"
              dangerouslySetInnerHTML={{ __html: aboutData }}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join <span className="text-black">Sewamahe</span>?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're seeking advice, sharing expertise, or managing the platform, 
            there's a place for you in our ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/login" 
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              to="/contact" 
              className="bg-white text-black px-8 py-3 rounded-lg font-medium border border-black hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}