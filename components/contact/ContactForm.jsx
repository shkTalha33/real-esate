import { Button, Input, Textarea } from "@/components/ui";
import { Controller } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";

const ContactForm = ({ control, errors, isSubmitting, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <Controller
          control={control}
          name="name"
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, error },
          }) => (
            <div className="space-y-1 w-full">
              <Input
                endContent={
                  <HiOutlineUser className="text-brand-muted text-xl" />
                }
                errorMessage={error?.message}
                isInvalid={invalid}
                label="Full Name"
                name={name}
                onChange={onChange}
                labelPlacement="outside"
                size="lg"
                placeholder="Enter your full name"
                value={value || ""}
                classNames={{
                  input: "dark:text-white text-gray-800 outline-none",
                  label: "text-base poppins_medium",
                }}
                className="w-full"
              />
            </div>
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, error },
          }) => (
            <div className="space-y-1 w-full">
              <Input
                endContent={
                  <HiOutlineMail className="text-brand-muted text-xl" />
                }
                errorMessage={error?.message}
                isInvalid={invalid}
                label="Email Address"
                name={name}
                onChange={onChange}
                labelPlacement="outside"
                size="lg"
                placeholder="Enter your email"
                value={value || ""}
                classNames={{
                  input: "dark:text-white text-gray-800 outline-none",
                  label: "text-base poppins_medium",
                }}
                className="w-full"
              />
            </div>
          )}
        />
      </div>
      <div className="space-y-4">
        {/* Phone Number */}
        <Controller
          control={control}
          name="phone"
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, error },
          }) => (
            <div className="space-y-1 w-full">
              <Input
                endContent={
                  <HiOutlinePhone className="text-brand-muted text-xl" />
                }
                errorMessage={error?.message}
                isInvalid={invalid}
                label="Phone Number"
                name={name}
                onChange={onChange}
                labelPlacement="outside"
                size="lg"
                placeholder="Enter your phone number"
                value={value || ""}
                classNames={{
                  input: "dark:text-white text-gray-800 outline-none",
                  label: "text-base poppins_medium",
                }}
                className="w-full pt-6"
              />
            </div>
          )}
        />
      </div>
      <div className="space-y-4">
        {/* Subject */}
        <Controller
          control={control}
          name="subject"
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, error },
          }) => (
            <div className="space-y-1 w-full">
              <Input
                endContent={
                  <MdOutlineSubject className="text-brand-muted text-xl" />
                }
                errorMessage={error?.message}
                isInvalid={invalid}
                label="Subject"
                name={name}
                onChange={onChange}
                labelPlacement="outside"
                size="lg"
                placeholder="How can we help you?"
                value={value || ""}
                classNames={{
                  input: "dark:text-white text-gray-800 outline-none",
                  label: "text-base poppins_medium",
                }}
                className="w-full pt-6"
              />
            </div>
          )}
        />
      </div>
      <div className="space-y-4">
        {/* Message */}
        <Controller
          control={control}
          name="message"
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, error },
          }) => (
            <div className="space-y-1 w-full">
              <Textarea
                errorMessage={error?.message}
                isInvalid={invalid}
                label="Message"
                name={name}
                onChange={onChange}
                labelPlacement="outside"
                minRows={5}
                placeholder="Tell us about your real estate needs..."
                value={value || ""}
                classNames={{
                  input: "dark:text-white text-gray-800 outline-none",
                  label: "text-base poppins_medium",
                }}
                className="w-full"
              />
            </div>
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Sending..."
          className="w-full bg-brand-warning hover:bg-brand-warningdark text-white nunito_medium text-lg py-3 rounded-medium transition-all duration-300 hover:shadow-lg"
          disabled={isSubmitting}
          size="lg"
        >
          <span>Send Message</span>
          <FaPaperPlane className="ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
