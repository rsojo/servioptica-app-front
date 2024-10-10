import React from "react";

interface BackgroundVideoProps {
  videoUrl: string;
  poster?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoUrl,
  poster,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        controls={false}
        poster={poster ?? ''}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
