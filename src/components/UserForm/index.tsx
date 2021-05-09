import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchCenters, setInputs } from "../../store/reducers";

interface FormValues {
  pins: string;
  dates: string;
  districts: string[];
}

const DetailSchema = Yup.object().shape({
  // pins: Yup.string().transform((value) => value.split(/[\s,]+/)).required('Required'),
  // dates: Yup.ref('pins')
  pins: Yup.string(),
  dates: Yup.string(),
});

const UserForm: React.FunctionComponent = () => {
  const initialValues: FormValues = {
    pins: "",
    dates: "",
    districts: [],
  };

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DetailSchema}
      onSubmit={(values, actions) => {
        let pins = values.pins.split(",");
        let dates = values.dates.split(",");
    
        dispatch(setInputs({ dates: dates, pins: pins, mode: dates[0] !== '' }));
        dispatch(fetchCenters({dates, pins}));
      }}
    >
      <Form className="w-screen mt-5 flex h-10 justify-center align-center mx-auto flex-row">
        <Field
          id="pins"
          name="pins"
          placeholder="Enter Pins"
          className="mr-6 w-80 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <Field
          id="dates"
          name="dates"
          placeholder="Enter Dates, defaults to next 7 days"
          className="mr-6 w-80 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md focus:outline-none self-center"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UserForm;
