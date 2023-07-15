import { toast } from "react-toastify";

const ToastShow = (type: any, message: any) => {
  return toast[type](message, {
    position: "bottom-right",
    hideProgressBar: false,
    autoClose: 2000,
    newestOnTop: true,
    closeOnClick: false,
    draggable: false,
    rtl: false,
  });
};

export default ToastShow;
