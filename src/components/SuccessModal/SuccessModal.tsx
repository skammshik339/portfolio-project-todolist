import { useEffect } from 'react';
import styles from './SuccessModal.module.css';

interface ValidationModalProps {
  message: string | null;
  onClose: () => void;
}

export default function SuccessModal({ message, onClose }: ValidationModalProps) {
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
        <span>Задача успешно создана</span>
      </div>
    </div>
  );
}