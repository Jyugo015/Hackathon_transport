import Link from "next/link";

interface ButtonItem {
  name: string;
  link: string;
}

interface ButtonListProps {
  buttonItems: ButtonItem[];
}

const ButtonList = ({ buttonItems }: ButtonListProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-8 py-5">
      {buttonItems.map((bus, index) => (
        <Link key={index} href={bus.link}>
          <button className="text-xl px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
            {bus.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ButtonList;
