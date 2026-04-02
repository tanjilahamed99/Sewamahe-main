import { useEffect, useState } from "react";
import {
  Video,
  Shield,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Headphones,
  Award,
  TrendingUp,
  Calendar,
  UserCheck,
  FileText,
  Target,
  BarChart,
  Heart,
  ThumbsUp,
  ShieldCheck,
  Wallet,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Rocket,
  Sparkles,
  Crown,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const Home = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);


  const features = [
    {
      icon: <Video className="h-10 w-10" />,
      title: "4K Ultra HD Video",
      description:
        "Experience crystal-clear video quality with our advanced streaming technology. No lag, no blur, just professional-grade communication.",
      details: [
        "Screen sharing",
        "Recording option",
        "Virtual whiteboard",
        "Live annotations",
      ],
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Military-Grade Security",
      description:
        "End-to-end encryption with TLS 1.3 protocol. Your conversations are protected with enterprise-level security measures.",
      details: [
        "GDPR compliant",
        "HIPAA ready",
        "Data encryption",
        "Secure servers",
      ],
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Instant Matching",
      description:
        "Our AI-powered algorithm matches you with the perfect expert in under 60 seconds based on your specific needs.",
      details: [
        "AI matching",
        "Real-time availability",
        "Skill verification",
        "Rating system",
      ],
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Transparent Pricing",
      description:
        "No hidden fees. Pay only for what you use with per-minute billing or choose from our flexible package deals.",
      details: [
        "Per-minute billing",
        "Package deals",
        "Corporate plans",
        "No contracts",
      ],
    },
    {
      icon: <Headphones className="h-10 w-10" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support with an average response time of under 2 minutes. We're here when you need us.",
      details: ["Live chat", "Phone support", "Email support", "Help center"],
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Smart Analytics",
      description:
        "Track your consultation history, get insights, and receive personalized recommendations for continuous improvement.",
      details: [
        "Session analytics",
        "Progress tracking",
        "Expert reports",
        "Learning paths",
      ],
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Document Sharing",
      description:
        "Securely share files, contracts, presentations, and other documents directly within the platform during your sessions.",
      details: [
        "Secure file transfer",
        "Multiple formats",
        "Real-time editing",
        "Cloud storage",
      ],
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Expert Verification",
      description:
        "Every expert undergoes a rigorous 5-step verification process including background checks and skill assessments.",
      details: [
        "Background check",
        "Skill testing",
        "Peer review",
        "Continuous evaluation",
      ],
    },
  ];

  const expertCategories = [
    { name: "Business Consulting", count: "150+ Experts", icon: <BarChart /> },
    { name: "Legal Advice", count: "80+ Lawyers", icon: <Scale /> },
    { name: "Health & Wellness", count: "120+ Professionals", icon: <Heart /> },
    { name: "Technology", count: "200+ Engineers", icon: <Cpu /> },
    { name: "Finance & Tax", count: "90+ Advisors", icon: <Wallet /> },
    { name: "Education", count: "110+ Tutors", icon: <BookOpen /> },
    { name: "Creative Arts", count: "70+ Artists", icon: <Palette /> },
    { name: "Career Coaching", count: "60+ Coaches", icon: <Target /> },
  ];

  const rulesGuidelines = [
    {
      category: "For Users",
      rules: [
        "All users must be 18 years or older",
        "Respect expert time and expertise",
        "Provide accurate information for better matching",
        "Payment must be secured before session starts",
        "Sessions can be recorded for quality assurance",
        "24-hour cancellation policy applies",
        "Respect confidentiality agreements",
        "No abusive behavior tolerated",
      ],
    },
    {
      category: "For Experts",
      rules: [
        "Must pass rigorous verification process",
        "Maintain 4.5+ star rating to remain active",
        "Respond to booking requests within 2 hours",
        "Provide accurate availability calendar",
        "No solicitation of direct payments",
        "Maintain professional conduct at all times",
        "Continuing education requirements",
        "Adhere to platform commission structure",
      ],
    },
    {
      category: "Quality Standards",
      rules: [
        "Minimum 720p video quality required",
        "Professional background and lighting",
        "Stable internet connection required",
        "Professional attire recommended",
        "Punctuality strictly enforced",
        "Follow-up reports within 24 hours",
        "Regular feedback collection",
        "Continuous improvement expected",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechNova Inc.",
      content:
        "Sewamahe transformed how we onboard new employees. The access to industry experts is invaluable.",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Legal Consultant",
      content:
        "As an expert on the platform, I've doubled my client base while maintaining work-life balance.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Healthcare Professional",
      content:
        "The platform's security and ease of use made transitioning to teleconsultation seamless.",
      rating: 4,
      avatar: "ER",
    },
  ];

  const faqs = [
    {
      question: "How do I choose the right expert?",
      answer:
        "Our AI matching algorithm suggests experts based on your needs. You can filter by specialty, rating, price, and availability. Each expert has a detailed profile with credentials, reviews, and introduction video.",
    },
    {
      question: "What if I'm not satisfied with a session?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not happy with a session, report it within 24 hours for a full refund or credit toward another session.",
    },
    {
      question: "How are experts verified?",
      answer:
        "Experts undergo a 5-step verification: 1) Credential verification 2) Background check 3) Skill assessment 4) Mock consultation 5) Continuous performance monitoring.",
    },
    {
      question: "Can I schedule sessions in advance?",
      answer:
        "Yes! You can book sessions up to 90 days in advance. Experts set their own availability, and you can view their calendar in real-time.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, Sewamahe is available on iOS and Android. You can download it from the App Store or Google Play Store.",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Active Users", icon: <Users /> },
    { value: "2,500+", label: "Verified Experts", icon: <UserCheck /> },
    { value: "200,000+", label: "Sessions Completed", icon: <Video /> },
    { value: "98.7%", label: "Satisfaction Rate", icon: <ThumbsUp /> },
    { value: "150+", label: "Countries Served", icon: <Globe /> },
    { value: "24/7", label: "Support Availability", icon: <Headphones /> },
  ];


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Expanded */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 border border-gray-200 mb-6">
                <Sparkles className="h-4 w-4 text-black mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Trusted by 50,000+ professionals
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Expert Guidance
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                  At Your Fingertips
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Connect instantly with verified professionals through secure,
                high-definition video consultations. Whether you need quick
                advice or in-depth consulting, Sewamahe makes expertise
                accessible to everyone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to={"/login"}>
                  <button className="group bg-black text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                    Start Free Consultation
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-600">from 10,000+ reviews</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Live Consultation
                        </h3>
                        <p className="text-gray-400 text-sm">
                          HD Video • Secure • Recording
                        </p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Expert Match</span>
                      <span className="text-green-400 font-semibold">
                        ✓ Found
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Connection</span>
                      <span className="text-green-400 font-semibold">
                        ✓ Stable
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Security</span>
                      <span className="text-green-400 font-semibold">
                        ✓ Encrypted
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-medium">
                        Active Experts
                      </span>
                      <span className="text-green-400">2,500+ Online</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Business",
                        "Legal",
                        "Tech",
                        "Health",
                        "Finance",
                        "More",
                      ].map((cat) => (
                        <div
                          key={cat}
                          className="bg-gray-800 rounded-lg p-3 text-center">
                          <div className="text-white font-medium">{cat}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-r from-gray-900/10 to-black/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-black/5 rounded-2xl flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <div className="text-black">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Expanded */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Successful Consultations
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly
              design to deliver exceptional consultation experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Categories */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Browse by Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect expert from our diverse range of professional
              categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all group">
                <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-black/10">
                  <div className="text-black">{category.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count}</p>
                <div className="mt-4">
                  {/* <button className="text-sm text-black font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Browse Experts
                    <ChevronRight className="h-4 w-4" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all">
              View All Categories
              <ArrowRight className="h-5 w-5" />
            </button>
          </div> */}
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How Sewamahe Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get expert advice in four simple steps
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                {
                  step: "1",
                  title: "Sign Up & Profile",
                  description:
                    "Create your account and set up your profile. Tell us about your needs for better matching.",
                  icon: <UserCheck />,
                },
                {
                  step: "2",
                  title: "Find Your Expert",
                  description:
                    "Browse or use our AI to find the perfect expert. Filter by expertise, ratings, and availability.",
                  icon: <Search />,
                },
                {
                  step: "3",
                  title: "Book & Prepare",
                  description:
                    "Choose a time, make secure payment, and prepare your questions. Get reminders before your session.",
                  icon: <Calendar />,
                },
                {
                  step: "4",
                  title: "Connect & Grow",
                  description:
                    "Join the HD video call, get expert advice, and access session recordings and follow-up resources.",
                  icon: <Video />,
                },
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center text-white text-2xl font-bold relative z-10">
                    {step.step}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="w-12 h-12 mx-auto mb-4 bg-black/5 rounded-lg flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Guidelines - Detailed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Platform Rules & Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensuring quality, security, and fairness for everyone on Sewamahe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rulesGuidelines.map((section, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-black/5 rounded-xl flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {section.category}
                </h3>
                <ul className="space-y-4">
                  {section.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-6 h-6 bg-black/5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      </div>
                      <span className="text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="h-8 w-8 text-black" />
              <h3 className="text-2xl font-bold text-gray-900">
                Quality Assurance Process
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                "Expert Verification",
                "Session Monitoring",
                "User Feedback",
                "Continuous Improvement",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users and experts are saying about their Sewamahe
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about Sewamahe
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      activeFAQ === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {activeFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help.
            </p>
            <button className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all">
              <HelpCircle className="h-5 w-5" />
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Rocket className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-medium">
              Ready to get started?
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Join the Future of Consulting
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience the power of instant expert access. Whether you're
            seeking guidance or sharing your expertise, Sewamahe provides the
            platform for meaningful connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-white text-black px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3">
              <Crown className="h-5 w-5" />
              Start Free 14-Day Trial
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button className="group border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <Users2 className="h-5 w-5" />
              Schedule Group Demo
            </button> */}
          </div>

          <p className="text-gray-400 mt-8 text-sm">
            No credit card required • Cancel anytime • 24/7 support included
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Helper components for icons
const Search = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Scale = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    />
  </svg>
);

const Cpu = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
);

const Palette = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
);
