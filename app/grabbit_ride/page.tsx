import { getPageMetadata } from "@/components/seo/metadataHelper";
import { GrabbitRidePage } from "@/components/grabbit_ride/GrabbitRidePage";
export async function generateMetadata() {
  return getPageMetadata("grabbit_ride");
}
const Page = () => {
  return (
    <div>
      <GrabbitRidePage />
    </div>
  );
};

export default Page;
