import { ChangeEvent, useCallback, useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setSearch(value);
    },
    []
  );

  const filterItem = useCallback(
    (item: any, b: string) => {
      if (item !== false) {
        return item.filter((args: any) => args[b].includes(search));
      }
    },
    [search]
  );

  return {
    filterItem,
    search,
    onChangeSearch,
  };
};

export default useSearch;
