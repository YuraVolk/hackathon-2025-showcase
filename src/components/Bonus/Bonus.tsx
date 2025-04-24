import { memo, useMemo, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionSummary,
  Box,
  Typography,
  Stack,
  Chip,
  AccordionDetails,
  Divider,
} from "@mui/material";
import emptyAvatarSrc from "@/assets/icons/empty-avatar.svg";
import arrowDownSrc from "@/assets/icons/icon-bottom.svg";
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

  const { bonus, assignments } = bonusWithVolunteers;
  const activeCount = useMemo(
    () => assignments.filter((a) => !a.historyItem.is_used).length,
    [assignments]
  );

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      className={classes.bonus}
      disableGutters
      elevation={0}
    >
      <AccordionSummary
        expandIcon={
          <Image
            src={arrowDownSrc}
            alt="Раскрыть"
            width={20}
            height={20}
            className={classes.arrowIcon}
          />
        }
        className={classes.summary}
      >
        <Box className={classes.summaryContent}>
          <Box className={classes.bonusHeader}>
            <Typography variant="subtitle1" className={classes.bonusName}>
              {bonus.name}
            </Typography>
            <Stack direction="row" spacing={1} className={classes.stats}>
              <Chip
                label={`${assignments.length} назначенных`}
                size="small"
                className={classes.chip}
              />
              <Chip
                label={`${activeCount} активных`}
                size="small"
                className={`${classes.chip} ${classes.activeChip}`}
              />
            </Stack>
          </Box>
          <Typography variant="body2" className={classes.orgName}>
            {bonus.organization_name}
          </Typography>
          <Box className={classes.meta}>
            <Typography variant="caption" className={classes.date}>
              Создан: {assignments[0]?.historyItem.created_at || "-"}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {bonus.description && (
          <>
            <Typography variant="body2" className={classes.description}>
              {bonus.description}
            </Typography>
            <Divider className={classes.divider} />
          </>
        )}
        <Typography variant="subtitle2" className={classes.volunteersTitle}>
          Волонтеры ({assignments.length})
        </Typography>
        <Box className={classes.volunteersGrid}>
          {assignments.map(({ volunteer, historyItem }) => (
            <Box key={volunteer.id} className={classes.volunteerCard}>
              <Image
                src={emptyAvatarSrc}
                alt=""
                width={40}
                height={40}
                className={classes.avatar}
              />
              <Box className={classes.volunteerInfo}>
                <Typography variant="body2" className={classes.volunteerName}>
                  {volunteer.fio}
                </Typography>
                <Box className={classes.volunteerMeta}>
                  <Typography variant="caption" className={classes.phone}>
                    {volunteer.phone_number}
                  </Typography>
                  <Chip
                    label={historyItem.is_used ? "Использован" : "Активен"}
                    size="small"
                    className={
                      !historyItem.is_used ? classes.activeChip : undefined
                    }
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
});

Bonus.displayName = "Bonus";
