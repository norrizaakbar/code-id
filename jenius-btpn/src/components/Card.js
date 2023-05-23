import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/actionCreator";
import Swal from "sweetalert2";

const Card = ({ user }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    // console.log(id);
    dispatch(deleteUser(id)).then((data) => {
      console.log(data.response);
      if (data.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: `Failed`,
          text: `Contact with id:${id} failed to delete`,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: `Success`,
          text: `Contact with id:${id} success to delete`,
        });
      }
    });
  };
  return (
    <div className=" py-8 mb-10 px-10 text-center rounded-md shadow-xl transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto h-80 md:w-96 hover:rounded-xl hover:scale-90 transition-all duration-200">
      <img
        className="w-36 h-36 object-cover rounded-full mx-auto shadow-lg"
        src={
          user.photo !== "N/A"
            ? user.photo
            : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        }
        alt="User avatar"
      />
      <p className="capitalize text-xl mt-1">
        {user.firstName + " " + user.lastName}
      </p>
      <span className="flex items-center border rounded-full w-24 pr-2 justify-center mx-auto mt-2 mb-12">
        <div className="bg-green-400 rounded-full w-2.5 h-2.5 block mr-2"></div>
        Age: {user.age}
      </span>
      <div className="flex flex-row justify-evenly">
        <Link
          to={`edit/${user.id}`}
          className="rounded-3xl bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-4 inline hover:bg-gradient-to-indigo hover:from-indigo-500 hover:to-blue-400 hover:scale-110 hover:text-gray-200 transition-all duration-300"
        >
          <AiOutlineEdit size={30} />
        </Link>

        <div
          onClick={() => handleDelete(user.id)}
          className="rounded-3xl bg-gradient-to-r from-pink-400 to-red-500 text-xl text-white pt-3 pb-4 px-4 inline hover:bg-gradient-to-indigo hover:from-red-500 hover:to-pink-400 hover:scale-110 hover:text-gray-200 transition-all duration-300"

          //   className=" rounded-3xl mx-6 bg-gradient-to-r from-red-400 to-red-600  flex text-center items-center px-2 hover:scale-105 transition-all duration-150"
        >
          <button>
            <AiOutlineDelete size={30} color="#eaeaea" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
