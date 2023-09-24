// 10x10 grid with random alphabetic lowercase characters.
export const generateGrid = (
  modifier: string,
  columns: number,
  rows: number
) => {
  const grid: string[][] = [];
  const chars: string = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < columns; i++) {
    const row: string[] = [];
    for (let j = 0; j < rows; j++) {
      const index = Math.floor(Math.random() * chars.length);
      let character = chars[index];

      row.push(character);
    }

    grid.push(row);
  }

  //if modifier is set, make sure exactly 20% of the grid is made up of the modifier character.
  if (modifier !== "" && chars.includes(modifier) && modifier.length === 1) {
    console.log("modifier", modifier);
    const modifierCount = Math.floor((grid.flat().length / 100) * 20);
    let count = 0;
    while (count < modifierCount) {
      const row = Math.floor(Math.random() * grid.length);
      const column = Math.floor(Math.random() * grid[row].length);
      if (grid[row][column] !== modifier) {
        grid[row][column] = modifier;
        count++;
      }
    }
    console.log("countover");
  }

  return grid;
};

// Generate 2digit code based on grid and system clock
export const generateCode = (grid: string[][]): number => {
  //make sure seconds is always 2 digits
  const seconds = new Date().getSeconds().toString().padStart(2, "0");

  console.log("seconds", seconds);

  //split seconds into 2 digits
  const firstDigit = parseInt(seconds[0]);
  const secondDigit = parseInt(seconds[1]);

  //get the characters from the grid
  const firstChar = grid[firstDigit][secondDigit];
  const secondChar = grid[secondDigit][firstDigit];

  //count the number of occurences of each character in the grid
  const firstCharCount = grid
    .flat()
    .filter((char) => char === firstChar).length;
  const secondCharCount = grid
    .flat()
    .filter((char) => char === secondChar).length;

  //if count is larger than 9, divie the count by the lowest integer possible in order to get a value lower or equal to 9
  const firstCharCountMod =
    firstCharCount > 9 ? Math.floor(firstCharCount / 9) : firstCharCount;
  const secondCharCountMod =
    secondCharCount > 9 ? Math.floor(secondCharCount / 9) : secondCharCount;

  return parseInt(firstCharCountMod.toString() + secondCharCountMod.toString());
};
