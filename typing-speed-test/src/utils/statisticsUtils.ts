export const calculateAccuracy = (correctLetters: number, totalLetters: number): number => {
  if (totalLetters === 0) return 0; // Avoid division by zero
  const accuracy = (correctLetters / totalLetters) * 100;
  return parseFloat(accuracy.toFixed(2)); // Return the accuracy rounded to two decimal places
};

export const calculateCPM = (correctLetters: number, totalTime: number): number => {
  if (correctLetters === 0 || totalTime === 0) return 0;
  return parseInt(String((correctLetters / totalTime) * 60));
};


//TODO: [bug] if i start from mistake it is alyways 0
export const calculateWPM = (correctWords: number, totalTime: number): number => {
  if (totalTime === 0) return 0;
  const minutes = totalTime / 60;
  const wpm = correctWords / minutes;
  return Math.round(wpm);
};
