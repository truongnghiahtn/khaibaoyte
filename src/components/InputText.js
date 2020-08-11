import React, { useState, useEffect, useLayoutEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
export default function InputText(props) {

  const [Value, setValue] = useState({ text: "", inputValid: true });
  const [errValue, seterrValue] = useState("");
  useEffect(() => {
    console.log(Value)
    if (!Value.inputValid) {
      seterrValue("Đây là một câu hỏi bắt buộc");
    }
  }, [Value])

  const Onchange = (e) => {


    setValue({ text: e.target.value, inputValid: e.target.value ? true : false })

    // 
    // 
    // 
    // so dt
    // 
  }
  return (
    <div className={`input-group ${!Value.inputValid ? "input-err" : ""}`}>
      <h4>Họ và tên{true ? <span> *</span> : ""}</h4>
      <FormControl err={"false"}>
        <Input onChange={Onchange} error={!Value.inputValid} placeholder="Câu trả lời của bạn" />
        <FormHelperText className={!Value.inputValid ? "err-text" : "d-none"}>
          <i className="fa fa-exclamation"></i> {errValue}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
