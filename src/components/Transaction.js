import useSWR from "swr";
import OneRecord from "./OneRecord";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Transaction = () => {
  const [value, setValue] = useState(0);
  console.log(value);
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/records",
    fetcher
  );

  const deleteRecord = () => {
    axios
      .post("http://localhost:8000/records/delete", {
        params: {
          ID: value,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const recordId = (e) => {
    setValue(e.target.value);
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {data.records.map((record) => {
        return (
          <div onClick={recordId} value={record.recordid} key={record.reordid}>
            <OneRecord
              text={record.record_name}
              time={record.createdat}
              image={<FoodExpense />}
              money={record.amount}
            />
          </div>
        );
      })}
    </div>
  );
};
