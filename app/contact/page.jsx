"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

// Components
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/public/assets/images";
import ApiFunction from "@/components/api/apiFunction";
import { handleError } from "@/components/api/errorHandler";
import { contactPost } from "@/components/api/apiEndpoints";

const ContactPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = ApiFunction();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Form validation schema
  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    phone: Yup.string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Please enter a valid phone number"
      )
      .required("Phone number is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must not exceed 1000 characters"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const apiData = {
      fullname: data?.name,
      email: data?.email,
      phone: data?.phone,
      subject: data?.subject,
      message: data?.message,
    };
    post(contactPost, apiData)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          reset();
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => setIsSubmitting(false));
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-brand-primary" />,
      title: "Our Location",
      description: "Ali Housing Colony, Faisalabad, Pakistan",
      href: "https://www.google.com/maps/search/?api=1&query=Ali+Housing+Colony+Faisalabad+Pakistan",
      type: "link",
    },
    {
      icon: <FaPhoneAlt className="text-2xl text-brand-primary" />,
      title: "Phone Number",
      description: "+92 318 7019892",
      href: "tel:+923187019892",
      type: "link",
    },
    {
      icon: <FaEnvelope className="text-2xl text-brand-primary" />,
      title: "Email Address",
      description: "shykhtalha33@gmail.com",
      href: "mailto:shykhtalha33@gmail.com",
      type: "link",
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-28"
        style={{ backgroundImage: `url(${contact.src})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative lg:container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl poppins_semibold mb-4">
            Get In <span className="text-brand-warning"> Touch</span>
          </h2>
          <p className="text-lg text-white/90 nunito_regular">
            Have questions or ready to start your real estate journey? <br />
            Our team is here to help you every step of the way
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 relative bg-gradient-to-br from-brand-light to-white dark:from-brand-dark dark:to-gray-900">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50%_50%_50%_50%,rgba(79,70,229,0.1),rgba(255,255,255,0))]"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-primary/5 to-transparent -z-10"></div>
        </div>

        <div className="lg:container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl text-gray-900 dark:text-white poppins_semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let's Talk About Your
                <span className="text-brand-warning"> Next Property</span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 roboto_regular"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our team is ready to assist you with any questions about our
                properties, investment opportunities, or the home buying/selling
                process.
              </motion.p>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {contactInfo.map((item, index) => (
                  <ContactInfoCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    type={item.type}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h3 className="text-2xl text-gray-900 dark:text-white mb-6 poppins_semibold">
                Send Us a Message
              </h3>

              <ContactForm
                control={control}
                errors={errors}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit(onSubmit)}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-brand-light dark:bg-brand-dark">
        <div className="lg:container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0234567890123!2d73.0479!3d31.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI3JzAxLjQiTiA3M8KwMDInNTIuNCJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-[400px] md:h-[500px]"
              title="Our Location - Ali Housing Colony, Faisalabad"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
