export const getPageMetadata = (page: string) => {
  const metadataMap: { [key: string]: { title: string; description: string } } =
    {
      grabbit_ride: {
        title: "Grabbit | BusUM",
        description: "Explore Grabbit Ride services.",
      },
      busum: {
        title: "Grabbit | BusUM",
        description: "Explore UM bus services and routes.",
      },
      rapidbus: {
        title: "Grabbit | RapidBus",
        description: "Details about Rapid kl bus.",
      },
      drt: {
        title: "Grabbit | DRT",
        description: "Details about drt.",
      },
      register: {
        title: "Grabbit | Register",
        description: "Register to Grabbit.",
      },
      login: {
        title: "Grabbit | Login",
        description: "Login to Grabbit.",
      },
      acknowledgement: {
        title: "Grabbit | Acknowledgement",
        description: "Acknowledgement page.",
      },
    };

  return (
    metadataMap[page] || {
      title: "Grabbit | Page Not Found",
      description: "This page does not exist.",
    }
  );
};
