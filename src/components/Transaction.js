import OneRecord from "./OneRecord";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { useEffect, useState } from "react";
import axios from "axios";

export const Transaction = (props) => {
  const { records, setRecords } = props;

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
    <div>
      {records?.map((record) => (
        <div className="flex" key={record.recordid}>
          <OneRecord
            text={record.category_name}
            time={record.createdat}
            money={record.amount}
            transactionType={record.transaction_type}
          />
          <div>
            <button type="button" onClick={() => deleteRecord(record.recordid)}>
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
