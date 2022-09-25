import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Matrice from './components/matrice';
import InputMatrice from './components/inputMatrice';

function getFactors(integer: number): number[][] {
  const integerRoot = Math.sqrt(integer);
  const factors: number[][] = [[], []];
  for (let i = 1; i <= integerRoot; i++) {
    if (integer % i === 0) {
      factors[0].push(i);
      factors[1].push(integer / i);
    }
  }

  return factors;
}

function generateMatricesDimensions(factors: number[][]): number[][] {
  const matrices: number[][] = [];

  for (let i = 0; i < factors[0].length; i++) {
    matrices.push([factors[0][i], factors[1][i]], [factors[1][i], factors[0][i]]);
  }

  if (matrices[matrices.length - 1][0] === matrices[matrices.length - 1][1]) {
    matrices.pop();
  }

  return matrices;
}

function getCharacterCodes(word: string): number[] {
  const charCodes: number[] = [];
  for (let i = 0; i < word.length; i++) {
    charCodes.push(word.charCodeAt(i));
  }

  return charCodes;
}

function createMatrice(rowCount: number, columnCount: number, data: number[]): number[][] {
  const matrice: number[][] = [];
  const numberData: number[] = data;

  for (let r = 0; r < rowCount; r++) {
    let newArr: number[] = [];
    for (let c = 0; c < columnCount; c++) {
      newArr.push(numberData.shift()!);
    }
    matrice.push(newArr);
  }

  return matrice;
}

function generateWordMatrice(rowCount: number, columnCount: number, word: string): number[][] {
  const charCodes: number[] = getCharacterCodes(word);

  return createMatrice(rowCount, columnCount, charCodes);
}

function getMatriceDimensions(matrice: number[][]): number[] {
  return [matrice.length, matrice[0].length];
}

function convertColumnsToArrays(matrice: number[][]): number[][] {
  const rows: number[][] = [];

  for (let i = 0; i < matrice[0].length; i++) {
    let newArr: number[] = [];
    for (let r = 0; r < matrice.length; r++) {
      newArr.push(matrice[r][i]);
    }
    rows.push(newArr);
  }

  return rows;
}

function getDotProduct(arr1: number[], arr2: number[]): number {
  if (arr1.length !== arr2.length) {
    return 0;
  }

  let sum: number = 0;

  for (let i = 0; i < arr1.length; i++) {
    sum += arr1[i] * arr2[i];
  }

  return sum;
}

function multiplyMatrices(matrice1: number[][], matrice2: number[][]): number[][] {
  const matrice2_converted = convertColumnsToArrays(matrice2);

  const newMatrix = [];

  for (let r = 0; r < matrice1.length; r++) {
    const newArr = [];
    for (let r2 = 0; r2 < matrice2_converted.length; r2++) {
      newArr.push(getDotProduct(matrice1[r], matrice2_converted[r2]));
    }
    newMatrix.push(newArr);
  }

  return newMatrix;
}

const m = [
  [1, 2, 3],
  [2, 4, 5]
]
const milo = [[111, 108, 105, 109]];
const m2 = [
  [2, 5],
  [2, 7],
  [2, 9],
  [2, 1],
]

export default function App() {
  const [word, setWord] = useState<string>('');
  const [matriceDimensions, setMatriceDimensions] = useState<number[]>([]);
  const [buttons, setButtons] = useState<JSX.Element[]>([]);
  const [wordMatrice, setWordMatrice] = useState<number[][]>([]);
  const [keyMatrice, setKeyMatrice] = useState<number[][]>([]);

  return (
    <div className="page">
      <div className="header">
        <h1 className="main-heading"> matrix encoder </h1>
      </div>

      <div className="input-area">
        <h2>Enter a word to encode. <br /> It will be converted into a matrice consisting of UTF-16 decimal char codes.
        </h2>
        <input
          type="text"
          name="word-to-encode"
          value={word}
          onChange={(e) => {
            const localWord = e.currentTarget.value;
            if (localWord !== '') {
              setWord(localWord);
              const dimensions: number[][] = generateMatricesDimensions(getFactors(localWord.length));
              const d_buttons = [];
              for (let i = 0; i < dimensions.length; i++) {
                d_buttons.push(
                  <button
                    type="button"
                    key={`${dimensions[i]}`}
                    onClick={() => {
                      setMatriceDimensions(dimensions[i]);
                      setWordMatrice(generateWordMatrice(dimensions[i][0], dimensions[i][1], localWord));
                    }}
                  >
                    {dimensions[i][0]} x {dimensions[i][1]}
                  </button>
                );
                setButtons(d_buttons);
              }
            } else {
              setButtons([]);
              setWord('');
              setWordMatrice([]);
              setMatriceDimensions([]);
            }

          }}
          placeholder=". . ."
          className="word-input"
        />
        <div className="buttons-container">
          {buttons}
        </div>

        {word !== ''
          &&
          <>
            <Matrice matrice={wordMatrice} color={"#AFDCEC"} />
            <InputMatrice matrice={wordMatrice} setStateFunction={setKeyMatrice} color={"#32CD32"} />
          </>
        }


      </div>
    </div>
  )
}