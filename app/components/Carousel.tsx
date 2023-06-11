"use client";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Cell from "./Cell";
import CarouselNavigation from "../components/CarouselNavigation";

export default function Carousel({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      perView: "auto",
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className={className}>
      <div className="navigation-wrapper">
        <div
          ref={sliderRef}
          className="keen-slider  [&>*:nth-child(3n)]:bg-primary-800 [&>*:nth-child(3n)]:text-primary-100 [&>*:nth-child(3n+1)]:bg-primary-300 [&>*:nth-child(3n+2)]:bg-primary-50"
        >
          {children}
        </div>
      </div>
      {loaded && instanceRef.current && (
        <CarouselNavigation>
          <div className="flex flex-row items-center justify-between">
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled
          />
          <div className="flex items-center justify-between">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={" w-2 h-2 m-2 rounded " + (currentSlide === idx ? " bg-primary-50" : " bg-primary-500")}
                ></button>
              );
            })}
          </div>
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled
          />
          </div>
        </CarouselNavigation>
      )}
    </div>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`cursor-pointer ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
    >
      {props.left && (
        <path
          d="M18.6667 9.33329L12 16L18.6667 22.6666"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      )}
      {!props.left && (
        <path
          d="M13.3333 22.6667L20 16L13.3333 9.33337"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      )}
    </svg>
  );
}
