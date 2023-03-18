import axios from 'axios';
import useSWR from 'swr';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url);

    if(!(response.status >= 200 && response.status < 300)) {
      throw new Error('Not found.');
    }

    return response.data;
  });

  return { data, error };
}
