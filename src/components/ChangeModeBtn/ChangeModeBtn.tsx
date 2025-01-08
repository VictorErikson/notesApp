import { useMode } from "../../context/ModeContext";

const ChangeModeBtn = () => {
  const { mode, toggleMode, resetToSystemMode } = useMode();

  return (
    <div>
      <h1>Current Mode: {mode}</h1>
      <button onClick={toggleMode}>
        Toggle to {mode === "light" ? "Dark" : "Light"} Mode
      </button>
      <button onClick={resetToSystemMode}>Reset to System Default</button>
    </div>
  );
};

export default ChangeModeBtn;
