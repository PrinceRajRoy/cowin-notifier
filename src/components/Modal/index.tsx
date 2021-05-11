import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../../containers/ModalContainer";
import { RootState } from "../../store";
import { toggleModal } from "../../store/reducers";

const Modal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { messages, toggle } = useSelector((state: RootState) => state.modal);

  const handleToggle = () => {
    dispatch(toggleModal([]));
  };

  return (
    <ModalContainer
      close={handleToggle}
      visible={toggle}
      title={messages.length ? "Alert" : "How To Use"}
    >
      <ul className="text-sm list-disc px-4 flex flex-col gap-6">
        {messages.length ? (
          messages.map((msg) => <li key={msg}>{msg}</li>)
        ) : (
          <>
            <li>
              Enter Pincodes in the format Pin1,Pin2,Pin3,... similarly dates
              Date1,Date2,Date3,...
            </li>
            <li>
              If dates are not provided, results for the next 7 days will be shown
            </li>
            <li>
              Select the time duration from dropdown, based on which the slots
              will be checked at regural intervals
            </li>
            <li>
              To receive mobile notification, one needs to have IFTTT app
              installed on mobile, follow the steps from this{" "}
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
              and get a key
            </li>
            <li>
              The Govt. has limited the API request limit at 100 calls/5 min per IP, make sure (Total Pin Codes * Total Dates)/(Timer Minutes) {"<="} 20
            </li>
            <li>
              <span className="text-red-600 font-bold">Keep this tab open</span>, a script will be running in the background, polling the Cowin APIs at provided time intervals
            </li>
          </>
        )}
      </ul>
    </ModalContainer>
  );
};

export default Modal;
