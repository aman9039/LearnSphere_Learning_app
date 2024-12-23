import { checkAuthService, loginService, registerService } from "@/services";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { createContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);

  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading , setLoading] = useState(true);

  async function handleRegisterUser(event) {
    event.preventDefault();

    const data = await registerService(signUpFormData);
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data,"dadaaaaaa");

    if(data.success){
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      )
      
      setAuth({
        authenticate : true,
        user : data.data.user,
      });
    }else {
      setAuth({
        authenticate : false,
        user : null,
      });
    }
    
  }

  // check auth user

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
    console.log(data);
    
    if (data.success) {
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
      setLoading(false);
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
    }
    } catch (error) {
      console.log(error);
      if(!error?.response?.data?.success){
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false)
      }
      
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
      }}
    >
      {
        loading ? <Skeleton/> : children
      }
    </AuthContext.Provider>
  );
}
