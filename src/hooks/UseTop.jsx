import { useEffect } from "react";

const UseTop = () => {
  useEffect(() => {
    console.log("rtriggered");
    window.scrollTo(0, 0);
  }, []);
};

export default UseTop;
