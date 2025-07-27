import Navigation from "@/components/Navigation";
import HeroSection from "@/components/home/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Dna, Atom, Users, Award, BookOpen } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Target,
      title: "CRISPR Guide Design",
      description: "Generate optimal guide RNAs with comprehensive on/off-target analysis using validated scoring algorithms.",
      capabilities: ["MIT & Doench scoring", "Off-target prediction", "PAM site optimization"]
    },
    {
      icon: Zap,
      title: "Edit Outcome Prediction",
      description: "Predict NHEJ repair outcomes, frameshift probability, and splicing disruption using machine learning models.",
      capabilities: ["NHEJ profiling", "Frameshift analysis", "Splicing prediction"]
    },
    {
      icon: Dna,
      title: "Protein Structure Visualization",
      description: "Integrate AlphaFold models with functional domain mapping and edit site impact assessment.",
      capabilities: ["3D structure viewer", "Domain annotation", "Functional impact"]
    },
    {
      icon: Atom,
      title: "Ligand Binding Analysis",
      description: "Discover binding pockets and suggest therapeutic compounds using structural and chemical databases.",
      capabilities: ["Pocket detection", "Ligand screening", "Drug similarity"]
    }
  ];

  const useCases = [
    {
      title: "Gene Therapy Research",
      description: "Design precise edits for therapeutic applications with comprehensive safety assessment."
    },
    {
      title: "Functional Genomics",
      description: "Create targeted knockouts and study gene function with predictable outcomes."
    },
    {
      title: "Drug Discovery",
      description: "Identify new therapeutic targets and validate compound binding interactions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete CRISPR-to-Drug Discovery Pipeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your research with an integrated suite of bioinformatics tools 
              designed for modern genomics and drug discovery workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-scientific transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-accent rounded-lg">
                      <feature.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <Badge key={capIndex} variant="secondary">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Empowering Research Across Disciplines
            </h2>
            <p className="text-lg text-muted-foreground">
              From basic research to clinical applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Accelerate Your Research?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join researchers worldwide using GenEditLab for precision genome editing and drug discovery.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <BookOpen className="h-5 w-5" />
                View Documentation
              </Button>
              <Button variant="scientific" size="lg" className="bg-white/20 hover:bg-white/30">
                Start Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dna className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">GenEditLab</span>
              </div>
              <p className="text-muted-foreground">
                Advanced bioinformatics for CRISPR design and protein analysis.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>CRISPR Design</li>
                <li>Edit Prediction</li>
                <li>Structure Analysis</li>
                <li>Ligand Discovery</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Tutorials</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Research Team</li>
                <li>Publications</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 GenEditLab. Empowering precision genomics research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;