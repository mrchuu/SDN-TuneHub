import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentResult() {
  const { status, message } = useParams();
  const navigate = useNavigate();
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      if (status === "ok") {
        toast.success(message, { duration: 6000 });
      } else {
        toast.error(message, { duration: 6000 });
      }
      navigate("/");
    } else {
      hasMounted.current = true;
    }
  }, [hasMounted]);
  return <div classsName="min-h-screen bg-light60 w-full"></div>;
}
