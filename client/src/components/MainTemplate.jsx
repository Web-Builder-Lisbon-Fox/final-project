import "../styles/main.css";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Main({ mainData, isDeploy, templateData }) {
  // const isDeploy = useSelector((state) => state.template.isDeploy);
  const history = useHistory();

  if (!mainData.type) {
    return null;
  }

  function toUpdatePage() {
    history.push({
      pathname: "/update-template",
      state: {
        section: "main",
        data: mainData,
        allData: templateData,
      },
    });
  }

  return (
    <div className="section-and-update">
      <main
        className={
          mainData.type === 1
            ? "type-1-main"
            : mainData.type === 2
            ? "type-2-main"
            : "type-3-main"
        }
        style={{
          backgroundColor: mainData.backgroundColor,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <img src={mainData.image} alt="main" />
        <div className="text-main-section">
          <h1 style={{ color: mainData.headlineColor }}>{mainData.headline}</h1>
          <p style={{ color: mainData.subHeadlineColor }}>
            {mainData.subHeadline}
          </p>
        </div>
      </main>
      {!isDeploy && (
        <div className="update-main-section">
          <button onClick={toUpdatePage} className="btn btn-update-section">
            Update Main
          </button>
        </div>
      )}
    </div>
  );
}
