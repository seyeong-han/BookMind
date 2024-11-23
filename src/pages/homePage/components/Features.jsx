import { BookOpen, MessageSquare, FileText, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Mind Maps",
    description:
      "Visualize relationships between characters and plot elements.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot",
    description:
      "Ask deep questions about the book and get insightful answers.",
  },
  {
    icon: FileText,
    title: "Book Summaries",
    description: "Get concise overviews of plots and themes.",
  },
  {
    icon: Users,
    title: "Community Contributions",
    description: "Add and refine maps with fellow book lovers.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-indigo-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-indigo-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
