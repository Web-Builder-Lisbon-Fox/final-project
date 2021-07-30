import {
  SET_PROJECT_TITLE,
  SET_NAVBAR_SECTION,
  SET_MAIN_SECTION,
  SET_ABOUT_SECTION,
  SET_SERVICE_SECTION,
  SET_CONTACT_SECTION,
  SET_FOOTER_SECTION,
  SET_TEMPLATE_ID,
  SET_USER_ID,
  SET_IS_DEPLOY,
  SET_IS_FOOTER_FINISHED,
  SET_REPLY_CHATBOT,
} from "../actionTypes";
import { fetchDashboard } from "./dashboard";

export function setTemplateId(input) {
  return {
    type: SET_TEMPLATE_ID,
    payload: input,
  };
}

export function setUserId(input) {
  return {
    type: SET_USER_ID,
    payload: input,
  };
}

export function setIsDeploy(input) {
  return {
    type: SET_IS_DEPLOY,
    payload: input,
  };
}

export function setIsFooterFinished(input) {
  return {
    type: SET_IS_FOOTER_FINISHED,
    payload: input,
  };
}

export function setProjectTitle(input) {
  return {
    type: SET_PROJECT_TITLE,
    payload: input,
  };
}

export function setNavbarSection(input) {
  return {
    type: SET_NAVBAR_SECTION,
    payload: input,
  };
}

export function setMainSection(input) {
  return {
    type: SET_MAIN_SECTION,
    payload: input,
  };
}

export function setAboutSection(input) {
  return {
    type: SET_ABOUT_SECTION,
    payload: input,
  };
}

export function setServiceSection(input) {
  return {
    type: SET_SERVICE_SECTION,
    payload: input,
  };
}

export function setContactSection(input) {
  return {
    type: SET_CONTACT_SECTION,
    payload: input,
  };
}

export function setFooterSection(input) {
  return {
    type: SET_FOOTER_SECTION,
    payload: input,
  };
}

export function setReplyChatbot(input) {
  return {
    type: SET_REPLY_CHATBOT,
    payload: input,
  };
}

export function createTemplate(data) {
  return (dispatch) => {
    fetch("https://server-webber.herokuapp.com/template", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, `ini data`);
        dispatch(setTemplateId(data.id));
        dispatch(setUserId(data.userId));
        dispatch(setProjectTitle(data.projectTitle));
      })
      .catch((err) => {
        // console.log(err, `ini error`);
      });
  };
}

export function updateTemplate(id, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(`https://server-webber.herokuapp.com/template/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTemplateId(data.templateId));
          resolve(data);
        })

        .catch((err) => {
          // console.log(err, `ini error update`);
          reject(err);
        });
    });
  };
}

export function deleteTemplate(id) {
  return (dispatch) => {
    fetch(`https://server-webber.herokuapp.com/template/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, `ini data delete`);
        dispatch(fetchDashboard());
      })
      .catch((err) => console.log(err, `ini error update`));
  };
}

export function changeIsDeploy(id, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(`https://server-webber.herokuapp.com/template/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setIsDeploy(true));
          // console.log(data, `ini data patch`);
          resolve(data);
        })
        .catch((err) => {
          // console.log(err, `ini error patch`);
          reject(err);
        });
    });
  };
}

export function getReplyChatbot(msg) {
  return async (dispatch) => {
    // console.log(msg, "masuk action reply");
    try {
      const response = await fetch("https://server-webber.herokuapp.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: msg }),
      });
      const replyChatbot = await response.json();
      dispatch(setReplyChatbot(replyChatbot));
      // console.log(replyChatbot, "<<< chatbot reply");
    } catch (err) {
      console.log(err, "<<< error chatbot");
    }
  };
}
