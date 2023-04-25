import { useQuery } from "react-query";
import { CURRENT_API_VERSION_URL } from "constants";
import { parse } from "date-fns";

const STALE_TIME = 1000 * 60 * 10;

const getApplication = async (applicationRef: string) => {
  const response = await fetch(
    `${CURRENT_API_VERSION_URL}/application/${applicationRef}`
  );
  const data = await response.json();

  data["dateOfBirth"] = data["dateOfBirth"]
    ? parse(data["dateOfBirth"], "MM-dd-yyyy", new Date())
    : null;

  return data;
};

export const useGetApplication = (applicationRef: string) =>
  useQuery(
    ["application", applicationRef],
    () => getApplication(applicationRef),
    {
      staleTime: STALE_TIME,
    }
  );
