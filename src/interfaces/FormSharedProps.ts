import { FormMode } from "../types/Types";

/**
 * Props interface for components that require form mode information.
 *
 * @property {FormMode} formMode - The mode of the form, indicating whether it is in "add" or "edit" mode.
 */
export interface FormSharedProps {
  formMode: FormMode;
}
