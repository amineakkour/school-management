import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (

    <button onClick={() => setTheme((t => t === "dark" ? "light" : "dark"))}>
      { theme === "dark" ? <Sun className="text-yellow-500" /> : <Moon />}
    </button>
  )
}
