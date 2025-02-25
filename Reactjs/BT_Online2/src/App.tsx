import React, { useState } from "react";
import SpiralEffect from "./components/SpiralEffect";
import CircleEffect from "./components/CircleEffect";

const App: React.FC = () => {
  const [effect, setEffect] = useState<"spiral" | "circle">("spiral");

  return (
    <div>
      
      <div style={styles.EffectPosition}>
        {effect === "spiral" ? <SpiralEffect /> : <CircleEffect />}
      </div>

      <div style={styles.ButtonPosition}>
      <button onClick={() => setEffect("spiral")} style={styles.button}>
        Hình Xoắn
      </button>
      <button onClick={() => setEffect("circle")} style={styles.button}>
        Hình Tròn
      </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  EffectPosition :{
    position :'relative',
  },
  ButtonPosition :{
    position :'absolute',
    top : 0 ,
    left : 0 ,
  }
} as const;

export default App;
