import { BUS_ROUTES } from "@/constant";
import RoutePage from "@/components/busum/RoutePage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const title = BUS_ROUTES[params.slug]?.name || "Route Not Found";
  return {
    title: `BusUM | ${title}`,
  };
}

const RoutePageWrapper = async ({ params }: { params: { slug: string } }) => {
  const route = BUS_ROUTES[params.slug];

  if (!route) {
    return {
      title: "Route Not Found",
      description: "The requested bus route could not be found.",
    };
  }

  return <RoutePage slug={params.slug} />;
};

export default RoutePageWrapper;
