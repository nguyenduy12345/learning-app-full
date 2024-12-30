import FacebookLogin from '@greatsumini/react-facebook-login';

const LoginFacebook = ({handleLoginWithFacebook}) => {
  const responseFacebook = (response) => {
    handleLoginWithFacebook(response)
  };
  const APP_ID = import.meta.env.VITE_APP_APP_ID_FB;
  return (
    <FacebookLogin
    appId={APP_ID}
    autoLoad
    onSuccess={(response) => {
      responseFacebook(response);
    }}
    fields="name,email,picture"
    scope="public_profile, email"
    render={renderProps => (
       <div onClick={renderProps.onClick} className="mt-1 flex cursor-pointer bg-[#8b8fde] p-3 font-medium text-white hover:text-black">
        <img
          src="images/logo/facebook.webp"
          className="mr-2 h-6 w-6 font-noto"
        />
        <p className="text-center w-full">Đăng nhập bằng Facebook</p>
      </div>
    )}
  />
  );
};

export default LoginFacebook;
