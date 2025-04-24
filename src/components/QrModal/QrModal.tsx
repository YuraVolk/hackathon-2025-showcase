import { Dialog } from "@mui/material";
import styles from "./QrModal.module.css";
import { memo } from "react";
import { NachBonus } from "@/models/volunteer";
import QRCode from "react-qr-code";

interface IQrModalProps {
  open: boolean;
  bonus: NachBonus;
  organization_name: string;
  token: string;
  onClose: () => void;
}

export const QrModal = memo(
  ({ open, onClose, bonus, organization_name, token }: IQrModalProps) => {
    return (
      <Dialog open={open} onClose={onClose} className={styles.dialog}>
        <div className={styles.qrContainer}>
          <h3 className={styles.qrTitle}>QR-код для бонуса</h3>
          <p className={styles.qrSubtitle}>{bonus.bonus_name}</p>
          <div className={styles.qrCode}>
            <QRCode value={token} size={200} />
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
