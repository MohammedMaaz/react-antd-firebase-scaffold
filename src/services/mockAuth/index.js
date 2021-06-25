import { delay, randHashString } from "../utils";

const auth_event = new CustomEvent("auth_event");
const CURR_USER = "__curr_user_mock__";

const login_with_email = async (email, password) => {
  await delay(1000);
  localStorage.setItem(
    CURR_USER,
    JSON.stringify({
      email,
      uid: randHashString(12),
      expires_at: Date.now() + 7 * 86400000, //7 days expiry
    })
  );
  window.dispatchEvent(auth_event);
};

const logout = async () => {
  await delay(500);
  localStorage.removeItem(CURR_USER);
  window.dispatchEvent(auth_event);
};

const subscribe = (handler) => {
  //triggers each time auth state has changed from current tab
  window.addEventListener("auth_event", (e) => {
    const user = localStorage[CURR_USER];
    //if user has been logged out
    if (!user) {
      handler(null);
      return;
    }

    const userData = JSON.parse(user);
    //if token has been expired then try to get a new one (if this fails then logout)
    if (
      typeof userData.expires_at !== "number" ||
      userData.expires_at <= Date.now()
    )
      login_with_email(userData.email, userData.password).catch(logout);
    else handler(userData);
  });
  //trigger auth_event for the first time manually
  window.dispatchEvent(auth_event);

  //triggers each time auth state has changed from different tab
  window.addEventListener("storage", (e) => {
    if (e.key === CURR_USER) {
      //user has been signed in
      if (!e.oldValue && e.newValue) handler(JSON.parse(e.newValue));
      //user has been signed out
      else if (!e.newValue) handler(null);
    }
    //to handle reset case
    else if (!e.key) {
      //to signout from other tabs
      localStorage.removeItem(CURR_USER);
      //to signout from current tab
      handler(null);
    }
  });

  return () => {
    //cleanup listeners
  };
};

const MockAuth = {
  login_with_email,
  logout,
  subscribe,
};

export default MockAuth;
