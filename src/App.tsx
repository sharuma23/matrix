import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Matrice from './components/matrice';

function getFactors(integer: number) : number[][] {
  const integerRoot = Math.sqrt(integer);
  const factors: number[][] = [[], []];
  for (let i = 1; i <= integerRoot; i++) {
    if (integer % i === 0) {
      factors[0].push(i);
      factors[1].push(integer/i);
    }
  }

  return factors;
} 

function generateMatricesDimensions(factors: number[][]) : number[][] {
  const matrices : number[][] = [];

  for (let i = 0; i < factors[0].length; i++) {
    matrices.push([factors[0][i], factors[1][i]], [factors[1][i], factors[0][i]]);
  }

  if (matrices[matrices.length-1][0] === matrices[matrices.length-1][1]) {
    matrices.pop();
  }

  return matrices;
}

function getCharacterCodes(word: string) : number[] {
  const charCodes : number[] = [];
  for (let i = 0; i < word.length; i++) {
    charCodes.push(word.charCodeAt(i));
  }

  return charCodes;
}

function createMatrice(rowCount : number, columnCount : number, data : number[]) : number[][] {
  const matrice : number[][] = [];
  const numberData : number[] = data;

  for (let r = 0; r < rowCount; r++) {
    let newArr : number[] = [];
    for (let c = 0; c < columnCount; c++) {
      newArr.push(numberData.pop()!);  
    }
    matrice.push(newArr);
  }

  return matrice;
}

function convertWordToMatrice(rowCount:number, columnCount:number, word: string) : number[][] {
   const charCodes : number[] = getCharacterCodes(word);

   return createMatrice(rowCount, columnCount, charCodes);
}

function getMatriceDimensions(matrice : number[][]) : number[] {
  return [matrice.length, matrice[0].length];
}

function convertColumnsToArrays(matrice : number[][]) : number[][] {
  const rows : number[][] = [];

  for (let i = 0; i < matrice[0].length; i++) {
  let newArr : number[] = [];
    for (let r = 0; r < matrice.length; r++) {
      newArr.push(matrice[r][i]);
    }
    rows.push(newArr);
  }

  return rows;
}

function getDotProduct(arr1 : number[], arr2 : number[]) : number {
  if (arr1.length !== arr2.length) {
    return 0;
  }

  let sum : number = 0;

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

let m1 = [
  [2, 5],
  [2, 6],
  [1, 8],
  [4, 9]
];

let m2 = [
  [2, 8, 7],
  [9, 2, 1]
];

console.log(multiplyMatrices(m1, m2));

export default function App() {
  const [matrice, setmatrice] = useState<number[]>([]);
  const [wordLength, setWordLength] = useState<number>(0);
  const [word, setWord] = useState<string>('');
  const [factors, setFactors] = useState<number[][]>([]);


  return (
    <>
      <form>
        <input
          type="text"
          name="word"
          placeholder="Enter a word to encrypt" 
          onChange={(e) => {
            setWord(e.currentTarget.value);
            setWordLength(e.currentTarget.value.length);
            setFactors(getFactors(e.currentTarget.value.length));
          }}
          />
      </form>
      {wordLength}
      <br/>
      {word}
      <Matrice rowCount={3} columnCount={3}/>
    </>
  )
}