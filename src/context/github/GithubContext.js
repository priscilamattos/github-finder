import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const REACT_APP_GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_TOKEN = "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";

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  //Get initial users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(
      `${REACT_APP_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const { items } = await response.json();

    if (items) {
      dispatch({
        type: "GET_USERS",
        payload: [...items],
      });
    }
  };

  //Get single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${REACT_APP_GITHUB_URL}/users?${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };
  //Clear search results
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  //Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
