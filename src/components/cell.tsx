import { useState } from 'react';

interface PropTypes {
  onChange: Function,
  color: string,
  r: number,
  c: number
}

export default function Cell(props: PropTypes) {
  const [cellValue, setCellValue] = useState<number>(0);

  const styles = {
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
      boxShadow: "rgb(0 0 0 / 30%) 5px 5px 75px inset",
      padding: "0px",
      margin: "0px",
      border: "0px"
    }
  }

  return (
    <input
      type="number"
      value={cellValue}
      style={styles.cell}
      onChange={(e)=>{
        if (e.currentTarget.value !== '') {
          setCellValue(Number(e.currentTarget.value));
        } else {
          setCellValue(0);
        }
        props.onChange(Number(e.currentTarget.value), props.r, props.c);
      }}  
    />
  )


}