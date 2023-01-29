import { IRocket } from "../interfaces/IRocket";
import { handleAPIError } from "utils/handleAPIError";
import Axios from "axios";

export const getRockets = async () => {
  try {
    const response = await Axios.get<IRocket[]>("/api/v1/rockets");

    return response;
  } catch (error) {
    throw new Error(handleAPIError(error).message);
  }
};

export const postRocket = async (data: IRocket) => {
  try {
    const formData = new FormData();

    if (data.photo) formData.append("photo", data.photo as File);

    formData.append("id", data.id?.toString()!);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("height", data.height.toString());
    formData.append("diameter", data.diameter.toString());
    formData.append("mass", data.mass.toString());

    let response;
    if (data.id) {
      response = await Axios.patch(`/api/v1/rockets/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      response = await Axios.post("/api/v1/rockets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return response;
  } catch (error) {
    throw new Error(handleAPIError(error).message);
  }
};

export const deleteRocket = async (id: number) => {
  try {
    const response = await Axios.delete(`/api/v1/rockets/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(handleAPIError(error).message);
  }
};
