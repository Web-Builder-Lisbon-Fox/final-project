import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMainSection, updateTemplate } from "../store/actions/forms";
import "../styles/mainSection.css";
import Color from "../components/Color";
import { generateColorArray } from "../store/actions/template";
import { getImageUrl, setMainImageUrl } from "../store/actions/uploadImage";
import { useLocation } from "react-router";
import main1 from "../assets/main1.png";
import main2 from "../assets/main2.png";
import main3 from "../assets/main3.png";
import ModalImage from "../components/ModalImage";

function MainSection() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [headline, setHeadline] = useState("");
  const [headlineColor, setHeadlineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [subHeadline, setSubHeadline] = useState("");
  const [subHeadlineColor, setsubHeadlineColor] = useState("#000000");
  const [type, setType] = useState(null);
  const mainImageUrl = useSelector((state) => state.uploadImage.mainImageUrl);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalHeight, setModalHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");

  function viewImage(image, height, width) {
    setShowModal(true);
    setModalImage(image);
    setModalHeight(height);
    setModalWidth(width);
  }

  const stateNavbar = location.state;
  const templateId = useSelector((state) => state.forms.templateId);

  function addMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: +type,
      image: mainImageUrl,
      headline,
      headlineColor,
      subHeadline,
      subHeadlineColor,
      backgroundColor,
    };

    if (!dataMainSection.headline) {
      swal("Please fill your headline");
    } else if (!dataMainSection.image) {
      swal("Please fill your image");
    } else if (!dataMainSection.type) {
      swal("Please choose your require template");
    } else {
      dispatch(setMainSection(dataMainSection));
      const newestTemplate = {
        ...stateNavbar,
        main: dataMainSection,
        about: {},
        service: {},
        contact: {},
        footer: {},
      };
      dispatch(updateTemplate(templateId, { main: dataMainSection }));
      history.push({
        pathname: "/about-section",
      });
    }
  }

  function skipMainSection(event) {
    event.preventDefault();
    const dataMainSection = {
      type: null,
      image: null,
      headline: null,
      headlineColor: null,
      subHeadline: null,
      subHeadlineColor: null,
      backgroundColor: null,
    };

    dispatch(setMainSection(dataMainSection));
    // history.push("/about-section");
    history.push({
      pathname: "/about-section",
      state: {
        ...stateNavbar,
        main: dataMainSection,
      },
    });
  }

  function uploadMainImage(file, code) {
    dispatch(getImageUrl(file, code));
  }

  function generateColor() {
    dispatch(generateColorArray());
  }

  useEffect(() => {
    dispatch(setMainImageUrl(""));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      stickyColor();
    };

    const colorPalette = document.getElementById("sticky-colormind");
    const stickyOffset = colorPalette.offsetTop;

    function stickyColor() {
      if (window.pageYOffset >= stickyOffset) {
        colorPalette.classList.add("sticky");
      } else {
        colorPalette.classList.remove("sticky");
      }
    }
  }, [window.pageYOffset]);

  return (
    <section id="main-section">
      <h1>Main Section</h1>
      <h3>2 of 6</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "3rem",
        }}
      >
        <div className="input">
          <h2 className="title-subform">Headline</h2>
          <div className="contain-input form-center">
            <div className="form-align-center">
              <label
                htmlFor="main-headline"
                className="main-headline"
                style={{ marginRight: "3rem" }}
              >
                Text
              </label>
              <input
                onChange={(event) => setHeadline(event.target.value)}
                type="text"
                name="main-headline"
                className="main-headline"
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="main-headline"
                className="main-headline"
                style={{ marginRight: "2rem" }}
              >
                Color
              </label>
              <input
                onChange={(event) => setHeadlineColor(event.target.value)}
                type="color"
                name="main-headline"
                className="main-headline"
                style={{ border: "none" }}
              />
            </div>
          </div>
          <h2 className="title-subform" style={{ marginTop: "2rem" }}>
            Subheadline
          </h2>
          <div className="contain-input form-center">
            <div className="form-align-center">
              <label
                htmlFor="main-subheadline"
                className="main-subheadline"
                style={{ marginRight: "3rem" }}
              >
                Text
              </label>
              <input
                onChange={(event) => setSubHeadline(event.target.value)}
                type="text"
                name="main-subheadline"
                className="main-subheadline"
              />
            </div>
            <div className="form-align-center">
              <label
                htmlFor="main-subheadline"
                className="main-subheadline"
                style={{ marginRight: "2rem" }}
              >
                Color
              </label>
              <input
                onChange={(event) => setsubHeadlineColor(event.target.value)}
                type="color"
                name="main-subheadline"
                className="main-subheadline"
                style={{ border: "none" }}
              />
            </div>
          </div>
          <div className="form-align-center" style={{ marginTop: "3rem" }}>
            <label
              htmlFor="company-background"
              className="company-background"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Image
            </label>
            <input
              onChange={(event) =>
                uploadMainImage(event.target.files[0], "main")
              }
              type="file"
              name="company-background"
              className="company-background"
              style={{ border: "none" }}
            />
            {mainImageUrl && (
              <img
                style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
                src={mainImageUrl}
                alt="about"
              />
            )}
            <button
              className="btn btn-remove-image"
              onClick={() => dispatch(setMainImageUrl(""))}
              style={{ margin: "0rem", marginTop: "1rem", width: "10rem" }}
            >
              Remove Image
            </button>
          </div>
          <div
            className="form-align-center"
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
          >
            <label
              htmlFor="background-color-main"
              style={{ fontSize: "2rem", marginBottom: "1rem" }}
            >
              Background Color
            </label>
            <input
              onChange={(event) => setBackgroundColor(event.target.value)}
              type="color"
              name="background-color-mainb"
              id="background-color-main"
              style={{ border: "none" }}
              value={backgroundColor}
            />
          </div>
          <label htmlFor="template-layout" style={{ fontSize: "2rem" }}>
            Template Layout
          </label>
          <div className="selection-main" style={{ marginTop: "2rem" }}>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="1"
                type="radio"
                name="opt-navbar"
                id="opt1-navbar"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(main1, "30", "80")}
              >
                <img
                  className="selection-img"
                  src={main1}
                  alt="image1"
                  onClick={() => viewImage(main1, "30", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="2"
                type="radio"
                name="opt-navbar"
                id="opt2-navbar"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(main2, "30", "80")}
              >
                <img
                  className="selection-img"
                  src={main2}
                  alt="image2"
                  onClick={() => viewImage(main2, "30", "80")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
            <div className="horizontal-center">
              <input
                onClick={(event) => setType(event.target.value)}
                defaultValue="3"
                type="radio"
                name="opt-navbar"
                id="opt3-navbar"
              />
              <div
                className="container-img-hover"
                onClick={() => viewImage(main3, "40", "70")}
              >
                <img
                  className="selection-img"
                  src={main3}
                  alt="image3"
                  onClick={() => viewImage(main3, "40", "70")}
                />
                <div className="overlay">
                  <div className="text">Click To Enlarge The Picture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {localStorage.colorArray && (
          <div className="colormind-component">
            <div id="sticky-colormind">
              <label htmlFor="generate-color" className="generate-color-label">
                Generate Color Palette
              </label>
              <Color />
              <button className="btn btn-refresh-color" onClick={generateColor}>
                Refresh
              </button>
            </div>
          </div>
        )}
        {showModal && (
          <ModalImage
            image={modalImage}
            height={modalHeight}
            width={modalWidth}
            setShowModal={setShowModal}
          ></ModalImage>
        )}
      </div>
      <div className="button-main btn-form-page">
        <button className="btn btn-skip" onClick={skipMainSection}>
          Skip
        </button>
        <button className="btn btn-next" onClick={addMainSection}>
          Next
        </button>
      </div>
    </section>
  );
}

export default MainSection;
