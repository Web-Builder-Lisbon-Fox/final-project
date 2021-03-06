import { useSelector } from "react-redux";
// import { generateColorArray } from "../store/actions/template";
// import { useEffect } from "react";

export default function Color() {
  let colorArray = useSelector((state) => state.template.colorArray);
  // const dispatch = useDispatch();
  if (colorArray.length <= 0) {
    colorArray = JSON.parse(localStorage.colorArray);
  }

  if (colorArray) {
    return (
      <div className="color-component" style={{ display: "flex" }}>
        {colorArray.map((color, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  backgroundColor: `${color}`,
                  width: "4rem",
                  height: "8rem",
                }}
              >
                {/* <h1 style={{color:`${color}`}}>Test</h1> */}
              </div>
              <p style={{ textAlign: "center", fontSize: "0.8rem" }}>{color}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h4>Generating Color...</h4>;
  }
}
