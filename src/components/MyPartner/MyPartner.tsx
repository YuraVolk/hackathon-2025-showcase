import React, { memo, useState } from "react";
import { QrModal } from "@/components/QrModal/QrModal";
import styles from "./MyPartner.module.css";
import organizationPlaceholder from "@/assets/img/organization-placholder.jpg";
import Image from "next/image";
import { NachBonus, Partner } from "@/models/volunteer";

interface IMyPartnerProps {
  token: string;
  organization: Partner;
}

export const MyPartner = memo(({ organization, token }: IMyPartnerProps) => {
  const [selectedBonus, setSelectedBonus] = useState<NachBonus>();

  const handleShowQr = (bonus: NachBonus) => {
    setSelectedBonus(bonus);
  };

  const handleCloseModal = () => {
    setSelectedBonus(undefined);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={organizationPlaceholder}
          alt={organization.naim}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{organization.naim}</h3>
          <p className={styles.description}>
            Это тестовая созданная организация
          </p>
        </div>
        <div className={styles.bonusesContainer}>
          <h4 className={styles.bonusesTitle}>Доступные бонусы:</h4>
          <ul className={styles.bonusesList}>
            {organization.bonuses?.map((bonus) => (
              <li key={bonus.id} className={styles.bonusItem}>
                <div className={styles.bonusContent}>
                  <h5 className={styles.bonusName}>{bonus.bonus_name}</h5>
                  <p className={styles.bonusDescription}>
                    Большая скидка на все покупки в нашей компании
                  </p>
                </div>
                <button
                  onClick={() => handleShowQr(bonus)}
                  className={styles.qrButton}
                >
                  Получить QR
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedBonus && (
        <QrModal
          open={true}
          onClose={handleCloseModal}
          bonus={selectedBonus}
          token={token}
          organization_name={organization.naim}
        />
      )}
    </div>
  );
});

MyPartner.displayName = "OrganizationCard";
