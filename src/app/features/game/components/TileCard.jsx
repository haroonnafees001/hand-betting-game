import { motion as Motion, useReducedMotion } from "framer-motion";

const glowByType = {
  number: "shadow-[0_0_24px_rgba(231,190,92,0.12)]",
  wind: "shadow-[0_0_24px_rgba(93,211,158,0.12)]",
  dragon: "shadow-[0_0_24px_rgba(191,35,50,0.16)]",
};

function DragonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 260 174"
      className="h-4 w-6 text-chip-black/85"
      aria-hidden="true"
    >
      <path d="M252.59,84.22c-22.12,3.78-38.96,23.03-38.96,46.23c0,2.63,0.23,5.21,0.65,7.73c-1.7-0.12-3.42-0.19-5.15-0.19c-25.16,0-42.24,13.63-49.13,34.01h-60c-6.64-20.38-23.97-34.01-49.13-34.01c-1.73,0-3.45,0.07-5.15,0.19c0.42-2.52,0.65-5.1,0.65-7.73c0-23.2-16.84-42.45-38.96-46.23c11.11-9.31,18.18-23.28,18.18-38.91c0-18.03-9.41-33.87-23.59-42.85C5.24,2.15,8.53,2,11.85,2C42.9,2,70.8,15.46,90.03,36.88C83.73,46.99,80,59.56,80,73.18c0,20.74,8.188,39.615,21.83,49.92c4.51,3.407,9.144,2.374,11.898-0.304c2.828-2.75,2.825-7.778-0.338-11.076c-9.915-10.34-14.48-15.96-14.16-30.52c0.11-5.28,2.14-10.29,5.05-14.55c-1.57-0.17-3.21-0.77-4.71-2.18c-4.75-4.48-3.92-11.86-3.87-12.23c4.32,5.28,11.4,7.23,17.7,5.17c0.15-0.11,0.3-0.21,0.45-0.32c-9.93-7.24-7.53-18.66-7.44-19.07c3.48,8.62,11.88,14.03,20.89,13.97c9.81-1.18,17.33,2.83,17.33,2.83s2.12-4.22,2.12-10.55c0,0,5.25,5.09,9.08,13.76c2.64,5.97,3.05,11.89,6.44,15.88l4.89,4.69c1.27,1.21,1.29,3.24,0.03,4.47l-6.09,6.02l0.61-5.18L149.5,77.8c1.35,3.36,5.1,11.59,5.1,11.59l3.78,1.63l-4.74,1.77c-1.74,0.64-3.69,0.14-4.9-1.26c-2.83-3.3-11.76-13.79-12.23-14.36c-3.13-3.83-10.09-4.53-13.21,1.61c-2.2,4.34,0.67,8.25,1.87,9.63c5.84,6.72,26.51,15.42,37.9,30.18c10.44-11.07,17.03-27.31,17.03-45.41c0-13.66-3.75-26.25-10.07-36.37C189.26,15.44,217.13,2,248.15,2c3.32,0,6.61,0.15,9.85,0.46c-14.18,8.98-23.59,24.82-23.59,42.85C234.41,60.94,241.48,74.91,252.59,84.22z" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      className="h-5 w-5 text-chip-black/85"
      aria-hidden="true"
    >
      <path
        d="M-3.014,11.658A4.547,4.547,0,0,0-5.162,8.583a4.529,4.529,0,0,0-3.063-.548c0-.034.01-.066.01-.1A1.78,1.78,0,0,0-9.1,6.4a4.524,4.524,0,0,0,1.01-2.884A4.548,4.548,0,0,0-9.675.121a.5.5,0,0,0-.65,0,4.548,4.548,0,0,0-1.588,3.4A4.524,4.524,0,0,0-10.9,6.4a1.78,1.78,0,0,0-.882,1.531c0,.033.008.063.009.1a4.54,4.54,0,0,0-3.062.554,4.547,4.547,0,0,0-2.148,3.075.5.5,0,0,0,.325.564,4.536,4.536,0,0,0,1.511.258,4.546,4.546,0,0,0,2.226-.583A4.522,4.522,0,0,0-10.9,9.466l.079.043L-11.91,15h-.59a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5h-.59L-9.178,9.509l.073-.04A4.524,4.524,0,0,0-7.076,11.9a4.535,4.535,0,0,0,2.226.583,4.536,4.536,0,0,0,1.511-.258A.5.5,0,0,0-3.014,11.658Zm-3.573-.633a3.547,3.547,0,0,1-1.632-2,3.551,3.551,0,0,1,2.546.42A3.55,3.55,0,0,1-4.108,11.4,3.546,3.546,0,0,1-6.587,11.025ZM-10,8.719a.786.786,0,0,1-.785-.785A.786.786,0,0,1-10,7.149a.786.786,0,0,1,.785.785A.786.786,0,0,1-10,8.719Zm-3.413,2.306a3.53,3.53,0,0,1-2.479.376,3.554,3.554,0,0,1,1.565-1.958,3.554,3.554,0,0,1,2.55-.412A3.55,3.55,0,0,1-13.413,11.025ZM-10,1.2a3.551,3.551,0,0,1,.914,2.334,3.553,3.553,0,0,1-.919,2.415,3.551,3.551,0,0,1-.909-2.415A3.551,3.551,0,0,1-10,1.2ZM-10.891,15-10,10.5l.891,4.5Z"
        transform="translate(16.995 0)"
      />
    </svg>
  );
}

function BambooIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className="h-5 w-5 text-chip-black/85"
      aria-hidden="true"
    >
      <path d="M297.886,117.152V4.585h-96.95v112.567c0,20.58-18.811,30.874-18.811,30.874h134.563C316.688,148.026,297.886,137.732,297.886,117.152z" />
      <path d="M200.936,399.458V512h96.95V399.458c0-20.572,18.802-30.874,18.802-30.874H182.125C182.125,368.584,200.936,378.887,200.936,399.458z" />
      <path d="M423.52,105.528c13.831-8.947,35.476-24.462,41.795-49.66c-25.594-4.576-48.612,8.818-62.444,17.764l-25.5,16.502c-13.84,8.929-35.484,24.46-41.803,49.659c25.576,4.559,48.612-8.808,62.418-17.755L423.52,105.528z" />
      <path d="M437.094,141.149l-22.623-1.184c-12.252-0.636-32.084-0.748-46.913,11.71c13.463,13.926,33.176,15.926,45.427,16.553l22.624,1.185c12.252,0.652,32.076,0.746,46.912-11.712C469.084,143.776,449.346,141.793,437.094,141.149z" />
      <path d="M368.786,69.356l8.19-21.113c4.439-11.462,10.715-30.264,3.529-48.243c-17.438,8.44-25.482,26.556-29.921,37.992l-8.182,21.113c-4.439,11.436-10.715,30.238-3.537,48.217C356.303,98.907,364.347,80.766,368.786,69.356z" />
      <path d="M122.334,272.056l-26.598-12.948c-14.39-7.023-38.215-17.249-62.401-9.814c9.075,23.602,31.81,36.034,46.225,43.058l26.59,12.921c14.416,7.048,38.249,17.258,62.427,9.839C159.51,291.519,136.749,279.053,122.334,272.056z" />
      <path d="M128.979,249.294c5.632,10.534,15.557,27.114,33.364,33.175c4.86-18.202-3.443-35.639-9.066-46.173l-10.389-19.43c-5.649-10.534-15.532-27.105-33.389-33.2c-4.834,18.227,3.468,35.664,9.066,46.191L128.979,249.294z" />
      <path d="M93.16,322.9l-21.713,3.812c-11.772,2.052-30.625,6.302-41.968,21.344c15.807,10.276,34.961,7.856,46.732,5.786l21.713-3.786c11.736-2.069,30.564-6.302,41.941-21.344C124.077,318.409,104.922,320.856,93.16,322.9z" />
      <path d="M316.688,171.156H182.125c0,0,18.811,10.303,18.811,30.874v112.55c0,20.571-18.811,30.874-18.811,30.874h134.563c0,0-18.802-10.303-18.802-30.874V202.03C297.886,181.459,316.688,171.156,316.688,171.156z M233.39,316.53c0,3.863-3.134,6.98-6.972,6.98c-3.863,0-6.997-3.117-6.997-6.98V202.52c0-3.855,3.134-6.972,6.997-6.972c3.838,0,6.972,3.116,6.972,6.972V316.53z" />
    </svg>
  );
}

export default function TileCard({
  tile,
  value,
  index = 0,
  uiPhase = "resolved",
  mode = "current",
  surface = "default",
}) {
  const shouldReduceMotion = useReducedMotion();
  const isDealerSurface = surface === "dealer";
  const baseRotate = isDealerSurface ? (index % 5 - 2) * 2.4 : 0;

  const dealAnimation = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
          delay: index * 0.06,
          duration: 0.33,
          ease: [0.2, 0.78, 0.25, 1],
        },
      };

  const initialState = shouldReduceMotion
    ? { opacity: 0 }
      : {
        opacity: mode === "current" && uiPhase === "dealing" ? 0 : 1,
        y: mode === "current" && uiPhase === "dealing" ? -18 : 0,
        rotate: mode === "current" && uiPhase === "dealing" ? baseRotate - 4 : baseRotate,
        scale: mode === "current" && uiPhase === "dealing" ? 0.95 : 1,
      };

  const frameClass =
    isDealerSurface
      ? "h-[168px] w-[128px] rounded-[12px] p-3 sm:h-[192px] sm:w-[146px] sm:p-3.5 lg:h-[224px] lg:w-[170px] lg:p-4 xl:h-[244px] xl:w-[186px]"
      : "min-w-[120px] rounded-card p-4";

  const valueClass = isDealerSurface ? "mt-3 text-2xl sm:mt-4 sm:text-3xl lg:mt-5 lg:text-4xl" : "text-3xl mt-3";
  const labelClass = isDealerSurface
    ? "mt-2 text-[1.1rem] leading-tight sm:text-[1.3rem] lg:mt-3 lg:text-[1.6rem]"
    : "text-section mt-2";
  const typeClass = isDealerSurface
    ? "text-[0.62rem] tracking-[0.18em] sm:text-[0.7rem] sm:tracking-[0.2em] lg:text-[0.78rem] lg:tracking-[0.23em]"
    : "text-small tracking-[0.2em]";

  return (
    <Motion.div
      layout
      initial={initialState}
      animate={dealAnimation}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
              rotate: isDealerSurface
                ? baseRotate + (tile.type === "dragon" ? -1 : 1)
                : tile.type === "dragon"
                ? -1
                : 1,
              transition: { duration: 0.16 },
            }
      }
      style={isDealerSurface ? { rotate: `${baseRotate}deg` } : undefined}
      className={`relative flex flex-col items-center justify-center overflow-hidden border border-[#cdbb8d] bg-gradient-to-br from-[#f8f2e5] via-[#eadcb8] to-[#cfbd96] text-chip-black shadow-[0_16px_30px_rgba(0,0,0,0.4)] ${frameClass} ${glowByType[tile.type]}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[7px] bg-gradient-to-l from-black/22 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[7px] bg-gradient-to-t from-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-[5px] rounded-[8px] border border-white/22" />

      <div className={`relative z-10 flex items-center gap-2 uppercase text-chip-black/60 ${typeClass}`}>
        <span>{tile.type}</span>
        {tile.type === "dragon" && <DragonIcon />}
        {tile.type === "wind" && <WindIcon />}
        {tile.key?.startsWith("bamboo-") && <BambooIcon />}
      </div>
      <div className={`relative z-10 font-semibold capitalize ${labelClass}`}>{tile.label}</div>
      <div className={`relative z-10 font-bold text-chip-black ${valueClass}`}>{value}</div>
    </Motion.div>
  );
}
