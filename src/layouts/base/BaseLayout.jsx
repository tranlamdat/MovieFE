import BaseFooter from "./footer/BaseFooter";
import BaseHeader from "./header/BaseHeader";
import PropTypes from "prop-types";

const BaseLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <BaseHeader />
      {children}
      <BaseFooter />
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
