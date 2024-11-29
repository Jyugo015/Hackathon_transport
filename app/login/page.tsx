import LoginForm from "@/components/LoginForm";
import { getPageMetadata } from "@/components/seo/metadataHelper";

export async function generateMetadata() {
  return getPageMetadata("login");
}
const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
