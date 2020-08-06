import React, { Fragment } from "react";
import InputText from "../../../components/InputText";
import CheckBox from "../../../components/CheckBox";
import RadioButton from "../../../components/RadioButton";

export default function Template1() {
  return (
    <Fragment>
      <section className="description"></section>
      <section className="img-template"></section>
      <section className="user">
        <InputText />
        <CheckBox />
        <RadioButton />
      </section>
    </Fragment>
  );
}
