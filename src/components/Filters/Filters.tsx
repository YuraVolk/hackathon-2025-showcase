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

const textFieldStyles = {
  "& fieldset": {
    borderColor: "#1e3a8a !important",
    transition: "all 50ms ease",
  },
  "&:hover fieldset": {
    borderColor: "#1e3a8a !important",
    borderWidth: "2px !important",
    transition: "all 50ms ease",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#1e3a8a !important",
    borderWidth: "2px !important",
    transition: "all 50ms ease",
  },
  "& .MuiInputLabel-root": {
    color: "#1e3a8a",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1e3a8a",
  },
};

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
              placeholder="Выберите достижения..."
              sx={textFieldStyles}
            />
          )}
          sx={{
            "& .MuiChip-root": {
              backgroundColor: "#1e3a8a",
              color: "white",
            },
            "& .MuiChip-deleteIcon *": {
              fill: "white",
            },
          }}
        />
        <div className={classes.filters_row}>
          <DatePicker
            slotProps={{
              field: { clearable: true },
              textField: {
                sx: textFieldStyles,
              },
            }}
            className={classes.filters_input}
            label="Минимальная дата рождения"
            value={minBirthDate}
            onChange={(newValue) => setMinBirthDate(newValue)}
          />
          <DatePicker
            slotProps={{
              field: { clearable: true },
              textField: {
                sx: textFieldStyles,
              },
            }}
            className={classes.filters_input}
            label="Максимальная дата рождения"
            value={maxBirthDate}
            onChange={(newValue) => setMaxBirthDate(newValue)}
          />
          <FormControl className={classes.filters_input}>
            <InputLabel
              id="sorting-select-label"
              sx={{
                color: "#1e3a8a",
                "&.Mui-focused": {
                  color: "#1e3a8a",
                },
              }}
            >
              Сортировка
            </InputLabel>
            <Select
              labelId="sorting-select-label"
              id="sorting-select"
              value={sorting}
              label="Сортировка"
              onChange={handleChangeSorting}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1e3a8a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1e3a8a",
                  borderWidth: "2px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1e3a8a",
                  borderWidth: "2px",
                },
              }}
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
