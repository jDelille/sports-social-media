import React, { useEffect, useState } from "react";
import { CheckIcon } from "../../icons";
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
  isPassword?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  type,
  id,
  onChange,
  isUsername,
  description,
  isPassword,
  ...rest
}) => {
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState({
    length: false,
    capital: false,
    lowercase: false,
  });

  // Generate a unique id if not provided
  const inputId = id || `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    onChange(e);

    setRequirements({
      length: value.length >= 8,
      capital: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
    });
  };

  useEffect(() => {
    if (!isPassword) {
      setPassword("");
      setRequirements({
        length: false,
        capital: false,
        lowercase: false,
      });
    }
  }, [isPassword]);

  return (
    <div className="input">
      <label htmlFor={inputId}>{label}</label>
      {description && <span>{description}</span>}
      <div className="input-wrapper">
        {isUsername && <div className="symbol">@</div>}
        <input
          type={type}
          placeholder={placeholder}
          id={inputId}
          value={password}
          {...rest}
          onChange={isPassword ? handlePasswordChange : onChange}
        />
      </div>
      {isPassword && (
        <ul>
           <li>
            <CheckIcon size={20} color={requirements.length ? "#24b273" : "lightgray"} /> 8 characters
          </li>
          <li>
            <CheckIcon size={20} color={requirements.capital ? "#24b273" : "lightgray"} /> 1 capital letter
          </li>
          <li>
            <CheckIcon size={20} color={requirements.lowercase ? "#24b273" : "lightgray"} /> 1 lowercase letter
          </li>
        </ul>
      )}
    </div>
  );
};

export default Input;
