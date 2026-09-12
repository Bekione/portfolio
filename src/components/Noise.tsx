export const Noise = ({className} :  {className ?: string}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 pointer-events-none select-none animate-[grain_8s_steps(10)_infinite] z-0 ${className ?? ""}`}
      style={{
        backgroundImage: "url(/assets/noise.webp)",
        backgroundSize: "30%",
        backgroundRepeat: "repeat"
      }}
      aria-hidden="true"
    ></div>
  );
};
