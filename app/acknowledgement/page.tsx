import BioAutography from "@/components/acknowledgement/BioAutography";
import { getPageMetadata } from "@/components/seo/metadataHelper";

export async function generateMetadata() {
  return getPageMetadata("acknowledgement");
}
const Page = () => {
  return (
    <div className="p-6">
      {/* <iframe
        src="https://img.mp.itc.cn/q_70,c_zoom,w_640/upload/20170614/13a48b6c49d74d7481c241f6f788c27d.jpg"
        width="400"
        height="400"
        style={{ borderRadius: "50%", border: "none" }} // Corrected style object
      ></iframe> */}
      <h1 className="text-3xl text-center p-4 font-bold mb-4">
        Acknowledgement
      </h1>
      <div>
        <BioAutography />
      </div>
    </div>
  );
};

export default Page;
