import React, { memo, useState } from "react";
import { Dialog } from "@mui/material";
import styles from "./MyBonus.module.css";
import { IBonusHistoryItem } from "@/models/volunteer";
import Image from "next/image";
import bonusPlaceholder from "@/assets/img/bonus-placeholder.jpg";

interface IBonusCardProps {
  bonusItem: IBonusHistoryItem;
}

export const MyBonus = memo(({ bonusItem }: IBonusCardProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={bonusPlaceholder}
          alt={bonusItem.bonus.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{bonusItem.bonus.name}</h3>
          <span className={styles.organization}>
            {bonusItem.bonus.organization_name}
          </span>
        </div>
        <p className={styles.description}>{bonusItem.bonus.description}</p>
        <div className={styles.footer}>
          <div className={styles.date}>Получен: {bonusItem.created_at}</div>
          <button
            onClick={handleOpen}
            className={`${styles.button} ${
              bonusItem.is_used ? styles.used : ""
            }`}
            disabled={bonusItem.is_used}
          >
            {bonusItem.is_used ? "Использован" : "Показать QR"}
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} className={styles.dialog}>
        <div className={styles.qrContainer}>
          <h3 className={styles.qrTitle}>Ваш QR-код</h3>
          <div className={styles.qrCode}>
            <div className={styles.qrPlaceholder}>QR-CODE</div>
          </div>
          <p className={styles.qrInfo}>
            Покажите этот код сотруднику {bonusItem.bonus.organization_name} для
            активации бонуса
          </p>
          <button onClick={handleClose} className={styles.closeButton}>
            Закрыть
          </button>
        </div>
      </Dialog>
    </div>
  );
});

MyBonus.displayName = "MyBonus";
