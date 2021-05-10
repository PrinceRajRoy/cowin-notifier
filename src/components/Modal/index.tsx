import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../../containers/ModalContainer";
import { RootState } from "../../store";
import { toggleModal } from "../../store/reducers";

const Modal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { message, toggle } = useSelector((state: RootState) => state.modal);

  const handleToggle = () => {
    dispatch(toggleModal(""));
  };

  return (
    <ModalContainer
      close={handleToggle}
      visible={toggle}
      title={message.length ? "Alert" : "How To Use"}
    >
      {message.length ? (
        message
      ) : (
        <>
          <ul className="text-sm list-disc px-4 flex flex-col gap-6">
            <li>
              Enter Pincodes in the format Pin1,Pin2,Pin3,... similarly dates
              Date1,Date2,Date3,...
            </li>
            <li>
              Select the time duration from dropdown, based on which the slots
              will be checked at regural intervals
            </li>
            <li>
              To receive mobile notification, one needs to have IFTTT app
              installed on mobile follow steps from this{" "}
              <a
                href={
                  "https://betterprogramming.pub/how-to-send-push-notifications-to-your-phone-from-any-script-6b70e34748f6"
                }
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                blog
              </a>{" "}
              and get a key.
            </li>
          </ul>
        </>
      )}
    </ModalContainer>
  );
};

export default Modal;
