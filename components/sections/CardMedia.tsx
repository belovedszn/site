"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRive } from "@rive-app/react-canvas";
function RiveMedia({ src }: { src: string }) {
  const { RiveComponent } = useRive({ src, autoplay: true });
  return <RiveComponent />;
}
export function CardMedia({ src }: { src: string }) {
  return <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5" aria-hidden>
    {src.endsWith(".lottie") ? <DotLottieReact src={src} loop autoplay /> : <RiveMedia src={src} />}
  </div>;
}
