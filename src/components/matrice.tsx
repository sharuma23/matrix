interface PropTypes {
  rowCount: number,
  columnCount: number,
}

export default function Matrice(props: PropTypes) {
  
  const styles = {
    container : {
      display: "flex",
      gap: "10px",
      width: `${110 * props.columnCount + 5*(props.columnCount-1)}px`,
      flexWrap: "wrap"
    },
    cell : {
      backgroundColor : "#32CD32",
      borderRadius : "15px",
      height: "100px",
      width: "100px",
    }
  };
  
  const cellCount = props.columnCount * props.rowCount;

  const emptyElements = [];

  for (let i = 0; i < cellCount; i++) {
    emptyElements.push(
      <b style={styles.cell} key={i}/>
    )
  }

  return (
    <div style={styles.container}>
      {emptyElements}
    </div>
  )
}