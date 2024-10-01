import useSWR from "swr";
import OneRecord from "./OneRecord";
import FoodExpense from "../../public/icons/FoodExpenseIcon";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Transaction = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/records",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {data?.records.map((record) => {
        return (
          <div key={record.reordid}>
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
