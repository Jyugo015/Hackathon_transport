const Page = () => {
  return (
    <div className="h-screen p-6">
      <h1>Bus UM Page</h1>
      <p>This is the content for Bus UM Page.</p>
      <ul className="list-disc">
        Bus does not operate on the following days and times:
        <li>Weekend (Saturday & Sunday)</li>
        <li>Public holiday</li>
        <li>Mid sem, semester break & study week</li>
        <li>Friday Prayer (12:30 pm - 2:30 pm)</li>
      </ul>
    </div>
  );
};

export default Page;
