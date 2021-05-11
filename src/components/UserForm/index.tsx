import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { setInputs } from "../../store/reducers";
import setNotifier from "../../utilities/notifier";

interface FormValues {
  pins: string;
  dates: string;
  desktop: boolean;
  mobile: boolean;
  gmail: boolean;
  key: string;
  timer: number;
}

const DetailSchema = yup.object().shape({
  pins: yup
    .string()
    .matches(
      /^\d{6}(,\d{6})*$/,
      "enter comma separated values in correct format"
    )
    .required(),
  dates: yup
    .string()
    .matches(
      /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4})(,([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}))*$/,
      "enter comma separated values in correct format"
    ),
  desktop: yup.boolean(),
  mobile: yup.boolean(),
  gmail: yup.boolean(),
  key: yup.string().when("mobile", {
    is: true,
    then: yup.string().length(22).required(),
    otherwise: yup.string().length(22),
  }),
  timer: yup.number().when(["desktop", "mobile", "gmail"], {
    is: (
      desktop: FormValues["desktop"],
      mobile: FormValues["mobile"],
      gmail: FormValues["gmail"]
    ) => desktop || mobile || gmail,
    then: yup
      .number()
      .required()
      .not([0], "Please Select A Value From Dropdown"),
    otherwise: yup.number(),
  }).test({
    name: 'Check Total API calls',
    message: `Given inputs will limit the API, read How To Use`,
    test: function(value) {
      let pinsLength = this.parent.pins?.split(",").length ?? 0;
      let datesLength = this.parent.dates?.split(",").length ?? 0;
      return (pinsLength * datesLength)/(value as number) <= 20;
    }
  }),
});

const UserForm: React.FunctionComponent = () => {
  const initialValues: FormValues = {
    pins: "",
    dates: "",
    desktop: false,
    mobile: false,
    gmail: false,
    key: "",
    timer: 0,
  };

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DetailSchema}
      onSubmit={(values, actions) => {
        let pins = values.pins.split(",");
        let dates = values.dates.split(",");
        let timer = values.timer;
        let key = values.key;
        let desktop = values.desktop;
        let mobile = values.mobile;
        let gmail = values.gmail;

        dispatch(
          setInputs({ dates: dates, pins: pins, mode: dates[0] !== "" })
        );
        setNotifier(key, timer, dates, pins, desktop, mobile, gmail);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, values }) => (
        <Form className="w-screen mt-5 flex items-center flex-col">
          <div className="flex flex-row">
            <div className="flex flex-col items-start">
              <Field
                id="pins"
                name="pins"
                placeholder="Enter Pins"
                className="mr-6 w-80 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {errors.pins && touched.pins ? (
                <div className="text-red-600 text-sm fade-in">
                  {errors.pins}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-start">
              <Field
                id="dates"
                name="dates"
                placeholder="Enter Dates, defaults to next 7 days"
                className="w-80 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {errors.dates && touched.dates ? (
                <div className="text-red-600 text-sm fade-in">
                  {errors.dates}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-row my-2">
            Get Notification as
            <label className="inline-flex items-center ml-4">
              <Field type="checkbox" name="desktop" className="mt-0.5 mr-0.5" />
              Desktop Alert
            </label>
            <label className="inline-flex items-center ml-4">
              <Field type="checkbox" name="mobile" className="mt-0.5 mr-0.5" />
              Mobile Notification
            </label>
            <label className="inline-flex items-center ml-4">
              <Field
                type="checkbox"
                name="gmail"
                className="mt-0.5 mr-0.5"
                disabled
              />
              Gmail (WIP)
            </label>
          </div>
          {values.mobile ? (
            <div className="flex flex-col items-start mb-6">
              <Field
                name="key"
                placeholder="Enter IFTTT Key"
                className="fade-in w-80 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {errors.key && touched.key ? (
                <div className="text-red-600 text-sm fade-in">{errors.key}</div>
              ) : null}
            </div>
          ) : null}
          {values.mobile || values.desktop || values.gmail ? (
            <div className="flex flex-col items-start mb-6">
              <Field
                as="select"
                name="timer"
                className="fade-in w-80 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option disabled value={0}>
                  Notify After Every
                </option>
                <option value={1}>1 min</option>
                <option value={2}>2 mins</option>
                <option value={5}>5 mins</option>
                <option value={10}>10 mins</option>
                <option value={15}>15 mins</option>
                <option value={25}>25 mins</option>
                <option value={30}>30 mins</option>
                <option value={60}>1 hour</option>
              </Field>
              {errors.timer && touched.timer ? (
                <div className="text-red-600 text-xs fade-in">
                  {errors.timer}
                </div>
              ) : null}
            </div>
          ) : null}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md focus:outline-none self-center"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
