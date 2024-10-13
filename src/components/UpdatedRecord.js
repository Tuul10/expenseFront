import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { UpdateRecord } from "./UpdateRecord";

export const UpdatedRecord = (props) => {
  const { onCloseModal } = props;

  const getRecords = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/records/${id}`);
      setRecords(response.data.records);
      setFilteredRecords(response.data.records);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredCategories = filteredRecords.filter((record) => {
    if (!search) return true;
    return record.category_name.toLowerCase().includes(search?.toLowerCase());
  });

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      {records.map((record) => {
        <UpdateRecord
          Income={record.transaction_type === "Income"}
          Expense={record.transaction_type === "Expense"}
          Description={record.description}
          onCloseModal={onCloseModal}
        />;
      })}
    </div>
  );
};
