import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";




function StudentHomePage() {

const { resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return <div>HomePage
    <Button onClick={handleLogout}>LogOut</Button>
  </div>;
}

export default StudentHomePage;
