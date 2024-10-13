import OneRecord from "./OneRecord";
import axios from "axios";

export const Transaction = (props) => {
  const { records, setRecords, categories, handleAdd } = props;

  const filteredRecord = records?.filter((record) => {
    const category = categories.find(
      (category) => category.categoryid === record.categoryid
    );

    return category.selected;
  });

  const deleteRecord = async (recordid) => {
    try {
      await axios.delete(`http://localhost:8000/records/${recordid}`);
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.recordid !== recordid)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {filteredRecord?.map((record) => (
        <div key={record.recordid}>
          <OneRecord
            text={record.category_name}
            time={record.createdat}
            money={record.amount}
            transactionType={record.transaction_type}
            deleteRecord={() => deleteRecord(record.recordid)}
            handleAdd={() => handleAdd(record.recordid)}
          />
          {/* <p onclick={deleteRecord}>x</p> */}
        </div>
      ))}
    </div>
  );
};
