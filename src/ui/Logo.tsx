import { LogoSize } from "../types/Types";

interface LogoProps {
  size: LogoSize; // Determines the size of the logo
}

export const Logo = ({ size }: LogoProps) => {
  const src = "/logofd.jpg"; // Path to the logo image

  return (
    <div className="styled-logo">
      <img
        src={src}
        alt="Logo"
        title="Foodie Delight"
        className={`img ${size}`}
      />
      {size === LogoSize.Medium && ( // Conditionally render header based on logo size
        <h4 className="login-header">Log in to Your Account</h4>
      )}
    </div>
  );
};
