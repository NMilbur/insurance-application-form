import { useMutation, useQuery, useQueryClient } from "react-query";
import { CURRENT_API_VERSION_URL } from "constants";
import { parse } from "date-fns";

const STALE_TIME = 1000 * 60 * 10;
const APPLICATION_ENDPOINT = `${CURRENT_API_VERSION_URL}/application`;

const getApplication = async (applicationRef: string) => {
  const response = await fetch(`${APPLICATION_ENDPOINT}/${applicationRef}`);
  const data = await response.json();

  data["dateOfBirth"] = data["dateOfBirth"]
    ? parse(data["dateOfBirth"], "MM-dd-yyyy", new Date())
    : null;

  return data;
};

export const useGetApplication = (applicationRef: string) =>
  useQuery(["application"], () => getApplication(applicationRef), {
    staleTime: STALE_TIME,
  });

type ApplicationProps = {
  applicationRef: string;
  body: BodyInit;
};

const updateApplication = async ({
  applicationRef,
  body,
}: ApplicationProps) => {
  const response = await fetch(`${APPLICATION_ENDPOINT}/${applicationRef}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  return data;
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation(updateApplication, {
    onSuccess: () => queryClient.invalidateQueries("application"),
  });
};

const getQuote = async (body: BodyInit) => {
  const response = await fetch(`${APPLICATION_ENDPOINT}/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  return data;
};

export const useGetQuote = () => useMutation(getQuote);
