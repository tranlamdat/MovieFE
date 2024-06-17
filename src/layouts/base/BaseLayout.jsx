import BaseFooter from "./footer/BaseFooter";
import BaseHeader from "./header/BaseHeader";

const BaseLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <BaseHeader />
      {children}
      <BaseFooter />
    </div>
  );
};

export default BaseLayout;
