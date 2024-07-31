import axios from "axios";

// Defining the function interface for the data you want to send
interface SiteData {
  domain: string;
  proxy?: string;
  redirect?: string;
  template_id?: string;
  title?: string;
  description?: string;
  contacts?: Record<string, string>;
}

export async function setSiteData(data: SiteData): Promise<void> {
  try {
    // Constructing the full URL
    const backendUrl = `${import.meta.env.VITE_BACKEND}/server/set-site-data`;

    const response = await axios.post(backendUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("agora-auth-token")}`,
      },
    });
    console.log(data);
    console.log("Data set successfully", response.data);
  } catch (error) {
    console.error("Error setting the site data", error);
  }
}

export async function getSiteData(domain: string): Promise<SiteData> {
  try {
    // Constructing the full URL
    const backendUrl = `${
      import.meta.env.VITE_BACKEND
    }/server/get-site-data/${domain}`;

    // Making the POST request
    const response = await axios.get(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("agora-auth-token")}`,
      },
    });
    console.log("Data fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching the site data", error);
    throw error;
  }
}
