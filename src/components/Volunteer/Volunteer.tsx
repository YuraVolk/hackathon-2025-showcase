import { memo, useState } from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import emptyAvatarSrc from "@/assets/icons/empty-avatar.svg";
import arrowDownSrc from "@/assets/icons/icon-bottom.svg";
import classes from "./Volunteer.module.css";

import { Volonter } from "@/models/volunteer";

export interface IVolunteerProps {
  volunteer: Volonter;
  showPersonalData: boolean;
}

export const Volunteer = memo(
  ({ volunteer, showPersonalData }: IVolunteerProps) => {
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleChange = () => {
      setExpanded(!expanded);
    };

    const copyCode = () => {
      navigator.clipboard.writeText((volunteer.id_acc * 678352).toString(36));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        className={classes.volunteer}
        disableGutters
        elevation={0}
        sx={{
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <Image
              src={arrowDownSrc}
              alt="Toggle details"
              width={20}
              height={20}
              className={classes.arrowIcon}
            />
          }
          className={classes.volunteer_summary}
        >
          <div className={classes.avatarWrapper}>
            <Image
              className={classes.volunteer_image}
              src={emptyAvatarSrc}
              alt="Волонтер"
              width={48}
              height={48}
            />
          </div>
          <div className={classes.volunteer_description}>
            <Typography
              variant="subtitle1"
              className={classes.volunteer_description_name}
            >
              {volunteer.fio}
              {volunteer.id_acc && (
                <Tooltip
                  title={copied ? "Скопировано!" : "Копировать код"}
                  placement="top"
                >
                  <Chip
                    label={(volunteer.id_acc * 678352).toString(36)}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCode();
                    }}
                    deleteIcon={<ContentCopyIcon fontSize="small" />}
                    onDelete={copyCode}
                    className={classes.codeChip}
                  />
                </Tooltip>
              )}
            </Typography>
            <Typography
              variant="body2"
              className={classes.volunteer_description_achievements}
            >
              Награжден бонусами за достижения в сфере "
              {volunteer.dost ?? "Не указано"}"
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.volunteer_details}>
          {showPersonalData && (
            <>
              <div className={classes.volunteer_info_item}>
                <Typography variant="body2" className={classes.infoLabel}>
                  ИНН:
                </Typography>
                <Typography variant="body2">
                  Клиент не дал доступа на просмотр личной информации
                </Typography>
              </div>
              <div className={classes.volunteer_info_item}>
                <Typography variant="body2" className={classes.infoLabel}>
                  Email:
                </Typography>
                <Typography variant="body2">
                  Клиент не дал доступа на просмотр личной информации
                </Typography>
              </div>
              <div className={classes.volunteer_info_item}>
                <Typography variant="body2" className={classes.infoLabel}>
                  Дата рождения:
                </Typography>
                <Typography variant="body2">
                  Клиент не дал доступа на просмотр личной информации
                </Typography>
              </div>
            </>
          )}
          <div className={classes.volunteer_bonuses}>
            <Typography variant="subtitle2" className={classes.bonusTitle}>
              История бонусов:
            </Typography>
            {volunteer.nachBonuses?.map((item) => (
              <div key={item.id} className={classes.volunteer_bonus_item}>
                <div className={classes.volunteer_bonus_info}>
                  <Typography variant="body2" className={classes.bonusName}>
                    {item.bonus_name}
                  </Typography>
                  <Typography variant="body2" className={classes.bonusOrg}>
                    {item.bonus_name}
                  </Typography>
                  <Typography variant="caption" className={classes.bonusDate}>
                    {item.bonus_name}
                  </Typography>
                </div>
                <Chip
                  label={false ? "Использован" : "Активен"}
                  color={false ? "default" : "success"}
                  size="small"
                  sx={{
                    backgroundColor: false ? "#444" : "#1e3a8a",
                    color: "white",
                  }}
                />
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }
);

Volunteer.displayName = "Volunteer";
