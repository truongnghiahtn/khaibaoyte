import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CheckBox(props) {



  const [values, setValue] = useState([]);



  useEffect(() => {
    // console.log(values)
    props.datacheck(values)
  }, [values])
  const helo = () => {
    // console.log(values)
    props.datacheck(values)
  }
  const onchangeFormControl = (e) => {

    let { value } = e.target
    // let mang = values;

    let index = values.findIndex(item => {
      return item === value
    })
    if (index != -1) {
      values.splice(index, 1);
      setValue(values);
      helo();
    }
    else {
      setValue([...values, value])
    }


  }

  return (
    <div className={`input-group ${false ? "input-err" : ""}`}>
      <h4>Trong vòng 14 ngày Anh/ Chị có dấu hiệu nào sau đây không?</h4>
      <FormControl error={true} onChange={onchangeFormControl}>
        {["Option 1", "Option 2", "Option 3"].map((item, index) => (
          <FormControlLabel
            value={item}
            key={index}
            control={<Checkbox color="primary" />}
            label={item}
            labelPlacement={item}
          />
        ))}
      </FormControl>
    </div>
  );
}
