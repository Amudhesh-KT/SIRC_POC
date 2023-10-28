import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// loginImg.png
function LoginLayout({ children }) {
  let router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("sirc")) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}

export default LoginLayout;
