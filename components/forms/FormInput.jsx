import { Input, Textarea } from "@/components/ui";

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  errors,
  type = "text",
  isTextarea = false,
  className = "",
  ...props
}) => {
  const InputComponent = isTextarea ? Textarea : Input;

  return (
    <div className={`space-y-1 ${className}`}>
      <InputComponent
        {...control?.register(name)}
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        type={type}
        isInvalid={!!errors?.[name]}
        errorMessage={errors?.[name]?.message}
        classNames={{
          input: [
            "dark:text-white",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          ],
          inputWrapper: [
            isTextarea ? "h-auto min-h-[120px] py-3" : "h-12",
            "bg-white dark:bg-gray-700",
            "border border-gray-300 dark:border-gray-600",
            "hover:border-brand-primary/50 dark:hover:border-brand-accent/50",
            "focus-within:border-brand-primary dark:focus-within:border-brand-accent",
            "focus-within:ring-1 focus-within:ring-brand-primary/30 dark:focus-within:ring-brand-accent/30",
            "transition-all duration-200",
            "rounded-xl",
            "px-3",
          ],
          label: [
            "text-gray-700 dark:text-gray-300",
            "text-sm",
            "font-medium",
            "mb-1",
          ],
          errorMessage: ["text-red-500", "text-sm", "mt-1"],
        }}
        {...props}
      />
    </div>
  );
};

export default FormInput;
