import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailUser, updateUser } from "../store/actionCreator";
import axios from "axios";
import Swal from "sweetalert2";

const Edit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user.data);
  // console.log({ id });
  // console.log(user);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  const [image, setImage] = useState("");
  useEffect(() => {
    dispatch(detailUser(id));
  }, []);
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        photo: user.photo || "",
      });

      setImage(user.photo || "");
    }
  }, [user]);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    // if (!file) {
    //   setImage(user.age);
    //   return;
    // }

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
    console.log(form, id);
    // console.log(form.firstName.includes(" "));
    if (form.firstName.includes(" ") || form.lastName.includes(" ")) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "first name or last name cannot contain spaces.",
      });
      return;
    }
    dispatch(updateUser(id, form)).then((data) => {
      console.log({ data });
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
          title: "Failed",
          text: "Check your connection.",
        });
      }
    });
  };

  if (!user || !user.firstName || !user.lastName || !user.age) {
    return (
      <div className=" top-0  left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-500 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-blue-600 text-xl font-semibold">
          Loading...
        </h2>
        <p className="w-1/3 text-center  text-blue-600">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    );
  }
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
                  <img src={user.photo} className="rounded-full" />
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

export default Edit;
