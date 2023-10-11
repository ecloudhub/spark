import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Menu {
  // Element to toggle the menu state
  button?: React.ReactElement;
  // Menu content
  children: ReactNode;
  // Menu will be visible or hidden based on isOpen value. Default: false.
  isOpen?: boolean;
  // To show or hide the overlay. Default: false.
  withOverlay?: boolean;
  // To close menu on overlay click. Default: true.
  closeOnOverlayClick?: boolean;
  // For customization purposes you can pass classes to the menu container. Default: ''.
  menuClass?: string;
  // For customization purposes you can pass classes to the body. Default: ''.
  bodyClass?: string;
  // For customization purposes you can pass classes to the overlay. Default: ''.
  overlayClass?: string;
  // Menu alignment. Default: 'left'.
  alignment?: "left" | "right";
  // The function the overlay will execute on click
  onClose: Dispatch<SetStateAction<boolean>>;
}
