import ReactDOM from "react-dom";
import OptionalDialog from "../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";

// alert globally with yes and no button
function alertOptional(title, content, agree, disagree) {
  // document.getElementById("js-global").innerHTML =
  //   "<div class='js-global-dialog'></div>";
  // ReactDOM.render(
  //   <OptionalDialog
  //     title={title}
  //     content={content}
  //     agree={agree}
  //     disagree={disagree}
  //   />,
  //   document.getElementById("js-global")
  // );
}

function initGlobalFunction() {
  window.alertOptional = alertOptional;
  window.testName = "as";
}

export default { initGlobalFunction };
