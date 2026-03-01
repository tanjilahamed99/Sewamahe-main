import { useState } from "react";
import axios from "axios";
import configuration from "@/config/configuration";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Globe,
  User,
  Building,
  HeadphonesIcon as HelpCircle,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${configuration.url}/api/contact/create`,
        form,
      );
      if (data.success) {
        setForm({ name: "", email: "", message: "", subject: "", phone: "" });
        toast.success(
          "Message sent successfully! We'll get back to you within 24 hours.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to send message. Please try again or use alternative contact methods.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Address",
      details: ["sewamahe@gmail.com"],
      subtitle: "For general inquiries and support",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      details: ["+91 82990 65387"],
      subtitle: "Available Monday-Friday, 9AM-6PM EST",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Location",
      details: ["Tara Tower, Polytechnic Crossing, Jaunpur (UP) 222002"],
      subtitle: "",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Response Time",
      details: ["Email: Within 24 hours", "Phone: During business hours"],
      subtitle: "Typical response times",
    },
  ];

  const contactSubjects = [
    { value: "", label: "Select a subject" },
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payments" },
    { value: "consultant", label: "Become a Consultant" },
    { value: "business", label: "Business Partnership" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "report", label: "Report an Issue" },
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
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Get in <span className="text-black">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Have questions? We're here to help. Reach out to us through any of
              our channels.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact-form"
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send a Message
              </a>
              <a
                href="mailto:sewamahe@gmail.com"
                className="bg-white text-black border border-black px-8 py-3 rounded-lg font-medium hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Multiple Ways to <span className="text-black">Connect</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the method that works best for you. Our team is ready to
              assist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center p-3 bg-black rounded-lg mb-6 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">
                  {info.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{info.subtitle}</p>
                <ul className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Support Hours */}
          <div className="bg-black text-white rounded-xl p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Support Hours</h3>
                  <p className="text-gray-300">We're here when you need us</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-lg font-bold">Monday - Friday</div>
                <div className="text-gray-300">9:00 AM - 6:00 PM EST</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-black rounded-lg">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-black">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all appearance-none bg-white">
                        {contactSubjects.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all resize-y"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>We typically respond within 24 hours</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Information */}
            <div className="space-y-8">
              {/* FAQ Preview */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-black">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <h4 className="font-bold text-black mb-2">
                      How quickly will I get a response?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We aim to respond to all inquiries within 24 hours during
                      business days.
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-4">
                    <h4 className="font-bold text-black mb-2">
                      Can I become a consultant on Sewamahe?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes! Visit our Consultant Application page to start the
                      verification process.
                    </p>
                  </div>
                  <div className="pb-2">
                    <h4 className="font-bold text-black mb-2">
                      Do you offer phone support?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Phone support is available during business hours for
                      urgent matters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      Need Immediate Assistance?
                    </h3>
                    <p className="text-red-700 mb-4 text-sm">
                      For urgent matters requiring immediate attention, please
                      call our emergency support line.
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-red-600" />
                      <a
                        href="tel:+91 82990 65387"
                        className="text-red-800 font-bold hover:underline">
                        +91 82990 65387
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social & Additional Info */}
              <div className="bg-gray-900 text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Follow Us Online</div>
                      <div className="text-gray-300 text-sm">
                        Twitter, LinkedIn, Instagram
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Business Inquiries</div>
                      <div className="text-gray-300 text-sm">
                        sewamahe@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visit Our <span className="text-black">Office</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Schedule an appointment to meet with our team in person
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-xl p-8 h-full flex items-center justify-center">
                {/* Map Placeholder - Replace with actual map component */}
                <div className="w-full h-96 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Tara Tower, Polytechnic Crossing, Jaunpur (UP) 222002
                  </p>
                  <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-black mb-4">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-black mb-4">
                  Parking Information
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Visitor parking available in the adjacent lot. Please check in
                  at reception.
                </p>
                <div className="text-sm text-gray-500">
                  Validated parking available for appointments
                </div>
              </div>

              {/* <div className="bg-black text-white p-6 rounded-xl">
                <h3 className="font-bold mb-4">Schedule a Visit</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Want to meet our team in person? Schedule an appointment in advance.
                </p>
                <a 
                  href="/appointment" 
                  className="inline-block w-full text-center bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Book Appointment
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Missing AlertCircle icon component
const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
