import React from "react";
import "./input.scss";

type InputProps = {
  label: string;
  placeholder?: string;
  type: string;
  id?: string;
  [x: string]: any; // Allows for additional props
  isUsername?: boolean;
  onChange: (e: any) => void;
  description?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  type,
  id,
  onChange,
  isUsername,
  description,
  ...rest
}) => {
  // Generate a unique id if not provided
  const inputId = id || `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="input">
      <label htmlFor={inputId}>{label}</label>
      {description && (
        <span>{description}</span>
      )}
      <div className="input-wrapper">
        {isUsername && (
            <div className="symbol">@</div>
        )}
        <input type={type} placeholder={placeholder} id={inputId} {...rest} onChange={onChange} />
      </div>
    </div>
  );
};

export default Input;
