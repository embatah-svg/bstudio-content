const MARKS = Array.from({ length: 16 });

export default function Pitch() {
  return (
    <div className="flex h-[14px] border-t border-[rgba(19,26,30,0.25)]">
      {MARKS.map((_, i) => (
        <i
          key={i}
          className="flex-1 border-r"
          style={{
            borderColor: i % 4 === 0 ? "rgba(19,26,30,0.5)" : "rgba(19,26,30,0.18)",
          }}
        />
      ))}
    </div>
  );
}
