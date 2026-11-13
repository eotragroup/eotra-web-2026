import { useState } from 'react';
import {
  Shader,
  Swirl,
  ChromaFlow,
  FlutedGlass,
  FilmGrain,
} from 'shaders/react';

export function ShaderBackground() {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {unavailable ? (
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(4, 0, 245, 0.14), transparent 55%), radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.85), transparent 60%), linear-gradient(120deg, #ffffff 0%, #f0f0f0 50%, #efefef 100%)',
          }}
        />
      ) : (
        <Shader
          className="w-full h-full"
          onUnavailable={() => setUnavailable(true)}
        >
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#0400F5"
            leftColor="#0400F5"
            rightColor="#0400F5"
            upColor="#0400F5"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
      )}
    </div>
  );
}
