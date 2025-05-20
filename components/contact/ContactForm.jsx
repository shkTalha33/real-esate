import { Button } from "@/components/ui";
import { FaPaperPlane } from "react-icons/fa";
import FormInput from "../forms/FormInput";

const ContactForm = ({ control, errors, isSubmitting, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-2">
        <FormInput
          control={control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          errors={errors}
        />
        <FormInput
          control={control}
          name="email"
          type="email"
          label="Email Address"
          placeholder="user@example.com"
          errors={errors}
        />
      </div>
      <div className="pt-2">
        <FormInput
          control={control}
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="+1 (555) 123-4567"
          errors={errors}
        />
      </div>
      <div className="pt-2">
        <FormInput
          control={control}
          name="subject"
          label="Subject"
          placeholder="How can we help you?"
          errors={errors}
        />
      </div>
      <div className="pt-2">
        <FormInput
          control={control}
          name="message"
          label="Message"
          placeholder="Tell us about your real estate needs..."
          errors={errors}
          isTextarea
        />
      </div>
      <div className="pt-2">
        <Button
          type="submit"
          className={`w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white py-3 rounded-xl roboto_medium transition-all duration-300 hover:shadow-lg ${
            isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:opacity-90"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <span>Send Message</span>
              <FaPaperPlane className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
