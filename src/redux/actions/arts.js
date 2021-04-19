import axios from "../axios";

export const fetchArtsById = (payload) => (dispatch) => {
  dispatch({ type: "arts/loading", payload: true });
  axios({
    method: "GET",
    url: "/arts/" + payload,
  })
    .then((response) =>
      dispatch({ type: "arts/fetchById", payload: response.data })
    )
    .catch((err) => dispatch({ type: "arts/error", payload: err }))
    .finally((_) => dispatch({ type: "arts/loading", payload: false }));
};

export function setCategory(payload) {
  return { type: "category/setCategory", payload };
}

export function fetchArt() {
  return (dispatch) => {
    dispatch({ type: "arts/loading", payload: true });
    axios
      .get("/arts")
      .then(({ data }) => {
        return { type: "arts/fetch", payload: data };
      })
      .catch((err) => {
        dispatch({ type: "arts/error", payload: err });
      })
      .then(() => {
        dispatch({ type: "arts/loading", payload: false });
      });
  };
}

export const addArt = (payload) => (dispatch) => {
  console.log(payload.get("title"));
  dispatch({ type: "arts/loading", payload: true });
  axios
    .post("/arts", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: localStorage.access_token,
      },
    })
    .then(({ data }) => {
      return axios("/arts");
    })
    .then(({ data }) => {
      dispatch({ type: "arts/fetch", payload: data });
      return axios("/user", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
    })
    .then(({ data }) => dispatch({ type: "users/fetchById", payload: data }))
    .catch((err) => dispatch({ type: "arts/error", payload: err }))
    .finally((_) => dispatch({ type: "arts/loading", payload: false }));
};
