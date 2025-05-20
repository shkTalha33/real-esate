"use client";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaInfoCircle,
  FaUserLock,
  FaDatabase,
  FaCookieBite,
} from "react-icons/fa";
import Image from "next/image";
import { contact, privacy } from "@/public/assets/images";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      {/* Hero Section */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={privacy}
            alt="Privacy Policy"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl poppins_semibold mb-4">
            Privacy <span className="text-brand-warning">Policy</span>
          </h1>
          <p className="text-lg text-white/90 nunito_regular">
            Last Updated: May 20, 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              {/* Introduction */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Introduction
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  Welcome to our Privacy Policy. Your privacy is critically
                  important to us. This privacy policy outlines how we collect,
                  use, and protect your personal information when you use our
                  website and services.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaInfoCircle className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Personal Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                    <li>
                      Name and contact details (email, phone number, address)
                    </li>
                    <li>Property preferences and requirements</li>
                    <li>Payment and transaction information</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
                    Usage Data
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                    We automatically collect information about how you interact
                    with our website, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on site</li>
                    <li>Search terms and preferences</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaDatabase className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    How We Use Your Information
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Monitor and analyze usage and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>

              {/* Data Sharing and Disclosure */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaUserLock className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Data Sharing and Disclosure
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                  <li>
                    Service providers who assist with our business operations
                  </li>
                  <li>
                    Real estate agents and brokers to fulfill your requests
                  </li>
                  <li>Legal authorities when required by law</li>
                  <li>Business transfers in case of merger or acquisition</li>
                </ul>
              </section>

              {/* Cookies and Tracking */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCookieBite className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Cookies and Tracking Technologies
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  We use cookies and similar tracking technologies to track
                  activity on our website and hold certain information to
                  improve your experience. You can instruct your browser to
                  refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              {/* Your Rights */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Your Data Protection Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                  <li>Access, update, or delete your personal information</li>
                  <li>Rectify inaccurate or incomplete data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              {/* Changes to This Policy */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Changes to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </p>
              </section>

              {/* Contact Us */}
              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  Email: privacy@realestate.com
                  <br />
                  Phone: +1 (555) 123-4567
                  <br />
                  Address: 123 Real Estate Avenue, Suite 100, New York, NY 10001
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
