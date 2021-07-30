import "../styles/buttonTemplate.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { changeIsDeploy } from "../store/actions/forms";
// import { getTemplateId } from "../store/actions/template";
import { useParams } from "react-router";

export default function ButtonTemplate({ templateData }) {
  const history = useHistory();
  const dispatch = useDispatch();
  // const templateId = useSelector((state) => state.forms.templateId);
  const { templateId } = useParams();
  // const projectTitle = useSelector((state) => state.forms.projectTitle);
  // const isDeploy = useSelector((state) => state.forms.isDeploy);
  // console.log(templateId, `ini templateId dari buttton component`);
  // console.log(isDeploy, `ini isDeploy dari buttton component`);

  function handleDeploy() {
    dispatch(changeIsDeploy(templateId, { isDeploy: true }))
      .then((data) => {
        // console.log(data, `ini data dari changeIsDeploy`);
        // dispatch(getTemplateId(templateId));
        // history.push(`/deploy/${templateId}`);
        history.push("/dashboard");
        const host =
          "https://webber-web-builder.web.app";
        const win = window.open(
          `${host}/deploy/${
            templateData.navbar.companyName
              ? templateData.navbar.companyName
              : templateData.projectTitle
          }/${templateId}`,
          "_blank"
        );
        win.focus();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="button-template-section">
      <button
        onClick={() => history.push("/dashboard")}
        className="btn btn-home"
      >
        Back To Home
      </button>
      <button onClick={handleDeploy} className="btn btn-deploy">
        Deploy
      </button>
    </div>
  );
}
