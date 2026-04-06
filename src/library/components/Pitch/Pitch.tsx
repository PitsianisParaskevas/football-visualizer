import React from "react";

export type PitchProps = {
  width?: number;
  height?: number;
  backgroundColor?: string;
  lineColor?: string;
  lineWidth?: number;
  showCornerArcs?: boolean;
  showCenterCircle?: boolean;
  showPenaltyArcs?: boolean;
  showStripes?: boolean;
  showGoals?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

type ArcProps = {
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
};

const DEFAULT_DIMENSIONS = {
  length: 105,
  width: 68,
} as const;

const PITCH = {
  centerCircleRadius: 9.15,
  penaltyAreaDepth: 16.5,
  penaltyAreaWidth: 40.32,
  goalAreaDepth: 5.5,
  goalAreaWidth: 18.32,
  penaltySpotDistance: 11,
  goalWidth: 7.32,
  cornerArcRadius: 1,
  goalDepth: 2,
  spotRadius: 0.25,
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(toRadians(angle)),
    y: cy + r * Math.sin(toRadians(angle)),
  };
}

function describeArc({ cx, cy, r, startAngle, endAngle }: ArcProps) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const delta = (((endAngle - startAngle) % 360) + 360) % 360;
  const largeArcFlag = delta > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function getPitchGeometry() {
  const { length, width } = DEFAULT_DIMENSIONS;
  const halfLength = length / 2;
  const halfWidth = width / 2;

  const penaltyTop = -PITCH.penaltyAreaWidth / 2;
  const goalAreaTop = -PITCH.goalAreaWidth / 2;
  const goalTop = -PITCH.goalWidth / 2;

  const leftPenaltySpotX = -halfLength + PITCH.penaltySpotDistance;
  const rightPenaltySpotX = halfLength - PITCH.penaltySpotDistance;

  const penaltyArcHalfAngle =
    (Math.acos(
      (PITCH.penaltyAreaDepth - PITCH.penaltySpotDistance) /
        PITCH.centerCircleRadius,
    ) *
      180) /
    Math.PI;

  return {
    length,
    width,
    halfLength,
    halfWidth,
    penaltyTop,
    goalAreaTop,
    goalTop,
    leftPenaltySpotX,
    rightPenaltySpotX,
    rightPenaltyAreaX: halfLength - PITCH.penaltyAreaDepth,
    rightGoalAreaX: halfLength - PITCH.goalAreaDepth,
    penaltyArcHalfAngle,
    viewBox: `${-halfLength} ${-halfWidth} ${length} ${width}`,
  };
}

function PitchSurface({
  halfLength,
  halfWidth,
  length,
  width,
  backgroundColor,
  stripeColor,
  showStripes,
}: {
  halfLength: number;
  halfWidth: number;
  length: number;
  width: number;
  backgroundColor: string;
  stripeColor: string;
  showStripes: boolean;
}) {
  const stripeCount = 10;
  const stripeWidth = length / stripeCount;

  return (
    <>
      <rect
        x={-halfLength}
        y={-halfWidth}
        width={length}
        height={width}
        fill={backgroundColor}
      />

      {showStripes &&
        Array.from({ length: stripeCount }).map((_, index) => (
          <rect
            key={index}
            x={-halfLength + index * stripeWidth}
            y={-halfWidth}
            width={stripeWidth}
            height={width}
            fill={index % 2 === 0 ? backgroundColor : stripeColor}
            opacity={0.45}
          />
        ))}
    </>
  );
}

function PitchLines({
  geometry,
  lineColor,
  lineWidth,
  showCornerArcs,
  showCenterCircle,
  showPenaltyArcs,
}: {
  geometry: ReturnType<typeof getPitchGeometry>;
  lineColor: string;
  lineWidth: number;
  showCornerArcs: boolean;
  showCenterCircle: boolean;
  showPenaltyArcs: boolean;
}) {
  const {
    halfLength,
    halfWidth,
    penaltyTop,
    goalAreaTop,
    leftPenaltySpotX,
    rightPenaltySpotX,
    rightPenaltyAreaX,
    rightGoalAreaX,
    penaltyArcHalfAngle,
  } = geometry;

  return (
    <g
      fill="none"
      stroke={lineColor}
      strokeWidth={lineWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x={-halfLength}
        y={-halfWidth}
        width={geometry.length}
        height={geometry.width}
      />

      <line x1={0} y1={-halfWidth} x2={0} y2={halfWidth} />

      {showCenterCircle && (
        <circle cx={0} cy={0} r={PITCH.centerCircleRadius} />
      )}

      <rect
        x={-halfLength}
        y={penaltyTop}
        width={PITCH.penaltyAreaDepth}
        height={PITCH.penaltyAreaWidth}
      />
      <rect
        x={rightPenaltyAreaX}
        y={penaltyTop}
        width={PITCH.penaltyAreaDepth}
        height={PITCH.penaltyAreaWidth}
      />

      <rect
        x={-halfLength}
        y={goalAreaTop}
        width={PITCH.goalAreaDepth}
        height={PITCH.goalAreaWidth}
      />
      <rect
        x={rightGoalAreaX}
        y={goalAreaTop}
        width={PITCH.goalAreaDepth}
        height={PITCH.goalAreaWidth}
      />

      {showPenaltyArcs && (
        <>
          <path
            d={describeArc({
              cx: leftPenaltySpotX,
              cy: 0,
              r: PITCH.centerCircleRadius,
              startAngle: -penaltyArcHalfAngle,
              endAngle: penaltyArcHalfAngle,
            })}
          />
          <path
            d={describeArc({
              cx: rightPenaltySpotX,
              cy: 0,
              r: PITCH.centerCircleRadius,
              startAngle: 180 - penaltyArcHalfAngle,
              endAngle: 180 + penaltyArcHalfAngle,
            })}
          />
        </>
      )}

      {showCornerArcs && (
        <>
          <path
            d={describeArc({
              cx: -halfLength,
              cy: -halfWidth,
              r: PITCH.cornerArcRadius,
              startAngle: 0,
              endAngle: 90,
            })}
          />
          <path
            d={describeArc({
              cx: halfLength,
              cy: -halfWidth,
              r: PITCH.cornerArcRadius,
              startAngle: 90,
              endAngle: 180,
            })}
          />
          <path
            d={describeArc({
              cx: halfLength,
              cy: halfWidth,
              r: PITCH.cornerArcRadius,
              startAngle: 180,
              endAngle: 270,
            })}
          />
          <path
            d={describeArc({
              cx: -halfLength,
              cy: halfWidth,
              r: PITCH.cornerArcRadius,
              startAngle: 270,
              endAngle: 360,
            })}
          />
        </>
      )}
    </g>
  );
}

function PitchSpots({
  leftPenaltySpotX,
  rightPenaltySpotX,
  lineColor,
}: {
  leftPenaltySpotX: number;
  rightPenaltySpotX: number;
  lineColor: string;
}) {
  return (
    <g fill={lineColor} stroke="none">
      <circle cx={0} cy={0} r={PITCH.spotRadius} />
      <circle cx={leftPenaltySpotX} cy={0} r={PITCH.spotRadius} />
      <circle cx={rightPenaltySpotX} cy={0} r={PITCH.spotRadius} />
    </g>
  );
}

function GoalFrames({
  halfLength,
  goalTop,
  lineColor,
  lineWidth,
}: {
  halfLength: number;
  goalTop: number;
  lineColor: string;
  lineWidth: number;
}) {
  return (
    <g
      fill="none"
      stroke={lineColor}
      strokeWidth={lineWidth * 0.6}
      opacity={0.7}
    >
      <rect
        x={-halfLength - PITCH.goalDepth}
        y={goalTop}
        width={PITCH.goalDepth}
        height={PITCH.goalWidth}
      />
      <rect
        x={halfLength}
        y={goalTop}
        width={PITCH.goalDepth}
        height={PITCH.goalWidth}
      />
    </g>
  );
}

export function Pitch({
  width = 800,
  height = 520,
  backgroundColor = "#3f995b",
  lineColor = "#ffffff",
  lineWidth = 0.15,
  showCornerArcs = true,
  showCenterCircle = true,
  showPenaltyArcs = true,
  showStripes = true,
  showGoals = true,
  orientation = "horizontal",
  className,
  style,
  children,
}: PitchProps) {
  const geometry = getPitchGeometry();
  const isVertical = orientation === "vertical";

  const normalizedLineWidth = clamp(lineWidth, 0, 2);
  const svgWidth = isVertical ? height : width;
  const svgHeight = isVertical ? width : height;

  const viewBox = isVertical
    ? `${-geometry.halfWidth} ${-geometry.halfLength} ${geometry.width} ${geometry.length}`
    : geometry.viewBox;

  const transform = isVertical ? "rotate(90)" : undefined;

  return (
    <svg
      viewBox={viewBox}
      width={svgWidth}
      height={svgHeight}
      className={className}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Football pitch"
    >
      <g transform={transform}>
        <PitchSurface
          halfLength={geometry.halfLength}
          halfWidth={geometry.halfWidth}
          length={geometry.length}
          width={geometry.width}
          backgroundColor={backgroundColor}
          stripeColor={showStripes ? "#4aa867" : backgroundColor}
          showStripes={showStripes}
        />

        <PitchLines
          geometry={geometry}
          lineColor={lineColor}
          lineWidth={normalizedLineWidth}
          showCornerArcs={showCornerArcs}
          showCenterCircle={showCenterCircle}
          showPenaltyArcs={showPenaltyArcs}
        />

        <PitchSpots
          leftPenaltySpotX={geometry.leftPenaltySpotX}
          rightPenaltySpotX={geometry.rightPenaltySpotX}
          lineColor={lineColor}
        />

        {showGoals && (
          <GoalFrames
            halfLength={geometry.halfLength}
            goalTop={geometry.goalTop}
            lineColor={lineColor}
            lineWidth={normalizedLineWidth}
          />
        )}
        {children}
      </g>
    </svg>
  );
}

export default Pitch;
