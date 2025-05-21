import { Loader } from "lucide-react";

const LucidSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-black">
    <Loader className="animate-spin text-white" size={48} strokeWidth={2} />
  </div>
);

export default LucidSpinner;
