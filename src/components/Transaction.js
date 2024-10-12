import OneRecord from "./OneRecord";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQueryState } from "nuqs";
import { UpdateRecord } from "./UpdateRecord";

export const Transaction = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const { records, setRecords, categories } = props;
  // console.log(categories);

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
  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="flex flex-col gap-3">
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <UpdateRecord onCloseModal={handleAdd} />
        </div>
      )}
      {filteredRecord?.map((record) => (
        <div onclick={handleAdd} className="flex g-3" key={record.recordid}>
          <OneRecord
            text={record.category_name}
            time={record.createdat}
            money={record.amount}
            transactionType={record.transaction_type}
            onclick={() => deleteRecord(record.recordid)}
          />
          {/* <p onclick={}>x</p> */}
        </div>
      ))}
    </div>
  );
};
