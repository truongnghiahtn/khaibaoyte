import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CheckBox() {
  return (
    <div className={`input-group ${true ? "input-err" : ""}`}>
      <h4>Trong vòng 14 ngày Anh/ Chị có dấu hiệu nào sau đây không?</h4>
      <FormControl error={false}>
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
