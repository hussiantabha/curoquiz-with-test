const getQuiz1DataUtil = async () => {
  try {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=30&difficulty=medium&type=multiple"
    );
    return getData;
  } catch {}
};

const getFilmQuizDataUtil = async () => {
  try {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=11&difficulty=medium&type=multiple"
    );
    return getData;
  } catch {}
};
const getSportsQuizDataUtil = async () => {
  try {
    const getData = await fetch(
      "https://opentdb.com/api.php?amount=6&category=21&difficulty=hard&type=multiple"
    );
    return getData;
  } catch (error) {}
};

export { getQuiz1DataUtil, getFilmQuizDataUtil, getSportsQuizDataUtil };
