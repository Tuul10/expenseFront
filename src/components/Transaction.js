import OneRecord from "./OneRecord";
import axios from "axios";
import { UpdateRecord } from "./UpdateRecord";
import { useState } from "react";

export const Transaction = (props) => {
  const { records, setRecords, categories } = props;
  const [showhandleupdate, setShowHandleUpdate] = useState(false);

  const filteredRecord = records?.filter((record) => {
    const category = categories.find(
      (category) => category.categoryid === record.categoryid
    );

    return category?.selected;
  });

  const x = "x";

  const deleteRecord = async (recordid) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/records/${recordid}`
      );
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.recordid !== recordid)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRecord = () => {
    setShowHandleUpdate(!showhandleupdate);
  };

  return (
    <div className="flex flex-col gap-3">
      {showhandleupdate && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <UpdateRecord
            categories={categories}
            onCloseModal={handleUpdateRecord}
          />
        </div>
      )}
      {filteredRecord?.map((record) => (
        <div key={record.recordid}>
          <OneRecord
            text={record.category_name}
            time={record.transferat}
            money={record.amount}
            transactionType={record.transaction_type}
            deleteRecord={() => deleteRecord(record.recordid)}
            x={x}
            // getRecords={() => getRecords(record.recordid)}
          />
        </div>
      ))}
    </div>
  );
};
