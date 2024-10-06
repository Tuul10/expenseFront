import OneRecord from "./OneRecord";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { useEffect, useState } from "react";
import axios from "axios";

export const Transaction = (props) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await axios.get("http://localhost:8000/records");
        setRecords(response.data.records);
      } catch (error) {
        console.error(error);
      }
    };
    getRecords();
  }, []);

  const deleteRecord = async (recordid) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/records/${recordid}`
      );
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.recordid !== recordid)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {records.map((record) => (
        <div key={record.recordid}>
          <OneRecord
            text={record.record_name}
            time={record.createdat}
            image={<FoodExpense />}
            money={record.amount}
          />
          <button type="button" onClick={() => deleteRecord(record.recordid)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
