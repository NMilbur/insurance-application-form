import type { ArrayHelpers } from "formik";
import { Button, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface AddButtonProps {
  push: ArrayHelpers["push"];
  text: string;
  dataTemplate: unknown;
}

export const AddButton = ({ push, text, dataTemplate }: AddButtonProps) => (
  <Button variant="outlined" color="primary" onClick={() => push(dataTemplate)}>
    {text}
  </Button>
);

interface DeleteButtonProps {
  remove: ArrayHelpers["remove"];
  idx: number;
}

export const DeleteButton = ({ remove, idx }: DeleteButtonProps) => (
  <IconButton onClick={() => remove(idx)} color="error">
    <DeleteIcon />
  </IconButton>
);
