import Buses from "@/components/rapidbus/Buses";
import ButtonList from "@/components/ButtonList";
import { RAPID_KL_BUSES } from "@/constant";
import { getPageMetadata } from "@/components/seo/metadataHelper";

export async function generateMetadata() {
  return getPageMetadata("rapidbus");
}
const PageOne = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Buses Component */}
      <div>
        <Buses />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Rapid KL Bus Services in UM</h1>
        <ButtonList buttonItems={RAPID_KL_BUSES} />
      </div>
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Rapid Bus Information</h1>
        <p className="text-lg text-gray-700">
          Learn about the Rapid KL bus service, including operational details,
          contact information, and service limitations.
        </p>
      </div>
    </div>
  );
};

export default PageOne;
