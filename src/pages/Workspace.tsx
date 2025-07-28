import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import WorkspaceTabs from "@/components/workspace/WorkspaceTabs";
import { ApiStatus } from "@/components/workspace/ApiStatus";

const Workspace = () => {
  const [searchParams] = useSearchParams();
  const geneQuery = searchParams.get('gene');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 space-y-6">
        <ApiStatus />
        <WorkspaceTabs geneQuery={geneQuery || undefined} />
      </div>
    </div>
  );
};

export default Workspace;