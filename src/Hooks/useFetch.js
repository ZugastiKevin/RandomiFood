import { LogFailure, LogSuccess } from "store/Log/LogActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Url from "components/Url";
import Cookies from "js-cookie";

export const useFetch = (method = "GET", payload) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const doFetch = async (endUrl) => {
    const cookie = Cookies.get("token");
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (payload) {
      options.body = JSON.stringify(payload);
    }
    try {
      const response = await fetch(Url() + endUrl, options);
      const responseContent = await response.json();
      setData(responseContent);
    } catch (error) {
      setError(error.message);
    }
  };

  return { data, error, doFetch };
};

export const useFetchUserLog = (method = "GET", payload) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const doFetch = async (endUrl) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (payload) {
      options.body = JSON.stringify(payload);
    }
    try {
      const response = await fetch(Url() + endUrl, options);
      const responseContent = await response.json();
      
      if (responseContent.user.id) {
        Cookies.set("token", responseContent.jwt);
        Cookies.set("id", responseContent.user.id);
        dispatch(LogSuccess(responseContent, true));
        console.log("Connecté.");
      } else {
        dispatch(LogFailure(responseContent.message, false));
        Cookies.remove("token");
        console.log("Désolé, une erreur est survenue.");
      }
      setData(responseContent);
    } catch (error) {
      setError(error.message);
    }
  };

  return { data, error, doFetch };
};

export const useFetchUserCreate = (method = "GET", payload) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const doFetch = async (endUrl) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (payload) {
      options.body = JSON.stringify(payload);
    }
    try {
      const response = await fetch(Url() + endUrl, options);
      const responseContent = await response.json();
      if (responseContent.ok) {
        dispatch(LogSuccess(responseContent, false));
        console.log("Votre compte a été créé avec succès");
      } else {
        dispatch(LogFailure(data.error, false));
        console.log("Désolé, une erreur est survenue.");
      }
      setData(responseContent);
    } catch (error) {
      setError(error.message);
    }
  };

  return { data, error, doFetch };
};
