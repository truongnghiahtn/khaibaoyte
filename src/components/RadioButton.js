import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
export default function RadioButton(props) {

  const [Value, setValue] = useState({ option: "Yes", optionValid: false });

  useEffect(() => {
    // console.log(Value)
    // if (!Value) {
    //   seterrValue("Đây là một câu hỏi bắt buộc");
    // }
    props.dataradio(Value)
  }, [Value])
  const onchangeValues = (e) => {

    setValue({ option: e.target.value, optionValid: e.target.value ? true : false });
  }

  return (
    <div className={`input-group ${false ? "input-err" : ""}`}>
      <h4>
        Có tiếp xúc với trường hợp bệnh hoặc nghi ngờ mắc bệnh COVID 19
        {true ? <span> *</span> : ""}
      </h4>
      <FormControl>
        <RadioGroup aria-label="gender" value={Value.option} name="gender1" onChange={onchangeValues}>
          <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Có" />
          <FormControlLabel value="No" control={<Radio color="primary" />} label="Không" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
