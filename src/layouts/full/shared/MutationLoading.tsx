import FullscreenLoader from "src/components/shared/FullScreenLoader";
import { useMutationLoadingStore } from "src/zustand/MutationLoading";

const MutationLoading = () => {
  const mutationLoading = useMutationLoadingStore((state) => state.mutationLoading);
  return mutationLoading ? <FullscreenLoader /> : null;
};

export default MutationLoading;