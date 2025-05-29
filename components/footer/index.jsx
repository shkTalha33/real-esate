"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Properties", href: "/properties" },
        { name: "Agents", href: "/agents" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Property Types",
      links: [
        { name: "Apartments", href: "/properties?type=apartment" },
        { name: "Villas", href: "/properties?type=villa" },
        { name: "Offices", href: "/properties?type=office" },
        { name: "Commercial", href: "/properties?type=commercial" },
        { name: "View All", href: "/properties" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-condition" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-brand-primary" />,
      text: "123 Real Estate Ave, New York, NY 10001",
    },
    {
      icon: <FaPhoneAlt className="text-brand-primary" />,
      text: "+1 (555) 123-4567",
    },
    {
      icon: <FaEnvelope className="text-brand-primary" />,
      text: "info@realestate.com",
    },
    {
      icon: <FaClock className="text-brand-primary" />,
      text: "Mon - Fri: 9:00 - 18:00",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://facebook.com" },
    { icon: <FaTwitter />, href: "https://twitter.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaLinkedin />, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Link
              href="/"
              className="text-2xl font-bold text-white poppins_bold"
            >
              Real<span className="text-brand-primary"> Estate</span>
            </Link>
            <p className="text-gray-400 roboto_regular">
              Your trusted partner in finding the perfect property. We connect
              buyers with their dream homes and help sellers achieve the best
              value for their properties.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-brand-primary hover:text-white transition-colors duration-300"
                  whileHover={{ y: -3 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white poppins_medium">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-brand-primary transition-colors duration-300 roboto_regular"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white poppins_medium">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="mt-1">{item.icon}</span>
                  <span className="text-gray-400 roboto_regular">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and Bottom Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-500 text-sm roboto_regular">
            © {currentYear} RealEstate. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-6">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-brand-primary text-sm transition-colors duration-300 roboto_regular"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-condition"
              className="text-gray-400 hover:text-brand-primary text-sm transition-colors duration-300 roboto_regular"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/sitemap"
              className="text-gray-400 hover:text-brand-primary text-sm transition-colors duration-300 roboto_regular"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
