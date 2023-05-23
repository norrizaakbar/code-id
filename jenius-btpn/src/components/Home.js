import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/actionCreator";
import Card from "./Card";

const Home = () => {
  const users = useSelector((state) => state.user.users.data);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [users]);
  //   console.log(users);
  const handleSearch = () => {
    console.log(search);
    const filteredUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filteredUsers);
  };
  if (!users) {
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
    <>
      <div className="flex justify-center items-center pt-2 ">
        <div className="w-full sm:w-1/3">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search by name"
              aria-label="Search"
              aria-describedby="button-addon3"
            />

            <button
              onClick={handleSearch}
              className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              type="button"
              id="button-addon3"
              data-te-ripple-init
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mx-5 min-h-screen flex-wrap justify-evenly md:flex my-28 ">
        {filter
          ? filter.map((user) => <Card key={user.id} user={user} />)
          : users.map((user) => <Card key={user.id} user={user} />)}
      </div>
    </>
  );
};

export default Home;
