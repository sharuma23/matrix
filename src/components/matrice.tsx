interface PropTypes {
  matrice: number[][],
  color: string,
  showChar: boolean

}

export default function Matrice(props: PropTypes) {
  if (props.matrice[0] === undefined) {
    return <></>;
  }

  const columnCount: number = props.matrice[0].length;
  const rowCount: number = props.matrice.length;

  const styles = {
    container: {
      display: "flex",
      gap: "10px",
      width: `${110 * columnCount + 5 * (columnCount - 1)}px`,
      flexWrap: "wrap",
      justifyContent: "center"
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
        <span style={styles.cell} key={`${[r, c]}`}>
          {props.matrice[r][c]}
          {props.showChar &&
            <>
              <br />
              <br />
              {String.fromCharCode(props.matrice[r][c])}
            </>
          }
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