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

import { IVolunteer } from "@/models/volunteer";

export interface IVolunteerProps {
  volunteer: IVolunteer;
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
      navigator.clipboard.writeText(volunteer.unique_code);
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
            {volunteer.unique_code && (
              <Tooltip
                title={copied ? "Скопировано!" : "Копировать код"}
                placement="top"
              >
                <Chip
                  label={volunteer.unique_code}
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
          </div>
          <div className={classes.volunteer_description}>
            <Typography
              variant="subtitle1"
              className={classes.volunteer_description_name}
            >
              {volunteer.fio}
              {showPersonalData && (
                <Typography
                  component="span"
                  className={classes.volunteer_description_phone}
                >
                  {volunteer.phone_number}
                </Typography>
              )}
            </Typography>
            <Typography
              variant="body2"
              className={classes.volunteer_description_achievements}
            >
              Награжден бонусами за достижения в сфере "{volunteer.achievements}
              "
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
                <Typography variant="body2">{volunteer.inn}</Typography>
              </div>
              <div className={classes.volunteer_info_item}>
                <Typography variant="body2" className={classes.infoLabel}>
                  Email:
                </Typography>
                <Typography variant="body2">{volunteer.email}</Typography>
              </div>
              <div className={classes.volunteer_info_item}>
                <Typography variant="body2" className={classes.infoLabel}>
                  Дата рождения:
                </Typography>
                <Typography variant="body2">{volunteer.birth_date}</Typography>
              </div>
            </>
          )}
          <div className={classes.volunteer_bonuses}>
            <Typography variant="subtitle2" className={classes.bonusTitle}>
              История бонусов:
            </Typography>
            {volunteer.history.map((item) => (
              <div key={item.id} className={classes.volunteer_bonus_item}>
                <div className={classes.volunteer_bonus_info}>
                  <Typography variant="body2" className={classes.bonusName}>
                    {item.bonus.name}
                  </Typography>
                  <Typography variant="body2" className={classes.bonusOrg}>
                    {item.bonus.organization_name}
                  </Typography>
                  <Typography variant="caption" className={classes.bonusDate}>
                    {item.created_at}
                  </Typography>
                </div>
                <Chip
                  label={item.is_used ? "Использован" : "Активен"}
                  color={item.is_used ? "default" : "success"}
                  size="small"
                  sx={{
                    backgroundColor: item.is_used ? "#444" : "#1e3a8a",
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
