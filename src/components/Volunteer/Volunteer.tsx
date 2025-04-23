import { memo, useState } from "react";
import Image from "next/image";

import emptyAvatarSrc from "../../assets/icons/empty-avatar.svg";
import arrowDownSrc from "../../assets/icons/icon-bottom.svg";
import classes from "./Volunteer.module.css";

import { IVolunteer } from "@/models/volunteer";

export interface IVolunteerProps {
  volunteer: IVolunteer;
}

export const Volunteer = memo(({ volunteer }: IVolunteerProps) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className={classes.volunteer}>
      <Image
        className={classes.volunteer_image}
        src={emptyAvatarSrc}
        alt="Волонтер"
      />
      <div className={classes.volunteer_wrap}>
        <div className={classes.volunteer_info}>
          <div className={classes.volunteer_description}>
            <span className={classes.volunteer_description_name}>
              {volunteer.fio}{" "}
              <span className={classes.volunteer_description_name_highlighted}>
                ({volunteer.phone_number})
              </span>
            </span>
            <span className={classes.volunteer_description_achievements}>
              Награжден бонусами за достижения в сфере "{volunteer.achievements}
              "
            </span>
          </div>
          <button
            className={classes.volunteer_more_info_button}
            onClick={() => {
              setExpanded((isExpanded) => !isExpanded);
            }}
          >
            <Image src={arrowDownSrc} alt="Волонтер" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
});

Volunteer.displayName = "Volunteer";
