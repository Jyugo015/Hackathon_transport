import RegisterForm from "@/components/RegisterForm";
import { getPageMetadata } from "@/components/seo/metadataHelper";

export async function generateMetadata() {
  return getPageMetadata("register");
}
const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
