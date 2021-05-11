import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ModalContainerProps {
  visible?: boolean;
  close(): void;
  title: string;
  children: ReactNode;
}

const ModalContainer: React.FunctionComponent<ModalContainerProps> = ({
  visible = true,
  close,
  title,
  children,
}) => {
  return createPortal(
    visible ? (
      <>
        <div
          className="w-screen h-screen fixed inset-0 overlay-in"
          onClick={close}
        ></div>
        <div className="w-1/2 md-max:w-screen fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-blue-100 rounded-lg p-4 max-h-4/5 overflow-hidden">
          <div className="border-b-2 border-blue-300 border-opacity-60 pb-1 mb-6">
            {title}
          </div>
          {children}
        </div>
      </>
    ) : null,
    document.getElementById("modal-root")!
  );
};

export default ModalContainer;
