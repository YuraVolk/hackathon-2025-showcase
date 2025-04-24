import React, { memo, useState } from "react";
import { QrModal } from "@/components/QrModal/QrModal";
import styles from "./MyPartner.module.css";
import organizationPlaceholder from "@/assets/img/organization-placholder.jpg";
import Image from "next/image";
import { IBonusHistoryItem, IOrganization } from "@/models/volunteer";

interface IMyPartnerProps {
  organization: IOrganization;
}

export const MyPartner = memo(({ organization }: IMyPartnerProps) => {
  const [selectedBonus, setSelectedBonus] = useState<IBonusHistoryItem>();

  const handleShowQr = (bonus: IBonusHistoryItem) => {
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
          alt={organization.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{organization.name}</h3>
          <p className={styles.description}>{organization.description}</p>
        </div>
        <div className={styles.bonusesContainer}>
          <h4 className={styles.bonusesTitle}>Доступные бонусы:</h4>
          <ul className={styles.bonusesList}>
            {organization.bonuses.map((bonus) => (
              <li key={bonus.id} className={styles.bonusItem}>
                <div className={styles.bonusContent}>
                  <h5 className={styles.bonusName}>{bonus.bonus.name}</h5>
                  <p className={styles.bonusDescription}>
                    {bonus.bonus.description}
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
          organization_name={organization.name}
        />
      )}
    </div>
  );
});

MyPartner.displayName = "OrganizationCard";
