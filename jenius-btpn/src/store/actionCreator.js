import { ADD, DELETE, DETAIL, FETCH_PRODUCTS } from "./actionTypes";
import axios from "axios";
const baseUrl = "https://contact.herokuapp.com/contact";
export const fetchUserSuccess = (payload) => {
  return {
    type: FETCH_PRODUCTS,
    payload,
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    return fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then((data) => {
        const action = fetchUserSuccess(data);
        dispatch(action);
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const postUser = (payload) => {
  return (dispatch) => {
    console.log(payload);
    return fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((data) => {
      return data;
    });
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    console.log(id);
    return axios
      .delete(`${baseUrl}/${id}`)
      .then((res) => res.data)
      .catch((e) => e);
  };
};

export const detailSuccess = (payload) => {
  return {
    type: DETAIL,
    payload,
  };
};
export const detailUser = (id) => {
  return (dispatch) => {
    console.log(id);
    return fetch(`${baseUrl}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const action = detailSuccess(data);
        dispatch(action);
      });
  };
};

// export const updateUser = (id, payload) => {
//   return (dispatch) => {
//     // console.log({ body: JSON.stringify(payload), id });
//     let body = JSON.stringify(payload);
//     console.log({ body });
//     return (
//       fetch(`${baseUrl}/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body,
//       })
//         // .then((res) => res.json())

//         .then((data) => {
//           console.log(data);
//           return data;
//         })
//     );
//   };
// };
export const updateUser = (id, payload) => {
  return async (dispatch) => {
    console.log({ id, payload });
    return axios
      .put(`${baseUrl}/${id}`, payload)
      .then((res) => res)
      .catch((e) => e);
  };
};
