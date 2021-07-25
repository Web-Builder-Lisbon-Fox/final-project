import { getTemplateId } from "../store/actions/template";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarTemplate from "../components/NavbarTemplate";
import MainTemplate from "../components/MainTemplate";
import AboutTemplate from "../components/AboutTemplate";
import ServiceTemplate from "../components/ServiceTemplate";
import ContactTemplate from "../components/ContactTemplate";
import FooterTemplate from "../components/FooterTemplate";
import ButtonTemplate from "../components/ButtonTemplate";
import { useLocation } from "react-router";

export default function RenderFinish() {
  const state = useSelector((state) => state.forms);
  const location = useLocation();
  console.log(state);
  const id = location.state.templateId ? location.state.templateId : 4;
  console.log(location.state.templateId);
  // const id = 1;
  const dispatch = useDispatch();
  const templateData = useSelector((state) => state.template.data);
  const templateIsLoading = useSelector((state) => state.template.isLoading);
  const templateIsError = useSelector((state) => state.template.isError);
  // const isDeploy = useSelector((state) => state.template.isDeploy);
  const isDeploy = templateData.isDeploy;

  console.log(templateData, "<<<,");

  useEffect(() => {
    dispatch(getTemplateId(id));
  }, [dispatch]);

  if (templateIsLoading) {
    return (
      <div className="loading-render">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (templateIsError) {
    return (
      <div className="error-render">
        <h1>Error Has Occured</h1>
      </div>
    );
  }

  return (
    <div className="render-template">
      {templateData.navbar && (
        <NavbarTemplate
          navbarData={templateData.navbar}
          isDeploy={isDeploy}
          templateData={templateData}
        ></NavbarTemplate>
      )}
      {templateData.main && (
        <MainTemplate
          mainData={templateData.main}
          isDeploy={isDeploy}
          templateData={templateData}
        ></MainTemplate>
      )}
      {templateData.about && (
        <AboutTemplate
          aboutData={templateData.about}
          isDeploy={isDeploy}
          templateData={templateData}
        ></AboutTemplate>
      )}
      {templateData.service && (
        <ServiceTemplate
          serviceData={templateData.service}
          isDeploy={isDeploy}
          templateData={templateData}
        ></ServiceTemplate>
      )}
      {templateData.contact && (
        <ContactTemplate
          contactData={templateData.contact}
          isDeploy={isDeploy}
          templateData={templateData}
        ></ContactTemplate>
      )}
      {templateData.footer && (
        <FooterTemplate
          footerData={templateData.footer}
          navbarData={templateData.navbar}
          isDeploy={isDeploy}
          templateData={templateData}
        ></FooterTemplate>
      )}
      {!isDeploy && <ButtonTemplate></ButtonTemplate>}
    </div>
  );
}
