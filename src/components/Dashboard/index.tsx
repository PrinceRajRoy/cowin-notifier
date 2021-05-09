import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  AvailableCenter,
  Center,
  selectAvailableCenters,
  selectCenters,
  selectRest,
} from "../../store/reducers";
import checkExists from "../../utilities/checkExists";

const Dashboard: React.FunctionComponent = () => {
  const availableCenters = useSelector(selectAvailableCenters);
  const centers = useSelector(selectCenters);
  const { dates, mode, week } = useSelector(selectRest);

  const [showAvailable, setShowAvailable] = useState(true);

  let show = showAvailable ? centers : availableCenters;

  return (
    <div className="w-full mx-auto py-10 divide-y divide-blue-200">
      <div className="w-5/6 mx-auto">
      <div className="flex items-center mb-1">
        <input
          id="showCheck"
          type="checkbox"
          className="mr-2"
          onChange={() => setShowAvailable((showAvailable) => !showAvailable)}
        />
        <label htmlFor="showCheck">Show Only Available Centers</label>
      </div>
      <table className="w-full shadow break-all border-b border-gray-200 sm:rounded-lg divide-y divide-gray-200 text-left text-sm overflow-scroll">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-white-500 uppercase tracking-wider">
              {centers.length ? "Address" : "Results Will Be Shown Here"}
            </th>
            {mode
              ? dates.map((date) => (
                  <th
                    key={date}
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-white-500 uppercase tracking-wider"
                  >
                    {date}
                  </th>
                ))
              : week.map((date) => (
                  <th
                    key={date}
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-white-500 uppercase tracking-wider"
                  >
                    {date}
                  </th>
                ))}
          </tr>
        </thead>
        {show.length ? (
          <tbody className="bg-white divide-y divide-gray-200">
            {show.map((center) => (
              <tr key={center.center_id}>
                <td className="px-6 py-4 w-1/5 break-words">
                  <div>{center.name}</div>
                  <div>{center.address}</div>
                </td>
                {!mode ? (
                  week.map((date) =>
                    checkExists((center as Center).sessions, date) ? (
                      (center as Center).sessions.map((session) =>
                        /* Center Session Date and Week Date Matched */
                        session.available_capacity && session.date === date ? (
                          <td
                            className="px-6 py-4 whitespace-nowrap"
                            key={session.session_id}
                          >
                            <div>{session.available_capacity} Doses</div>
                            <div>For {session.min_age_limit}+</div>
                          </td>
                        ) : /* Center Session Date and Week Date Matched But No Available Slots Or Date Of The Week Didn't Match */
                        session.date === date ? (
                          <td
                            className="px-6 py-4 whitespace-nowrap"
                            key={session.session_id}
                          >
                            NA
                          </td>
                        ) : null
                      )
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap" key={date}>
                        NA
                      </td>
                    )
                  )
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {(center as AvailableCenter).available_capacity} Doses
                    </div>
                    <div>For {(center as AvailableCenter).min_age_limit}+</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      </div>
    </div>
  );
};

export default Dashboard;
