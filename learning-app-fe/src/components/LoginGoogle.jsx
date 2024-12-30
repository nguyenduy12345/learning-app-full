import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import instance from "../utils/axiosRequest.js";
const LoginGoogle = ({ handleLoginWithGoogle }) => {
  const handleLoginSuccess = (response) => {
    handleLoginWithGoogle(response);
  };
  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          className="flex cursor-pointer justify-center bg-[#dfe8e7] p-3 font-noto font-medium hover:text-white md:mr-1 md:w-1/2"
        >
          <img
            src="images/logo/googlelogo.png"
            className="lazyload mr-2 h-6 w-6"
          />
          Đăng nhập bằng Google
        </div>
      )}
    />
  );
};

export default LoginGoogle;
