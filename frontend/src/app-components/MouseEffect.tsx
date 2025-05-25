import React from "react";

function MouseEffect() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMousePosition);

    return () => {
      window.removeEventListener("mousemove", handleMousePosition);
    };
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.20), transparent 80%)`,
      }}
    />
  );
}

export default MouseEffect;
