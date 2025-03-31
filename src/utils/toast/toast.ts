import { toast } from "react-toastify";
import { getErrorDataByCode } from "../error/error";

export const toastSuc = () => {
    toast.success("성공!!");
  }

export const toastFail = (error:any) => {
    toast.error(getErrorDataByCode(error).content);
}
  