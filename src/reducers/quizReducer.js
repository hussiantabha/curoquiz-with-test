import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import {
  getQuiz1DataUtil,
  getFilmQuizDataUtil,
  getSportsQuizDataUtil,
} from "./utils";

const QuizContext = createContext({});

const QuizContextProvider = ({ children }) => {
  const getQuiz1Data = async () => {
    const getData = await getQuiz1DataUtil();
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item, index) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
          _id: index + 1,
        };
      });
      dispatch({ type: "addquiz1Data", payload: { value: newArr } });
    }
    return getData;
  };
  const getFilmQuizData = async () => {
    const getData = await getFilmQuizDataUtil();
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item, index) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
          _id: index + 1,
        };
      });
      dispatch({ type: "addFilmQuizData", payload: { value: newArr } });
    }
  };
  const getSportsQuizData = async () => {
    const getData = await getSportsQuizDataUtil();
    if (getData.status === 200) {
      const convertedJSON = await getData.json();
      const newArr = await convertedJSON.results.map((item, index) => {
        return {
          ...item,
          options: [...item.incorrect_answers, item.correct_answer],
          _id: index + 1,
        };
      });
      dispatch({ type: "addSportsQuizData", payload: { value: newArr } });
    }
  };
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "addquiz1Data": {
        return { ...state, quiz1Data: action.payload.value };
      }
      case "gadgetQuizAnswers": {
        return { ...state, gadgetQuizAnswers: action.payload.value };
      }
      case "addFilmQuizData": {
        return { ...state, filmQuizData: action.payload.value };
      }
      case "filmQuizAnswers": {
        return { ...state, filmQuizAnswers: action.payload.value };
      }
      case "addSportsQuizData": {
        return { ...state, sportsQuizData: action.payload.value };
      }
      case "sportsQuizAnswers": {
        return { ...state, sportsQuizAnswers: action.payload.value };
      }
      case "userLoggedIn": {
        return { ...state, userLoggedIn: action.payload.value };
      }
      default: {
        return { ...state };
      }
    }
  };
  const [quizState, dispatch] = useReducer(reducerFunc, {
    quiz1Data: [],
    gadgetQuizAnswers: [],
    filmQuizData: [],
    filmQuizAnswers: [],
    sportsQuizData: [],
    sportsQuizAnswers: [],
    userLoggedIn: false,
  });
  useEffect(() => {
    getQuiz1Data();
    getFilmQuizData();
    getSportsQuizData();
    if (sessionStorage.getItem("token") === null) {
      dispatch({ type: "userLoggedIn", payload: { value: false } });
    } else if (sessionStorage.getItem("token") === "undefined") {
      dispatch({ type: "userLoggedIn", payload: { value: false } });
    } else {
      dispatch({ type: "userLoggedIn", payload: { value: true } });
    }
  }, []);
  return (
    <QuizContext.Provider value={{ quizState, dispatch, getQuiz1Data }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "addquiz1Data": {
      return { ...state, quiz1Data: action.payload.value };
    }
    case "gadgetQuizAnswers": {
      return { ...state, gadgetQuizAnswers: action.payload.value };
    }
    case "addFilmQuizData": {
      return { ...state, filmQuizData: action.payload.value };
    }
    case "filmQuizAnswers": {
      return { ...state, filmQuizAnswers: action.payload.value };
    }
    case "addSportsQuizData": {
      return { ...state, sportsQuizData: action.payload.value };
    }
    case "sportsQuizAnswers": {
      return { ...state, sportsQuizAnswers: action.payload.value };
    }
    case "userLoggedIn": {
      return { ...state, userLoggedIn: action.payload.value };
    }
    default: {
      return { ...state };
    }
  }
};
export const initalState = {
  quiz1Data: [],
  gadgetQuizAnswers: [],
  filmQuizData: [],
  filmQuizAnswers: [],
  sportsQuizData: [],
  sportsQuizAnswers: [],
  userLoggedIn: false,
};
export const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=6&category=30&difficulty=medium&type=multiple"
    );
    return response;
  } catch {}
};
