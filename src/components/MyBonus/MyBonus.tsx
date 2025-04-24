import React, { memo, useState } from "react";
import styles from "./MyBonus.module.css";
import Image from "next/image";
import bonusPlaceholder from "@/assets/img/bonus-placeholder.jpg";
import { NachBonus } from "@/models/volunteer";
import { QrModal } from "../QrModal/QrModal";

interface IBonusCardProps {
  token: string;
  bonusItem: NachBonus;
}

export const MyBonus = memo(({ bonusItem, token }: IBonusCardProps) => {
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
          alt={bonusItem.bonus_name ?? ""}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{bonusItem.bonus_name}</h3>
          <span className={styles.organization}>Новое предприятие</span>
        </div>
        <div className={styles.footer}>
          <div className={styles.date}>
            Получен: {bonusItem.time_received ?? ""}
          </div>
          <button
            onClick={handleOpen}
            className={`${styles.button} ${false ? styles.used : ""}`}
            disabled={false}
          >
            {false ? "Использован" : "Показать QR"}
          </button>
        </div>
      </div>
      <QrModal
        open={open}
        onClose={handleClose}
        organization_name="Новое предприятие"
        token={token}
        bonus={bonusItem}
      />
    </div>
  );
});

MyBonus.displayName = "MyBonus";
