# VOICE - Voice of Information in Critical Situations and Emergencies

![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-white?logo=next.js)
![Hackathon Project](https://img.shields.io/badge/Hackathon-Project-blue)
![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen)

**VOICE** is a comprehensive disaster management application designed to support individuals and communities both before and after a disaster strikes. It integrates vital emergency services into a single, user-friendly platform.

## 🧭 Overview

VOICE empowers users with tools to navigate critical situations effectively. From learning survival strategies to real-time emergency communication and medical assistance, VOICE is your all-in-one companion for disaster preparedness and response.

This app was initially developed during a hackathon with the mission to create a centralized system that brings essential services under one roof. We aim to enhance resilience during disasters by offering functionalities such as:
- A **first aid chatbot** powered by AI,
- **Relief center tracking** for locating nearby shelters,
- **Emergency calling** capabilities,
- A system to enable **offline communication via Bluetooth** (currently in development),
- A **donation platform** to support affected areas,
- And **patient record tracking** for quick and efficient healthcare response.

## 🚀 Features

- 🩺 AI-based Medical Chatbot (First Aid Assistance)
- 📞 One-tap Emergency Calling
- 📍 Real-time Relief Center Tracking
- 🔗 Offline Communication via Bluetooth (In Progress)
- 💰 Integrated Donation System
- 📝 Patient Health Record Tracker

## 🛠️ Tech Stack

- **Frontend/Backend:** JavaScript, Node.js , Next.js , React.js 
- **APIs Used:**  
  - [Twilio](https://www.twilio.com/) – for emergency SMS/calls  
  - [Hugging Face](https://huggingface.co/) – powering the first aid chatbot  
- **Other Tools:**  
  - npm

## ⚙️ Installation

To run the project locally:

```bash
npm install
npm run dev
```

## 📁 Project Structure 

```text
VOICE_PROJECT/
├── disaster-management/
│   ├── .next/                   # Next.js build output
│   ├── app/                     # Application entry point
│   ├── components/              # Reusable UI components
│   ├── config/                  # App configuration files
│   ├── contexts/                # React Context for global state
│   ├── data\donations/          # Sample or static donation data
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Helper functions or libraries
│   ├── models/                  # Data models or schemas
│   ├── node_modules/            # Project dependencies
│   ├── public/                  # Static assets (images, icons, etc.)
│   ├── styles/                  # Global stylesheets
│   │   └── globals.css
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── VOICE/                   # VOICE-specific modules
│   ├── .env.local               # Environment variables
│   ├── .gitignore               # Git ignore rules
│   ├── components.json          # Configuration for dynamic components (optional)
│   ├── next-env.d.ts            # TypeScript declaration for Next.js
│   ├── next.config.mjs          # Next.js configuration file
│   ├── package.json             # Project metadata and scripts
│   ├── package-lock.json        # Dependency lock file
│   ├── pnpm-lock.yaml           # pnpm lock file (if pnpm used)
│   ├── postcss.config.mjs       # PostCSS configuration
│   ├── README.md                # Project README file
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   └── tsconfig.json            # TypeScript configuration

```
## 🎥 Demo

### 📽️ Video Walkthrough

> _Watch the demo video to see VOICE in action!_  
> [![Watch the Demo](https://img.youtube.com/vi/Jy_rmr5Cxgc/maxresdefault.jpg)]([https://youtu.be/Jy_rmr5Cxgc])



---


