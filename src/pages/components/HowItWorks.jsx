import { useState, useEffect } from "react";
import { Upload, Brain, Search } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Book",
    description: "Upload your book or choose from our library.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "AI analyzes the book and generates a mind map.",
  },
  {
    icon: Search,
    title: "Explore Insights",
    description: "Explore relationships, themes, and Q&A insights.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-6 text-center transition-all duration-500 ${
                index === activeStep ? "scale-110 shadow-lg" : "scale-100"
              }`}
            >
              <step.icon
                className={`w-16 h-16 mx-auto mb-4 transition-all duration-500 ${
                  index === activeStep ? "text-indigo-600" : "text-indigo-400"
                }`}
              />
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                {step.title}
              </h3>
              <p className="text-indigo-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
