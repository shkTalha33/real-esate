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
import { FaGithub } from "react-icons/fa6";

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
      ],
    },
    {
      title: "Property Types",
      links: [
        { name: "Apartments", href: "/properties?type=apartment" },
        { name: "Villas", href: "/properties?type=villa" },
        { name: "Offices", href: "/properties?type=office" },
        { name: "Commercial", href: "/properties?type=commercial" },
        // { name: "View All", href: "/properties" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-condition" },
        // { name: "FAQ", href: "/faq" },
        // { name: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-brand-primary" />,
      text: "Ali Housing Colony, Faisalabad, Pakistan",
      href: "https://www.google.com/maps/search/?api=1&query=Ali+Housing+Colony+Faisalabad+Pakistan",
      type: "link",
    },
    {
      icon: <FaPhoneAlt className="text-brand-primary" />,
      text: "+92 318 7019892",
      href: "tel:+923187019892",
      type: "link",
    },
    {
      icon: <FaEnvelope className="text-brand-primary" />,
      text: "shykhtalha33@gmail.com",
      href: "mailto:shykhtalha33@gmail.com",
      type: "link",
    },
    {
      icon: <FaClock className="text-brand-primary" />,
      text: "Mon - Fri: 9:00 - 18:00",
      type: "text",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook size="22" />,
      href: "https://www.facebook.com/shktalha33/",
    },
    { icon: <FaGithub size="22" />, href: "https://github.com/shkTalha33" },
    {
      icon: <FaInstagram size="22" />,
      href: "https://www.instagram.com/codecanvaas/",
    },
    {
      icon: <FaLinkedin size="22" />,
      href: "https://www.linkedin.com/in/muhammad-talha-774111399/",
    },
  ];

  return (
    <footer className="hidden sm:block dark:bg-black bg-brand-white text-white pt-16 pb-8">
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
              className="text-2xl font-bold dark:text-white text-brand-dark poppins_bold"
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
                  className="w-10 h-10 rounded-full bg-brand-light dark:bg-brand-dark flex items-center justify-center text-brand-dark dark:text-brand-white hover:bg-brand-primary hover:text-white transition-colors duration-300"
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
              <h3 className="text-lg font-semibold dark:text-white text-black poppins_medium">
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
            <h3 className="text-lg font-semibold dark:text-white text-black poppins_medium">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  {item.type === "link" ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start space-x-3 text-gray-400 roboto_regular hover:text-brand-primary transition-colors cursor-pointer group"
                    >
                      <span className="mt-1 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </a>
                  ) : (
                    <div className="flex items-start space-x-3">
                      <span className="mt-1">{item.icon}</span>
                      <span className="text-gray-400 roboto_regular">
                        {item.text}
                      </span>
                    </div>
                  )}
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
            {/* <Link
              href="/sitemap"
              className="text-gray-400 hover:text-brand-primary text-sm transition-colors duration-300 roboto_regular"
            >
              Sitemap
            </Link> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
