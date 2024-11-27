import Link from "next/link";

interface DropDownMenuProps {
  dropdownItems: { name: string; link: string }[];
  isOpen: boolean;
  onItemClick: () => void;
}

const DropDownMenu = ({
  dropdownItems,
  isOpen,
  onItemClick,
}: DropDownMenuProps) => {
  return isOpen ? (
    <div className="mt-5">
      <ul className="min-w-max overflow-hidden rounded-lg shadow-lg list-none">
        {dropdownItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="flex items-center regular-16 text-[#999999] w-full bg-white px-4 py-2 transition duration-200 hover:bg-zinc-100/60 focus:bg-zinc-100/60 active:bg-zinc-300/60 active:text-black hover:text-black"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default DropDownMenu;
