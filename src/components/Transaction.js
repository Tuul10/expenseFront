import OneRecord from "./OneRecord";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQueryState } from "nuqs";

export const Transaction = (props) => {
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

  return (
    <div className="flex flex-col gap-3">
      {filteredRecord?.map((record) => (
        <div className="flex g-3" key={record.recordid}>
          <OneRecord
            text={record.category_name}
            time={record.createdat}
            money={record.amount}
            transactionType={record.transaction_type}
            onClick={() => deleteRecord(record.recordid)}
          />
          <div></div>
        </div>
      ))}
    </div>
  );
};
