import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const EventModal = ({ isOpen, onClose, onSubmitForm, task }) => {
  
  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description : task?.description || "",
      date: task?.date || "",
      location: task?.location || "",
      status: task?.status || "open",
      createdBy: task?.createdBy || "",
      _id : null
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Event title is required"),
      date: Yup.string().required("Date is required"),
      location: Yup.string().required("location is required"),
    }),
    onSubmit: (values , {  resetForm}) => {
      onSubmitForm(values);
      resetForm();
      onClose();
    },
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

 
  useEffect(() => {
    if (task) {
      formik.setValues({
        _id : task._id,
        title: task.title || "",
        description : task?.description || "",
        date: formatDateForInput(task.date || "")  || "",
        location: task?.location || "",
        status: task?.status || "open",
        createdBy: task?.createdBy || "",
        status: task.status || "open",
      });
    }
  }, [task]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">{task ? "Edit Event" : "Create Event"}</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}
        </div>


        <div>
          <input
            type="text"
            name="description"
            placeholder="Event description"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        <div>
          <input
            type="datetime-local"
            name="date"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("date")}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-500 text-sm">{formik.errors.date}</div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="location"
            className="w-full p-2 border rounded"
            placeholder="Enter location"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          )}
        </div>


        {/* Status Toggle Switch */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Status</label>
          <div
            className={`relative w-14 h-7 rounded-full cursor-pointer transition ${
              formik.values.status === "open" ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() =>
              formik.setFieldValue("status", formik.values.status === "open" ? "close" : "open")
            }
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition ${
                formik.values.status === "close" ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="text-sm">{formik.values.status === "close" ? "Closed" : "Open"}</span>
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {task ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EventModal;
