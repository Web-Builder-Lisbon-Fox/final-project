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

export default function RenderFinish() {
  const id = 1;
  const dispatch = useDispatch();
  const templateData = useSelector((state) => state.template.data);

  useEffect(() => {
    dispatch(getTemplateId(id));
  }, [dispatch]);

  return (
    <div className="render-template">
      {/* <p>{JSON.stringify(templateData.navbar)}</p> */}
      {templateData.navbar && (
        <NavbarTemplate navbarData={templateData.navbar}></NavbarTemplate>
      )}
      {templateData.main && (
        <MainTemplate mainData={templateData.main}></MainTemplate>
      )}
      {templateData.about && (
        <AboutTemplate aboutData={templateData.about}></AboutTemplate>
      )}
      {templateData.service && (
        <ServiceTemplate serviceData={templateData.service}></ServiceTemplate>
      )}
      {templateData.contact && (
        <ContactTemplate contactData={templateData.contact}></ContactTemplate>
      )}
      {templateData.footer && (
        <FooterTemplate
          footerData={templateData.footer}
          navbarData={templateData.navbar}
        ></FooterTemplate>
      )}
      <ButtonTemplate></ButtonTemplate>
    </div>
  );
}
