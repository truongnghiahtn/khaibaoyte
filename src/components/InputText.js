import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
export default function InputText() {
  return (
    <div className={`input-group ${true ? "input-err" : ""}`}>
      <h4>Họ và tên{true ? <span> *</span> : ""}</h4>
      <FormControl err={false}>
        <Input error={true} placeholder="Câu trả lời của bạn" />
        <FormHelperText className={false ? "d-none" : "err-text"}>
          <i class="fa fa-exclamation"></i> Đây là một câu hỏi bắt buộc
        </FormHelperText>
      </FormControl>
    </div>
  );
}
