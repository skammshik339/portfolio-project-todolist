import { useEffect } from 'react';
import styles from './ValidationModal.module.css';

interface ValidationModalProps {
  message: string;
  onClose: () => void;
}

export default function ValidationModal({ message, onClose }: ValidationModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={styles['overlay']}>
      <div className={styles['modal-box']}>
        <span>{message}</span>
      </div>
    </div>
  );
}
