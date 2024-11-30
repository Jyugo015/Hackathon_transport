import { getPageMetadata } from "@/components/seo/metadataHelper";
import DRTPage from "@/components/drt/DRTPage";
export async function generateMetadata() {
  return getPageMetadata("drt");
}
const Page = () => {
  return (
    <div>
      <DRTPage />
    </div>
  );
};

export default Page;
