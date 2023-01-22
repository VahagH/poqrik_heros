import { useContext } from "react";
import Loading from "../../../components/Loading/Loading";
import { ProfileContext } from "../../../context/ProfileProvider";

const MyProfile = () => {
  const { state: profileState } = useContext(ProfileContext);
  if (!profileState.firstName) return <Loading />;
  return <div>MyProfile</div>;
};

export default MyProfile;
