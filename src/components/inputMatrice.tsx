import { useState } from 'react';

interface PropTypes {
  matrice: number[][],
  color: string,
  setMatrice: Function

}

export default function InputMatrice(props: PropTypes) {
  if (props.matrice[0] === undefined) {
    return <></>;
  }

  const columnCount: number = props.matrice[0].length;
  const rowCount: number = props.matrice.length;
  const [keyMatrice, setKeyMatrice] = useState<number[][]>([]);

  const mainArr : number[][] = [];
  for (let r = 0; r < rowCount; r++) {
    const newArr: number[] = [];
    newArr.length = columnCount;
    mainArr.push(newArr);
  }

  const styles = {
    container: {
      display: "flex",
      gap: "10px",
      width: `${110 * columnCount + 5 * (columnCount - 1)}px`,
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "25px"
    },
    cell: {
      backgroundColor: props.color,
      borderRadius: "15px",
      height: "100px",
      width: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      font: "'Courier Prime', monospace",
      fontSize: "2rem",
      boxShadow: "rgb(0 0 0 / 30%) 5px 5px 75px inset"
    }
  };

  const cellCount = columnCount * rowCount;

  const cells = [];

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      cells.push(
        <span
          style={styles.cell}
          key={`${[r, c]}`}
          contentEditable={true}
          onInput={(e) => {
            mainArr[r][c] = Number(e.currentTarget.value);
            props.setMatrice(mainArr);
          }}
        >
        </span>
      )
    }
  }

  return (
    <div style={styles.container}>
      {cells}
    </div>
  )
}