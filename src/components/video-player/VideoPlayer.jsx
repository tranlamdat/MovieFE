import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import PropTypes from "prop-types";

const VideoPlayer = ({ url }) => {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: url,
        // provider: "youtube",
        type: "video/mp4",
      },
    ],
  };

  return (
    <>
      <Plyr source={videoSrc} />
    </>
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string,
};

export default VideoPlayer;
