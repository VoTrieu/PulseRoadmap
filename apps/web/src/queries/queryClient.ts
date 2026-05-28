import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { showErrorToast } from "../services/toastService";
import { getErrorMessage } from "../services/apiError";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showErrorToast(getErrorMessage(error));
    },
  }),
});

export { queryClient };
