"use client";
import { terms } from "@/public/assets/images";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaExclamationTriangle,
  FaGavel,
  FaHandshake,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa";

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      {/* Hero Section */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={terms}
            alt="Terms of Service"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl poppins_semibold mb-4">
            Terms & <span className="text-brand-warning">Conditions</span>
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
                  <FaGavel className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Introduction
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  Welcome to our real estate platform. These Terms of Service
                  ("Terms") govern your access to and use of our website,
                  applications, and services (collectively, the "Service"). By
                  accessing or using our Service, you agree to be bound by these
                  Terms.
                </p>
              </section>

              {/* Account Registration */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaInfoCircle className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Account Registration
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                    To access certain features of our Service, you may be
                    required to create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>
                      Accept all risks of unauthorized access to your account
                    </li>
                    <li>
                      Be responsible for all activities that occur under your
                      account
                    </li>
                  </ul>
                </div>
              </section>

              {/* Use of Service */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaHandshake className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Use of Service
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  You agree to use our Service only for lawful purposes and in
                  accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Engage in any fraudulent or deceptive activities</li>
                  <li>
                    Use any automated means to access the Service without our
                    permission
                  </li>
                </ul>
              </section>

              {/* Property Listings */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Property Listings
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  Our Service may include property listings provided by third
                  parties. We do not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                  <li>
                    Guarantee the accuracy, completeness, or reliability of any
                    listing
                  </li>
                  <li>Endorse any property, agent, or listing</li>
                  <li>
                    Have control over the quality, safety, or legality of
                    properties listed
                  </li>
                  <li>
                    Guarantee that any property is available for sale or rent
                  </li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  The Service and its original content, features, and
                  functionality are owned by us and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property or proprietary rights laws.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Limitation of Liability
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  In no event shall we be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 roboto_regular">
                  <li>
                    Your access to or use of or inability to access or use the
                    Service
                  </li>
                  <li>
                    Any conduct or content of any third party on the Service
                  </li>
                  <li>Any content obtained from the Service</li>
                  <li>
                    Unauthorized access, use, or alteration of your
                    transmissions or content
                  </li>
                </ul>
              </section>

              {/* Governing Law */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Governing Law
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  These Terms shall be governed and construed in accordance with
                  the laws of [Your Country/State], without regard to its
                  conflict of law provisions.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                  Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  We reserve the right to modify or replace these Terms at any
                  time. We will provide notice of any changes by posting the new
                  Terms on this page and updating the "Last Updated" date. Your
                  continued use of the Service after any such changes
                  constitutes your acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Us */}
              <section className="space-y-4 pt-4">
                <div className="flex items-center space-x-3">
                  <FaQuestionCircle className="text-2xl text-brand-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white poppins_medium">
                    Contact Us
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  Email: legal@realestate.com
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

export default TermsCondition;
