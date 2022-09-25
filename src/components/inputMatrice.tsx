import { useState } from 'react';
import Cell from './cell'

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
  const [keyMatrice, setKeyMatrice] = useState<number[][]>(new Array(rowCount).fill(new Array(columnCount).fill(0)));
  // props.setMatrice(new Array(rowCount).fill(new Array(columnCount).fill(0)));

  const styles = {
    container: {
      display: "flex",
      gap: "10px",
      width: `${110 * columnCount + 5 * (columnCount - 1)}px`,
      flexWrap: "wrap",
      justifyContent: "center",
      // padding: "25px"
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

  const cells = [];

  const onChange = (number : number, r : number, c : number) => {
    let copy = keyMatrice;
    copy[r][c] = number;
    setKeyMatrice(copy);
    props.setMatrice(copy);
  }

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      cells.push(
        <Cell
          key={`${[r, c]}`}
          color={props.color}
          r={r}
          c={c}
          onChange={onChange}
        />
      )
    }
  }

  return (
    <div style={styles.container}>
      {cells}
    </div>
  )
}