export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
    
      colors: {
       
        "primary": "#0A0EB3",
        "secondary": "#32F0CD",
        
      },
      fontWeight: {
        extrabw: "800", // Custom font weight
        semibw: "300",  // Add another custom weight
      },
    },
  },
  important: true,
  plugins: [],
}
