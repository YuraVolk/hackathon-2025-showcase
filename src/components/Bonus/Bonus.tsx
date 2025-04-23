import { memo, useMemo, useState } from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";

import emptyAvatarSrc from "../../assets/icons/empty-avatar.svg";
import arrowDownSrc from "../../assets/icons/icon-bottom.svg";
import classes from "./Bonus.module.css";

import { IBonus, IBonusHistoryItem, IVolunteer } from "@/models/volunteer";

export interface IBonusWithVolunteers {
  bonus: IBonus;
  assignments: {
    historyItem: IBonusHistoryItem;
    volunteer: IVolunteer;
  }[];
}

export interface IBonusProps {
  bonusWithVolunteers: IBonusWithVolunteers;
}

export const Bonus = memo(({ bonusWithVolunteers }: IBonusProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const amountOfActiveBonuses = useMemo(
    () =>
      bonusWithVolunteers.assignments.reduce(
        (sum, assignemnt) => sum + (assignemnt.historyItem.is_used ? 0 : 1),
        0
      ),
    [bonusWithVolunteers]
  );

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      className={classes.bonus}
      disableGutters
      elevation={0}
    >
      <AccordionSummary
        expandIcon={
          <Image
            src={arrowDownSrc}
            alt="Раскрыть список волонтеров"
            width={20}
            height={20}
          />
        }
        className={classes.bonus_summary}
      >
        <div className={classes.bonus_info}>
          <h3 className={classes.bonus_name}>
            {bonusWithVolunteers.bonus.name}
          </h3>
          <div className={classes.bonus_organization}>
            {bonusWithVolunteers.bonus.organization_name}
          </div>
          <Chip
            label={`Общее число назначений: ${bonusWithVolunteers.assignments.length}`}
            size="small"
            color="info"
          />
          <Chip
            label={`Количество активных бонусов: ${amountOfActiveBonuses}`}
            size="small"
            color={amountOfActiveBonuses === 0 ? "error" : "success"}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.bonus_details}>
        <div className={classes.bonus_description}>
          {bonusWithVolunteers.bonus.description}
        </div>
        <h4 className={classes.assigned_volunteers_title}>
          Назначенные волонтеры:
        </h4>
        <div className={classes.volunteers_list}>
          {bonusWithVolunteers.assignments.map((assignment) => (
            <div key={assignment.historyItem.id} className={classes.volunteer}>
              <Image
                className={classes.volunteer_image}
                src={emptyAvatarSrc}
                alt="Volunteer"
                width={40}
                height={40}
              />
              <div className={classes.volunteer_info}>
                <div className={classes.volunteer_name}>
                  {assignment.volunteer.fio}
                  <span className={classes.volunteer_contact}>
                    ({assignment.volunteer.phone_number})
                  </span>
                </div>
                <div className={classes.assignment_info}>
                  <span>Назначен в: {assignment.historyItem.created_at}</span>
                  <Chip
                    label={
                      assignment.historyItem.is_used
                        ? "Использованный"
                        : "Активный"
                    }
                    size="small"
                    color={
                      assignment.historyItem.is_used ? "default" : "success"
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
});

Bonus.displayName = "Bonus";
