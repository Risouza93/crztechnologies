// src/components/TypebotBubble.tsx - TYPESCRIPT 0 WARNINGS
import { useState, MouseEvent } from "react";

interface ButtonStyle {
  position: string;
  bottom: string;
  right: string;
  width: string;
  height: string;
  borderRadius: string;
  border: string;
  fontSize: string;
  color: string;
  zIndex: number;
  cursor: string;
  transition: string;
  background: string;
  transform: string;
  boxShadow: string;
}

const TypebotBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const typebotUrl = "https://typebot.co/user-onboarding-rje58ah";

  const getButtonStyle = (hovered: boolean): ButtonStyle => ({
    position: "fixed",
    bottom: "90px",
    right: "32px",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "none",
    fontSize: "24px",
    color: "white",
    zIndex: 99999,
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    background: hovered
      ? "linear-gradient(135deg, #0ea5e9, #16a34a, #eab308)"
      : "linear-gradient(135deg, #38bdf8, #22c55e)",
    transform: hovered ? "scale(1.15) rotate(360deg)" : "scale(1)",
    boxShadow: hovered
      ? "0 20px 48px rgba(56,189,248,0.7), 0 0 0 8px rgba(56,189,248,0.2)"
      : "0 8px 24px rgba(56,189,248,0.4)",
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={getButtonStyle(isHovered)}
        type="button"
      >
        🤖
      </button>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "170px",
            right: "32px",
            width: "380px",
            height: "500px",
            zIndex: 99998,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            border: "1px solid rgba(56,189,248,0.2)",
            background: "white",
          }}
        >
          <iframe
            src={typebotUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Chat IA CRZTech"
          />
        </div>
      )}
    </>
  );
};

export default TypebotBubble;