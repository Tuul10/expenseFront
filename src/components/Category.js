import ClosedEyeIcon from "../../public/icons/ClosedEyeIcon";
import { FaEye } from "react-icons/fa";

const Category = (props) => {
  const { categoryName, selected, onSelect } = props;

  const icon = selected ? <FaEye /> : <ClosedEyeIcon />;

  return (
    <div
      onClick={onSelect}
      className="w-full pl-3 py-1.5 flex gap-2 items-center"
    >
      {icon}
      <p className="font-normal text-base text-[#1F2937]">{categoryName}</p>
    </div>
  );
};

export default Category;
