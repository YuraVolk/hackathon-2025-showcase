import React, { memo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { IVolunteer } from "@/models/volunteer";

interface IFormData {
  category: string;
  assignedCount: string;
  additionalAssignments: IVolunteer[];
  title: string;
  description: string;
}

const categories = [
  "А (1-50-е места)",
  "Б (51-100-е места)",
  "В (101-150-е места)",
];

interface IAddBonusModalProps {
  volunteers: IVolunteer[];
  open: boolean;
  onClose: () => void;
}

export const AddBonusModal = memo(
  ({ open, volunteers, onClose }: IAddBonusModalProps) => {
    const [formData, setFormData] = useState<IFormData>({
      category: "",
      assignedCount: "",
      additionalAssignments: [],
      title: "",
      description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      onClose();
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Создать новый вид бонуса</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Категория</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                label="Категория"
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }));
                }}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              id="assignedCount"
              name="assignedCount"
              label="Количество назначенных человек"
              type="number"
              value={formData.assignedCount}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  assignedCount: event.target.value,
                }));
              }}
              required
              inputProps={{ min: 0 }}
            />
            <Autocomplete
              multiple
              id="additionalAssignments"
              options={volunteers}
              getOptionLabel={(option) => option.fio}
              value={formData.additionalAssignments}
              onChange={(_, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  additionalAssignments: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Дополнительные назначения"
                  placeholder="Поиск..."
                />
              )}
            />
            <TextField
              fullWidth
              margin="normal"
              id="title"
              name="title"
              label="Название"
              value={formData.title}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  title: event.target.value,
                }));
              }}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="description"
              name="description"
              label="Описание"
              multiline
              rows={4}
              value={formData.description}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  description: event.target.value,
                }));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Отмена</Button>
            <Button type="submit" variant="contained" color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);

AddBonusModal.displayName = "AddBonusModal";
