import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
export default function RadioButton() {
  return (
    <div className={`input-group ${true ? "input-err" : ""}`}>
      <h4>
        Có tiếp xúc với trường hợp bệnh hoặc nghi ngờ mắc bệnh COVID 19
        {true ? <span> *</span> : ""}
      </h4>
      <FormControl>
        <RadioGroup aria-label="gender" name="gender1">
          <FormControlLabel value={true} control={<Radio />} label="Có" />
          <FormControlLabel value={false} control={<Radio />} label="Không" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
