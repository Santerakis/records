export function createOptions(
  array1: Array<{ value: string; title: string }>,
  array2: string[],
) {
  const optionsFromArray1 = array1.map((item) => (
    <option key={item.value} value={item.value}>
      {item.title}
    </option>
  ));

  const optionsFromArray2 = array2.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  return [...optionsFromArray1, ...optionsFromArray2];
}
