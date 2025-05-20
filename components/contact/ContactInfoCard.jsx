import { motion } from "framer-motion";

const ContactInfoCard = ({ icon, title, description, className = "" }) => {
  return (
    <motion.div
      className={`flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-lg text-gray-900 dark:text-white poppins_medium">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300 roboto_regular">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactInfoCard;
