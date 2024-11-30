import { RAPID_BUSES } from "@/constant";
import BusPage from "@/components/rapidbus/RapidBusPage";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const route = RAPID_BUSES[params.slug];

  if (!route) {
    return {
      title: "Route Not Found",
      description: "The requested bus route could not be found.",
    };
  }

  return {
    title: `Rapid Bus | ${route.name}`,
    description: `Track the ${route.name} route and view the timetable for Rapid Bus services.`,
  };
}

const Page = ({ params }: Props) => {
  return <BusPage slug={params.slug} />;
};

export default Page;
