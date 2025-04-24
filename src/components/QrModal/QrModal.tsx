import { Dialog } from "@mui/material";
import styles from "./QrModal.module.css";
import { IBonusHistoryItem } from "@/models/volunteer";
import { memo } from "react";

interface IQrModalProps {
  open: boolean;
  bonus: IBonusHistoryItem;
  organization_name: string;
  onClose: () => void;
}

export const QrModal = memo(
  ({ open, onClose, bonus, organization_name }: IQrModalProps) => {
    return (
      <Dialog open={open} onClose={onClose} className={styles.dialog}>
        <div className={styles.qrContainer}>
          <h3 className={styles.qrTitle}>QR-код для бонуса</h3>
          <p className={styles.qrSubtitle}>{bonus.bonus.name}</p>
          <div className={styles.qrCode}>
            <div className={styles.qrPlaceholder}>QR-CODE</div>
          </div>
          <p className={styles.qrInfo}>
            Покажите этот код сотруднику {organization_name} для получения
            бонуса
          </p>
          <button onClick={onClose} className={styles.closeButton}>
            Закрыть
          </button>
        </div>
      </Dialog>
    );
  }
);

QrModal.displayName = "QrModal";
