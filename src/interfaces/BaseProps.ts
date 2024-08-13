import { ReactNode } from "react";

/**
 * Props interface for components that accept children as a prop.
 *
 * @property {ReactNode} children - The child elements or components to be rendered inside the component.
 */
export interface BaseProps {
  children: ReactNode;
}
