import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, memo, SetStateAction } from "react";
import { Dayjs } from "dayjs";

import classes from "./Filters.module.css";
import { Sorting } from "@/data/filters";

export interface IFiltersProps {
  achievements: string[];
  setAchievements: Dispatch<SetStateAction<string[]>>;
  sorting: Sorting;
  setSorting: Dispatch<SetStateAction<Sorting>>;
  achievementTypes: string[];
  minBirthDate: Dayjs | null;
  setMinBirthDate: Dispatch<SetStateAction<Dayjs | null>>;
  maxBirthDate: Dayjs | null;
  setMaxBirthDate: Dispatch<SetStateAction<Dayjs | null>>;
}

export const Filters = memo(
  ({
    achievementTypes,
    achievements,
    setAchievements,
    sorting,
    setSorting,
    minBirthDate,
    setMinBirthDate,
    maxBirthDate,
    setMaxBirthDate,
  }: IFiltersProps) => {
    const handleChangeSorting = (event: SelectChangeEvent<typeof sorting>) => {
      setSorting(event.target.value as Sorting);
    };

    const handleAchievementsChange = (_event: any, newValue: string[]) => {
      setAchievements(newValue);
    };

    return (
      <div className={classes.filters}>
        <Autocomplete
          multiple
          options={achievementTypes}
          getOptionLabel={(option) => option}
          value={achievements}
          onChange={handleAchievementsChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Достижения"
              placeholder="Достижения..."
            />
          )}
        />
        <div className={classes.filters_row}>
          <DatePicker
            className={classes.filters_input}
            label="Минимальная дата рождения"
            value={minBirthDate}
            onChange={(newValue) => setMinBirthDate(newValue)}
          />
          <DatePicker
            className={classes.filters_input}
            label="Максимальная дата рождения"
            value={maxBirthDate}
            onChange={(newValue) => setMaxBirthDate(newValue)}
          />
          <FormControl className={classes.filters_input}>
            <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sorting}
              label="Сортировка"
              onChange={handleChangeSorting}
            >
              <MenuItem value={Sorting.ByAchievementsAscending}>
                {Sorting.ByAchievementsAscending}
              </MenuItem>
              <MenuItem value={Sorting.ByAchievementsDescending}>
                {Sorting.ByAchievementsDescending}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
);

Filters.displayName = "Filters";
