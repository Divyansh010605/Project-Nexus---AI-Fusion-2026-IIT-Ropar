# Project Nexus - AI Fusion, 2026 - IIT,Ropar

# Nexus | Your Unified Campus Experience at IIT Ropar

Nexus is a modern, all-in-one web application designed to streamline campus life for students at the Indian Institute of Technology, Ropar (IIT Ropar). It integrates various essential services into a single, intuitive platform, enhanced with AI-powered features to provide a personalized and efficient user experience.


## ✨ Features

- **Personalized Dashboard**: A central hub displaying real-time campus alerts, dining options with wait times, upcoming events, and your daily class schedule.
- **AI Insights**: Get personalized resource recommendations based on your mood and activities. Feeling stressed? Find counseling services. Curious about clubs? Get suggestions.
- **Student Marketplace**: A peer-to-peer marketplace to buy, sell, and trade items like textbooks, electronics, and bicycles with fellow students.
- **Lost & Found**: A campus-wide digital lost and found. Report items you've lost or found, with AI-powered image recognition to help identify and describe items automatically.
- **Interactive Campus Map**: Navigate the IIT Ropar campus with a responsive and easy-to-use map, powered by OpenStreetMap.
- **AI Summarizer**: Boost your productivity by summarizing long documents or important emails into concise, easy-to-digest bullet points.

## 🚀 Tech Stack

This project is built with a modern, production-ready tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Generative AI**: [Google's Genkit](https://firebase.google.com/docs/genkit)

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/nexus-iit-ropar.git
    cd nexus-iit-ropar
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    This project uses Google's Generative AI. You will need to get an API key for the Gemini models from [Google AI Studio](https://aistudio.google.com/app/apikey).

    Create a `.env.local` file in the root of your project and add your API key:
    ```.env.local
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### Running the Application

1.  **Start the Genkit development server:**
    Open a new terminal and run:
    ```sh
    npm run genkit:watch
    ```
    This will start the Genkit AI flows and watch for any changes.

2.  **Start the Next.js development server:**
    In another terminal, run:
    ```sh
    npm run dev
    ```

3.  **Open the application:**
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

## 🤖 AI-Powered Features

Nexus leverages Google's Genkit framework to integrate powerful generative AI capabilities:

- **Item Recognition**: In the Marketplace and Lost & Found, users can upload an image, and a vision model (Gemini) will automatically identify the item and generate a name and description.
- **Content Summarization**: The Summarizer tool uses a language model to condense long texts and emails into key takeaways.
- **Personalized Recommendations**: The AI Insights tool on the dashboard uses an LLM to suggest relevant campus resources based on user input about their mood and activities.

