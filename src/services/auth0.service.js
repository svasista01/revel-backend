import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

const getManagementToken = async () => {
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_AUDIENCE,
    grant_type: "client_credentials",
  });
  return response.data.access_token;
};

export const createUserInAuth0 = async ({ firstName, lastName, contact, dob, city, time }) => {
  const token = await getManagementToken();

  const payload = {
    connection: "Username-Password-Authentication",
    password: `RevelTemp#${Date.now()}`,
    given_name: firstName,
    family_name: lastName,
    user_metadata: {
      dob,
      birth_time: time,
      birth_city: city,
    },
  };

  if (contact.includes("@")) {
    payload.email = contact;
  } else {
    payload.phone_number = `+${contact}`;
  }

  try {
    const response = await axios.post(
      `https://${AUTH0_DOMAIN}/api/v2/users`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ User created in Auth0:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Auth0 create user error:", error.response?.data || error.message);
    throw error;
  }
};