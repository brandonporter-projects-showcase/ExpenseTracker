import ProfileHeading from "../components/ProfileHeading";
import ProfileMenu from "../components/ProfileMenu";
import AppLayout from "../../../components/layout/AppLayout";

export default function Profile() {
  return (
    <AppLayout.Main>
      <ProfileHeading />
      <ProfileMenu />
    </AppLayout.Main>
  );
}
