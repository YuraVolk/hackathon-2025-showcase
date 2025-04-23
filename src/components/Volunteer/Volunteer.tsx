import { memo, useState } from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Chip from "@mui/material/Chip";

import emptyAvatarSrc from "../../assets/icons/empty-avatar.svg";
import arrowDownSrc from "../../assets/icons/icon-bottom.svg";
import classes from "./Volunteer.module.css";

import { IVolunteer } from "@/models/volunteer";

export interface IVolunteerProps {
  volunteer: IVolunteer;
}

export const Volunteer = memo(({ volunteer }: IVolunteerProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      className={classes.volunteer}
      disableGutters
      elevation={0}
    >
      <AccordionSummary
        expandIcon={
          <Image
            src={arrowDownSrc}
            alt="Toggle details"
            width={20}
            height={20}
          />
        }
        className={classes.volunteer_summary}
      >
        <Image
          className={classes.volunteer_image}
          src={emptyAvatarSrc}
          alt="Волонтер"
          width={48}
          height={48}
        />
        <div className={classes.volunteer_description}>
          <span className={classes.volunteer_description_name}>
            {volunteer.fio}{" "}
            <span className={classes.volunteer_description_name_highlighted}>
              ({volunteer.phone_number})
            </span>
          </span>
          <span className={classes.volunteer_description_achievements}>
            Награжден бонусами за достижения в сфере "{volunteer.achievements}"
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.volunteer_details}>
        <div className={classes.volunteer_info_item}>
          <span>ИНН:</span>
          <span>{volunteer.inn}</span>
        </div>
        <div className={classes.volunteer_info_item}>
          <span>Email:</span>
          <span>{volunteer.email}</span>
        </div>
        <div className={classes.volunteer_info_item}>
          <span>Дата рождения:</span>
          <span>{volunteer.birth_date}</span>
        </div>
        <div className={classes.volunteer_bonuses}>
          <h4>История бонусов:</h4>
          {volunteer.history.map((item) => (
            <div key={item.id} className={classes.volunteer_bonus_item}>
              <div className={classes.volunteer_bonus_info}>
                <span>{item.bonus.name}</span>
                <span>{item.bonus.organization_name}</span>
                <span>{item.created_at}</span>
              </div>
              <Chip
                label={item.is_used ? "Использован" : "Активен"}
                color={item.is_used ? "default" : "success"}
                size="small"
              />
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
});

Volunteer.displayName = "Volunteer";
