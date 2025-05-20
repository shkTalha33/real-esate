"use client";

import Image from "next/image";
import {
  FaAward,
  FaHome,
  FaUsers,
  FaChartLine,
  FaHandshake,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { teamMembers } from "./teamData";
import { house8, team1 } from "@/public/assets/images";

const AboutPage = () => {
  const stats = [
    {
      value: "500+",
      label: "Properties Listed",
      icon: <FaHome className="text-4xl text-brand-primary" />,
    },
    {
      value: "10K+",
      label: "Happy Clients",
      icon: <FaUsers className="text-4xl text-brand-accent" />,
    },
    {
      value: "98%",
      label: "Success Rate",
      icon: <FaChartLine className="text-4xl text-brand-warning" />,
    },
    {
      value: "15+",
      label: "Years Experience",
      icon: <FaAward className="text-4xl text-brand-primary" />,
    },
  ];

  const values = [
    {
      title: "Integrity",
      description:
        "We believe in honest and transparent real estate transactions.",
      icon: <FaHandshake className="text-3xl text-brand-primary" />,
    },
    {
      title: "Innovation",
      description:
        "Constantly evolving to provide the best real estate solutions.",
      icon: <FaLightbulb className="text-3xl text-brand-accent" />,
    },
    {
      title: "Passion",
      description:
        "We're passionate about helping you find your dream property.",
      icon: <FaHeart className="text-3xl text-brand-warning" />,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 -skew-y-6 transform origin-top-left"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl nunito_bold mb-6 bg-clip-text  text-brand-white">
              <span className="text-brand-warning">About</span> Our Vision
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 roboto_medium">
              Transforming real estate with innovation, integrity, and a
              commitment to excellence. We're not just selling properties; we're
              creating communities and building dreams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-brand-deepdark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-4xl  text-gray-900 dark:text-white mb-2 nunito_semibold">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 roboto_medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={team1}
                  alt="Our Team"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-primary rounded-full z-10 flex items-center justify-center">
                  <span className="text-white text-5xl">15+</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl poppins-semibold text-gray-900 dark:text-white mb-6 poppins_bold">
                Our
                <span className="text-brand-warning"> Journey</span> in Real
                Estate
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 roboto_regular">
                Founded in 2010, our journey began with a simple mission: to
                make real estate transactions seamless and transparent. What
                started as a small local agency has grown into a trusted name in
                the industry, serving clients across the country.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 roboto_regular">
                Our team of experienced professionals combines market knowledge
                with cutting-edge technology to deliver exceptional service and
                results. We pride ourselves on building lasting relationships
                and helping our clients make informed decisions about their real
                estate investments.
              </p>
              <button className="bg-gradient-to-r from-brand-primary to-brand-accent text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity roboto_medium">
                Learn More About Us
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 dark:text-white mb-4 poppins_semibold">
              Our <span className="text-brand-warning">Core</span> Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-3 poppins_semibold">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 roboto_regular">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 dark:text-white mb-4 poppins_semibold">
              Meet Our <span className="text-brand-warning">Team</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto roboto_regular">
              Our dedicated team of real estate professionals is here to guide
              you every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="relative overflow-hidden h-80">
                  <Image
                    // src={member.image}
                    src={house8}
                    alt={member.name}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-white text-2xl mb-1 poppins_semibold">
                        {member.name}
                      </h3>
                      <p className="text-brand-accent mb-3 roboto_medium">
                        {member.role}
                      </p>
                      <p className="text-gray-200 text-sm roboto_regular">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 dark:text-white mb-1 poppins_semibold">
                    {member.name}
                  </h3>
                  <p className="text-brand-primary dark:text-brand-accent mb-3 roboto_medium">
                    {member.role}
                  </p>
                  <div className="flex space-x-4">
                    {member.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl text-white mb-6 poppins_semibold">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto roboto_regular">
              Let our expert team guide you through every step of your real
              estate journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-brand-primary px-8 py-3 rounded-full hover:bg-gray-100 transition-colors roboto_medium">
                Browse Properties
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors roboto_medium">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
