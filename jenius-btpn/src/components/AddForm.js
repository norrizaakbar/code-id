import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postUser } from "../store/actionCreator";
import Swal from "sweetalert2";

const AddForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  const [image, setImage] = useState("");

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (
        !file.type.includes("image/jpeg") &&
        !file.type.includes("image/png")
      ) {
        alert("Format foto yang diizinkan hanya JPG dan PNG.");
        return;
      }

      if (file.size > 100 * 1024) {
        alert("Ukuran file maksimal adalah 100KB.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "zhnuw755");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dntojzudz/image/upload",
          formData
        );

        const imageUrl = response.data.secure_url;

        setImage(imageUrl);
      } catch (error) {
        console.log("Error uploading image:", error);
        alert("Terjadi kesalahan saat mengunggah gambar. Silakan coba lagi.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.photo = image;
    console.log(form);
    if (form.firstName.includes(" ") || form.lastName.includes(" ")) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "first name or last name cannot contain spaces.",
      });
      return;
    }
    dispatch(postUser(form)).then((data) => {
      if (data.status === 201) {
        Swal.fire({
          icon: "success",
          title: `${data.status} ${data.statusText}`,
          text: "Success add new contact.",
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: `Failed`,
          text: "Failed add new contact.",
        });
      }
    });
  };
  return (
    <div className="min-h-screen bg-blue-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Add New Contact</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    onChange={changeHandler}
                    value={form.firstName}
                    autoComplete="off"
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="First Name"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={changeHandler}
                    value={form.lastName}
                    autoComplete="off"
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Last Name"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    onChange={changeHandler}
                    value={form.age}
                    autoComplete="off"
                    id="age"
                    name="age"
                    type="number"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Age"
                  />
                  <label
                    htmlFor="age"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Age
                  </label>
                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    accept=".jpg,.png"
                    onChange={handleImage}
                    id="image"
                    name="image"
                    type="file"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 my-2"
                    placeholder="Age"
                  />
                  <label
                    htmlFor="image"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Image
                  </label>
                </div>
                <div className="relative">
                  <div className="flex flex-row justify-around">
                    <button
                      type="submit"
                      className="relative inline-flex items-center px-3.5 py-2 rounded-full border-2 border-sky-400 bg-transparent text-sm text-sky-400 font-medium hover:rounded-xl hover:border-pink-600 hover:text-pink-600 transition-all duration-100"
                    >
                      Submit
                    </button>
                    <Link
                      to="/"
                      type="cancel"
                      className="relative inline-flex items-center px-3.5 py-2 rounded-full border-2 border-pink-400 bg-transparent text-sm text-pink-500 font-medium hover:rounded-xl hover:border-pink-600 hover:text-pink-600 transition-all duration-100"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
