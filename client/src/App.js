import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RenderFinish from "./pages/RenderFinish";
import Dashboard from "./pages/Dashboard";
import NavbarSection from "./pages/NavbarSection";
import IntroSection from "./pages/IntroSection";
import MainSection from "./pages/MainSection";
import AboutSection from "./pages/AboutSection";
import ServiceSection from "./pages/ServiceSection";
import ContactSection from "./pages/ContactSection";
import FooterSection from "./pages/FooterSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";
import UpdateSection from "./pages/UpdateSection";
import Deploy from "./pages/Deploy";
// import { useParams } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";

function App() {
  const location = useLocation();
  // const { templateId } = useParams();
  // const [showBar, setShowBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toNavbar = useSelector((state) => state.navigation.toNavbar);
  const toMainSection = useSelector((state) => state.navigation.toMainSection);
  const toAboutSection = useSelector(
    (state) => state.navigation.toAboutSection
  );
  const toServiceSection = useSelector(
    (state) => state.navigation.toServiceSection
  );
  const toContactSection = useSelector(
    (state) => state.navigation.toContactSection
  );
  const toFooterSection = useSelector(
    (state) => state.navigation.toFooterSection
  );

  // useEffect(() => {
  //   const showMenu = (toggleId, navbarId, bodyId) => {
  //     const toggle = document.getElementById(toggleId),
  //       navbar = document.getElementById(navbarId),
  //       bodypadding = document.getElementById(bodyId);

  //     if (toggle && navbar) {
  //       toggle.addEventListener("click", () => {
  //         console.log(" ke click!");
  //         navbar.classList.toggle("expander");
  //         bodypadding.classList.toggle("body-pd");
  //       });
  //     }
  //     showMenu("nav-toggle", "navbar", "body-pd");
  //   };
  // }, []);

  return (
    <section id="body-pd" className={isOpen ? "body-pd" : ""}>
      {location.pathname !== "/register" &&
      location.pathname !== "/login" &&
      location.pathname !== "/" &&
      location.pathname.substring(0, 7) !== "/finish" &&
      location.pathname.substring(0, 7) !== "/deploy" ? (
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
      ) : null}
      <Switch>
        <Route exact path="/">
          {!localStorage.access_token ? (
            <Homepage setIsOpen={setIsOpen} />
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Route>
        <Route path="/login">
          {!localStorage.access_token ? (
            <Login />
          ) : (
            localStorage.colorArray && <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/register">
          {!localStorage.access_token ? (
            <Register />
          ) : (
            localStorage.colorArray && <Redirect to="/dashboard" />
          )}
        </Route>
        <Route exact path="/dashboard">
          {localStorage.access_token ? (
            <Dashboard setIsOpen={setIsOpen}></Dashboard>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/intro-section">
          {localStorage.access_token ? (
            <IntroSection setIsOpen={setIsOpen}></IntroSection>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/navbar-section">
          {localStorage.access_token ? (
            toNavbar ? (
              <NavbarSection setIsOpen={setIsOpen}></NavbarSection>
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/main-section">
          {localStorage.access_token ? (
            toMainSection ? (
              <MainSection setIsOpen={setIsOpen}></MainSection>
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/about-section">
          {localStorage.access_token ? (
            toAboutSection ? (
              <AboutSection setIsOpen={setIsOpen}></AboutSection>
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/service-section">
          {localStorage.access_token ? (
            toServiceSection ? (
              <ServiceSection setIsOpen={setIsOpen}></ServiceSection>
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/contact-section">
          {localStorage.access_token ? (
            toContactSection ? (
              <ContactSection setIsOpen={setIsOpen}></ContactSection>
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/footer-section">
          {localStorage.access_token ? (
            toFooterSection ? (
              <FooterSection setIsOpen={setIsOpen}></FooterSection>
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/deploy/:companyName/:templateId">
          <Deploy setIsOpen={setIsOpen}></Deploy>
        </Route>
        <Route exact path="/finish/:templateId">
          {localStorage.access_token ? (
            <RenderFinish setIsOpen={setIsOpen}></RenderFinish>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/update-template">
          <UpdateSection setIsOpen={setIsOpen}></UpdateSection>
        </Route>
      </Switch>
    </section>
  );
}

export default App;
