import React, { Fragment } from "react";
import UserComponent from "../../components/UserComponent";
// import PageTitleArea from "../../components/PageTitleArea";

function UserPage() {


  const renderPageTitle = () => {
    if (sessionStorage.getItem("template")) {
      var temPlateLocal = JSON.parse(sessionStorage.getItem("template"));
    }
    console.log(temPlateLocal)
    console.log(123)
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: temPlateLocal.Content,
        }}
      ></div>
    )
  }
  return (
    <Fragment>
      {renderPageTitle()}
      <UserComponent />
    </Fragment>
  );
}

export default UserPage;
