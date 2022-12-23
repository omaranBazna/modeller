export const generateID = () => {
  const arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let generated = "";
  let len = arr.length - 1;
  for (let i = 0; i < 30; i++) {
    let index = Math.floor(Math.random() * len);

    generated += arr[index];
  }
  return generated;
};

export const generateDirectory = () => {
  const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const len = arr.length - 1;
  let generated = "";

  for (let i = 0; i < 15; i++) {
    let index = Math.floor(Math.random() * len);

    generated += arr[index];
  }

  return generated;
};
