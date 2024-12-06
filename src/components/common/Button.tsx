interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button = ({
  variant = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md font-medium ${getVariantClasses(
        variant
      )} ${getSizeClasses(size)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const getVariantClasses = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-blue-500 text-white hover:bg-blue-600";
    case "secondary":
      return "bg-gray-200 text-gray-800 hover:bg-gray-300";
    default:
      return "";
  }
};

const getSizeClasses = (size: ButtonProps["size"]) => {
  switch (size) {
    case "small":
      return "px-3 py-1.5 text-sm";
    case "medium":
      return "px-4 py-2 text-base";
    case "large":
      return "px-6 py-3 text-lg";
    default:
      return "";
  }
};

export default Button;
