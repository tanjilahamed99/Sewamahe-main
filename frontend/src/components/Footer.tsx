import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  MessageSquare,
  Youtube,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Apple,
  Play,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img
                src="./logo.png"
                alt="Logo"
                className="h-16 w-18 text-black"
              />
              <span className="ml-3 text-2xl font-bold">Sewamahe</span>
            </div>
            <p className="text-gray-400 mb-8">
              Connecting the world with expert knowledge through secure,
              high-quality video consultations.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3">
              {[
                "Find Experts",
                "Become an Expert",
                "How It Works",
                "Categories",
                "Success Stories",
                "Enterprise Solutions",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                "Blog",
                "Help Center",
                "Community",
                "Webinars",
                "Documentation",
                "API Access",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3" />
                <span>support@sewamahe.com</span>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>123 Tech Street, San Francisco, CA 94107</span>
              </li>
            </ul>

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Apple className="h-6 w-6" />
                <div>
                  <div className="text-sm text-gray-400">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Play className="h-6 w-6" />
                <div>
                  <div className="text-sm text-gray-400">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Sewamahe. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "GDPR",
                "Security",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
