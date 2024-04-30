import "./App.css";

function App() {
  return (
    <video
      style={{ width: "100%"  }}
      src={"http://localhost:3000/video"}
      controls
      autoPlay
    />
  );
}

export default App;
