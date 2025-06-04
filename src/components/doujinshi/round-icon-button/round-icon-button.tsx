import { ButtonHTMLAttributes } from "react";

interface RoundIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  hasNotification?: boolean;
}

// Reusable Icon Button Component
const RoundIconButton = ({ 
  children, 
  onClick, 
  className = "", 
  hasNotification = false,
  ...props 
}: RoundIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-3.75 hover:bg-gray-800 rounded-full transition-colors relative ${className}`}
      {...props}
    >
      {children}
      {hasNotification && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
};

export default RoundIconButton 