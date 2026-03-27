import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: string;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="alert">
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}