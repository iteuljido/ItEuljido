import { AxiosResponse } from "axios";
import { useState } from "react";

const useRequest = <
  T extends {},
  F extends (...params: any[]) => Promise<AxiosResponse<T>>
>(
  api: F
) => {
  type Params = Parameters<F>;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onRequest = (...params: Params) => {
    setError(null);
    api(...params)
      .then((res) => {
        setError(null);
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, onRequest };
};

export default useRequest;
