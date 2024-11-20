import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">About No Stroke Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-muted-foreground">
                At No Stroke Zone, we are dedicated to leveraging cutting-edge technology and medical expertise to help predict and prevent strokes. Our mission is to empower individuals with knowledge and tools to understand their stroke risk factors and take proactive steps towards better health.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
              <p className="text-muted-foreground">
                We provide an advanced stroke prediction platform that analyzes various health factors to assess stroke risk. Our AI-powered system considers multiple variables including age, medical history, and lifestyle factors to provide personalized risk assessments.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
              <p className="text-muted-foreground">
                Our team consists of healthcare professionals, data scientists, and technology experts working together to provide accurate and reliable stroke risk predictions. We are committed to maintaining the highest standards of medical accuracy and user privacy.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutUs;