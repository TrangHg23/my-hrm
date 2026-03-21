import { useState, useEffect } from "react";

export function useGreeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hours = new Date().getHours();
      if (hours >= 5 && hours < 12) {
        setGreeting("Chào buổi sáng");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Chào buổi chiều");
      } else {
        setGreeting("Chào buổi tối");
      }
    };

    updateGreeting();
    // Update every minute to catch transitions
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return greeting;
}
