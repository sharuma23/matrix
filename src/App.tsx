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

function multiplyMatrice(matrice1 : number[][], matrice2 : number[][]) : number[][] {
  const matrice1_rowCount : number = matrice1.length;
  const matrice1_columnCount : number = matrice1[0].length;
  const matrice2_rowCount : number = matrice2.length;
  const matrice2_columnCount : number = matrice2[0].length;

  if (matrice1_columnCount === matrice2_rowCount) {
    return [[0]];
  }

  

}

// console.log(JSON.stringify(convertWordToMatrice(2, 2, "abcd")));

console.log(generateMatricesDimensions(getFactors(8)));
console.log(createMatrice(2, 4, getCharacterCodes("SHIVANSH")));

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