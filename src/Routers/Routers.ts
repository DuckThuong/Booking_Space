const CUSTOMER = "";
export const ACTION = {
  CREATE: "create",

  DETAIL: "detail",
};
export const CUSTOMER_ROUTE_NAME = {
  //Log_In
  LOG_IN: "",
  //Register
  REGISTER: "register",
  //Forgot_password
  FORGOT_EMAIL_INPUT: "forgot-email-input",
  FORGOT_CODE_INPUT: "forgot-code-input",
  FORGOT_EDIT_PASSWORD: "forgot-edit-password",
  FORGOT_SUCCESS: "forgot-success",
  //Home
  HOME: "home",
  HOME_CONTAINER: "home-container",
  //Host
  HOST: "host",
  //Catergories
  CATERGORIES: "catergories",
  //Default_user
  DEFAULT_USER: "default-user",
  //Venue
  VENUE: "venue",
};
export const CUSTOMER_ROUTER_PATH = {
  //Log_In
  LOG_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LOG_IN}`,
  //Register
  REGISTER: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.REGISTER}`,
  //Forgot_password
  FORGOT_EMAIL_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EMAIL_INPUT}`,
  FORGOT_CODE_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_CODE_INPUT}`,
  FORGOT_EDIT_PASSWORD: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EDIT_PASSWORD}`,
  FORGOT_SUCCESS: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_SUCCESS}`,
  //Home
  HOME: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.HOME}`,
  HOME_CONTAINER: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.HOME_CONTAINER}`,
  //Host
  HOST: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.HOST}`,
  //Default_user
  DEFAULT_USER: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.DEFAULT_USER}`,
  //Venue
  VENUE: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.VENUE}`,
};
