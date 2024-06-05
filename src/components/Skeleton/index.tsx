"use client";

import { twMerge } from "tailwind-merge";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

export enum SHAPE_ENUMS {
  SQUARE,
  RECTANGLE,
  CIRCLE,
  CUSTOM,
}

type Props = {
  width?: string;
  shape?: SHAPE_ENUMS;
  customRatio?: number;
  style?: React.CSSProperties;
};

const MySkeleton: React.FC<Props> = ({
  width = "20%",
  shape = SHAPE_ENUMS.SQUARE,
  customRatio = -1,
  style,
}) => {
  let shapePropertiesMap: {
    [key in SHAPE_ENUMS]: {
      aspectRatio: number;
      borderRadius: number;
    };
  } = {
    [SHAPE_ENUMS.CIRCLE]: {
      aspectRatio: 1,
      borderRadius: 50,
    },
    [SHAPE_ENUMS.SQUARE]: {
      aspectRatio: 1,
      borderRadius: 0,
    },
    [SHAPE_ENUMS.RECTANGLE]: {
      aspectRatio: 16 / 9,
      borderRadius: 0,
    },
    [SHAPE_ENUMS.CUSTOM]: {
      aspectRatio: customRatio,
      borderRadius: 0,
    },
  };
  return (
    <div style={{ width: width, ...style }}>
      <SkeletonTheme width={"100%"} baseColor="#202020" highlightColor="#444">
        <Skeleton
          style={{
            aspectRatio: shapePropertiesMap[shape].aspectRatio,
            borderRadius: `${shapePropertiesMap[shape].borderRadius}%`,
          }}
          className={twMerge(
            "rounded-md",
            "font-bold",
            "text-[20px]",
            "p-[10px]",
            "cursor-pointer",
            "transition-all",
            "hover:brightness-90"
          )}
        />
      </SkeletonTheme>
    </div>
  );
};

export default MySkeleton;
