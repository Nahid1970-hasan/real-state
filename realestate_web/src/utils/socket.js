import axios from "axios";
import { config } from "../config/config";
import getIp from 'react-native-public-ip';

export const socket = {
  post: async (body) => {
    const { URL, path } = config;
    console.log(body);
    body.data.public_ip = await getIp() || "";
    body.data.login_id = localStorage.getItem("login_id") || "";
    body.data.login_type = localStorage.getItem("login_type") || "";
    body.data.session_key = localStorage.getItem("session_key") || "";
    //"session_key": "{{session_key}}"
    return axios
      .post(URL + path, body, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((d) => d.data)
      .then((d) => {
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
  upload: async (data) => {  
    const { URL, path } = config;  
    data.append('public_ip', await getIp() || "");
    data.append('login_id', localStorage.getItem("login_id") || "");
    data.append('login_type', localStorage.getItem("login_type") || "");
    data.append('session_key', localStorage.getItem("session_key") || ""); 
    let configs = {
      method: 'post',
      maxBodyLength: Infinity,
      url: URL + path+'/upload',
      headers: { 
        "Content-Type": "multipart/form-data",
      },
      data : data
    };
    return axios.request(configs)
      .then((d) => d.data)
      .then((d) => {
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
  get: (getPath) => {
    const { URL, path } = config;
    return axios
      .get(URL + path + getPath)
      .then((d) => JSON.parse(d.data.replaceAll("@#", ":")));
  },
};
