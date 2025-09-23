# Stress Detector - Modern React Frontend

A beautiful, modern React frontend for the Stress Detector application that connects to your existing Hugging Face Spaces backend.

## 🚀 Features

- **Modern UI/UX**: Clean, professional interface with glassmorphism design
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Analysis**: Connect to your Hugging Face Spaces API
- **Smooth Animations**: Framer Motion powered animations
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications

## 📦 Installation

1. **Install dependencies:**
   ```bash
   cd stress-detector-modern
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your Hugging Face Spaces URL
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add `REACT_APP_HF_SPACES_URL` with your Hugging Face Spaces URL

## 🔧 Configuration

### Connecting to Your Hugging Face Spaces

1. **Get your Hugging Face Spaces URL:**
   - Deploy your `app.py` to Hugging Face Spaces
   - Copy the URL (e.g., `https://your-username-stress-detector.hf.space`)

2. **Update the environment variable:**
   ```bash
   REACT_APP_HF_SPACES_URL=https://your-username-stress-detector.hf.space
   ```

3. **API Integration:**
   The frontend expects your Gradio app to have an endpoint at `/api/predict` that accepts:
   ```json
   {
     "data": [cortisol, amylase, iga, sleep, age]
   }
   ```

### Customizing the UI

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Animations**: Modify Framer Motion variants in components
- **Layout**: Adjust component structure in `src/components/`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── StressForm.tsx   # Input form for biomarkers
│   ├── ResultsDisplay.tsx # Results visualization
│   └── LoadingSpinner.tsx # Loading animation
├── services/            # API services
│   └── api.ts          # Hugging Face Spaces integration
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── index.tsx           # React entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful color gradients
- **Smooth Transitions**: Framer Motion animations
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Accessible**: WCAG compliant color contrasts and interactions

## 🔌 API Integration

The app is configured to work with your existing Gradio application. Make sure your `app.py` includes:

```python
# Enable API access in your Gradio app
demo.launch(show_api=True)
```

## 📱 Mobile Experience

- Fully responsive design
- Touch-friendly interactions
- Optimized for mobile performance
- Progressive Web App features ready

## 🚦 Getting Started

1. **Clone and setup the project**
2. **Deploy your existing `app.py` to Hugging Face Spaces**
3. **Update the API URL in `.env`**
4. **Test locally with `npm start`**
5. **Deploy to Vercel for production**

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.

---

**Ready to deploy?** Your modern stress detector frontend is ready to connect with your Hugging Face Spaces backend and deploy to Vercel! 🚀