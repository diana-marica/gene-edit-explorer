import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Github, Mail, Award, Users, Cpu } from "lucide-react";

const About = () => {
  const technologies = [
    "React & TypeScript", "Tailwind CSS", "AlphaFold API", "Ensembl API",
    "ChEMBL Database", "PubChem API", "OpenAI GPT", "3D Molecular Viewer"
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Computational Biology Lead",
      description: "PhD in Bioinformatics, specializing in CRISPR design algorithms"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Structural Biology Expert",
      description: "Expert in protein structure analysis and drug discovery"
    },
    {
      name: "Dr. Emily Park",
      role: "Machine Learning Scientist", 
      description: "Developing predictive models for genome editing outcomes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About GenEditLab
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the next generation of bioinformatics tools to accelerate 
            genome editing research and therapeutic discovery. Our platform integrates 
            cutting-edge algorithms with intuitive interfaces for researchers worldwide.
          </p>
        </div>

        {/* Mission */}
        <Card className="shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To democratize access to advanced bioinformatics tools and empower researchers 
              to make breakthrough discoveries in genome editing and drug discovery. We believe 
              that sophisticated computational biology should be accessible to labs of all sizes, 
              from academic research groups to biotech startups.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Technology Stack */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Technology Stack
              </CardTitle>
              <CardDescription>
                Built with modern web technologies and scientific APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Key Features
              </CardTitle>
              <CardDescription>
                Comprehensive tools for modern genomics research
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>State-of-the-art CRISPR guide RNA design algorithms</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Machine learning-powered edit outcome prediction</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Integration with AlphaFold protein structure database</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Comprehensive ligand binding and drug discovery tools</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Research Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Card className="shadow-card text-center">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Questions, feedback, or collaboration opportunities? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center">
              <Button variant="outline">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline">
                <Github className="h-4 w-4" />
                View Source
              </Button>
              <Button variant="scientific">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;