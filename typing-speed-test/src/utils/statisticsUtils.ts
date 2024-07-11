export const calculateAccuracy = (correctLetters: number, totalLetters: number): number => {
  if (totalLetters === 0) return 0; // Avoid division by zero
  const accuracy = (correctLetters / totalLetters) * 100;
  return parseFloat(accuracy.toFixed(2)); // Return the accuracy rounded to two decimal places
};

export const calculateCPM = (correctLetters: number, totalTime: number): number => {
  if (correctLetters === 0 || totalTime === 0) return 0;
  return parseInt(String((correctLetters / totalTime) * 60));
};

export const calculateWPM = (correctWords: number, totalTime: number): number => {
  console.log(correctWords, totalTime);
  if (correctWords === 0 || totalTime === 0) return 0;
  return parseInt(String((correctWords / totalTime) * 60));
};
