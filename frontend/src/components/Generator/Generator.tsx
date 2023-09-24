import { useState, useEffect } from "react";
import { fetchGridData } from "../../api/Generator";
import {
  Container,
  Header,
  GridContainer,
  GridCell,
  Button,
  Label,
  Input,
  VerticalContainer,
  CodeBox,
} from "./Generator-styled";

const columns = 10;
const rows = 10;

export const Generator = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [code, setCode] = useState<string>("**");
  const [isGeneratorRunning, setIsGeneratorRunning] = useState<boolean>(false);
  const [canType, setCanType] = useState<boolean>(true);
  const [char, setChar] = useState<string>("");

  const [genInterval, setGenInterval] = useState<number | undefined>(undefined);

  useEffect(() => {
    // on mount, draw the  grid with blank cells
    const grid = Array.from({ length: columns }, () =>
      Array.from({ length: rows }, () => "")
    );
    setGrid(grid);
  }, []);

  useEffect(() => {
    if (isGeneratorRunning) {
      clearInterval(genInterval);
      const intervalId = setInterval(fetchData, 2000); // Fetch data every 2 seconds with the new 'char'
      setGenInterval(intervalId);
    }
  }, [char, isGeneratorRunning]);

  const toggleGenerator = () => {
    if (isGeneratorRunning) {
      // generator is running, stop it
      clearInterval(genInterval);
      setGenInterval(undefined);
      setIsGeneratorRunning(false);
    } else {
      // generator is not running, start it
      fetchData();
      const intervalId = setInterval(fetchData, 2000); // Fetch data every second
      setGenInterval(intervalId);
      setIsGeneratorRunning(true);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetchGridData(char, columns, rows);
      const data = await response.json();
      setGrid(data.grid);
      setCode(data.code);
    } catch (error) {
      console.error("Error fetching grid data:", error);
    }
  };

  const charValidator = (e: React.CompositionEvent<HTMLInputElement>) => {
    const char = e.data;
    //allow only alphabetic characters. allow only one character.
    if (char.match(/^[a-zA-Z]+$/)) {
      e.currentTarget.value = char;
      setChar(char);

      setCanType(false);
      setTimeout(() => {
        setCanType(true);
      }, 4000);
    }
  };

  return (
    <Container className="flex max-w">
      <Header className="text-3xl">Generator</Header>
      <Header>
        <VerticalContainer>
          <Label className="text-gray-700 font-semibold text-xs ">
            CHARACTER
          </Label>
          <Input
            className="border rounded border-gray-400"
            placeholder="Character"
            disabled={!canType}
            onBeforeInput={charValidator}
            maxLength={1}
          />
        </VerticalContainer>

        <Button
          className="border rounded border-gray-400 bg-slate-500 text-white font-semibold"
          onClick={toggleGenerator}
        >
          {isGeneratorRunning ? <>STOP GENERATOR</> : <>GENERATE 2D GRID</>}
        </Button>
      </Header>
      <GridContainer>
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <GridCell
                className="border border-gray-400"
                key={`cell-${rowIndex}-${cellIndex}`}
              >
                {cell}
              </GridCell>
            ))}
          </div>
        ))}
      </GridContainer>
      <CodeBox className="border rounded border-gray-400">
        YOUR CODE: <strong>{code}</strong>
      </CodeBox>
    </Container>
  );
};
