import { useQueryState } from "nuqs";
import OneRecord from "./OneRecord";
import axios from "axios";
import { useEffect, useState } from "react";
import { UpdateRecord } from "./UpdateRecord";

export const Transaction = (props) => {
  const { records, setRecords, categories, handleAdd } = props;
  const [recordid, setRecordid] = useQueryState([]);
  const [showhandleupdate, setShowHandleUpdate] = useState(false);

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

  const getRecords = async (recordid) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/records/record/${recordid}`
      );
      setRecordid(response.data.records);
      console.log(response);
      handleUpdateRecord();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const handleUpdateRecord = () => {
    setShowHandleUpdate(!showhandleupdate);
  };

  return (
    <div className="flex flex-col gap-3">
      {showhandleupdate && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <UpdateRecord getCategory={getCategory} categories={categories} />
        </div>
      )}
      {filteredRecord?.map((record) => (
        <div key={record.recordid}>
          <OneRecord
            text={record.category_name}
            time={record.createdat}
            money={record.amount}
            transactionType={record.transaction_type}
            deleteRecord={() => deleteRecord(record.recordid)}
            getRecords={() => getRecords(record.recordid)}
          />
          {/* <p onclick={deleteRecord}>x</p> */}
        </div>
      ))}
    </div>
  );
};
