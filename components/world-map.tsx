import DottedMap from "dotted-map";

// Server component (FIX-10): the dotted world map used to be computed in the
// browser on every render — `new DottedMap()` runs point-in-polygon math for
// the whole globe and was the single biggest main-thread cost on the homepage.
// It now renders on the server; the arc "draw" animation is pure CSS and the
// pulses are SMIL, so the map ships zero client JS.

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

// Module-level: computed once per server process, reused across renders.
const svgMap = new DottedMap({ height: 100, grid: "diagonal" }).getSVG({
  radius: 0.22,
  color: "#FFFFFF25",
  shape: "circle",
  backgroundColor: "transparent",
});

const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export function WorldMap({ dots = [], lineColor = "#1FA8A8" }: MapProps) {
  return (
    <div className="w-full aspect-[2/1] relative font-sans">
      <style>{`@keyframes wm-draw { to { stroke-dashoffset: 0; } }`}</style>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt=""
        height="495"
        width="1056"
        draggable={false}
      />
      <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              style={{ animation: `wm-draw 1s ease-out ${0.5 * i}s forwards` }}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {[dot.start, dot.end].map((p, j) => {
              const pt = projectPoint(p.lat, p.lng);
              return (
                <g key={j}>
                  <circle cx={pt.x} cy={pt.y} r="2" fill={lineColor} />
                  <circle cx={pt.x} cy={pt.y} r="2" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
