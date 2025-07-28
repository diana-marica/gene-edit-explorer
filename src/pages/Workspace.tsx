import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import WorkspaceTabs from "@/components/workspace/WorkspaceTabs";

const Workspace = () => {
  const [searchParams] = useSearchParams();
  const geneQuery = searchParams.get('gene');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6">
        <WorkspaceTabs geneQuery={geneQuery || undefined} />
      </div>
    </div>
  );
};

export default Workspace;