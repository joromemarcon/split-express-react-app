import { ChangeEvent, useState } from "react";

interface test {
  itemCount: number;
  testArray: React.Dispatch<React.SetStateAction<number[]>>;
}

function ChildTest(counter: test) {
  let tempArr: number[] = [];
  for (let i = 1; i <= counter.itemCount; i++) {
    tempArr.push(i);
  }

  const [arr, addArr] = useState<Array<number>>([]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const selected = Number(e.target.value);
    addArr([...arr, selected]);
    counter.testArray(arr);
  }
  return (
    <>
      <div>
        <select defaultValue={0} onChange={handleChange}>
          <option value="">Amount</option>
          {}
          {tempArr.map((obj) => (
            <option key={obj} value={obj}>
              {obj}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ChildTest;
