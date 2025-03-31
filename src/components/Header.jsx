import Container from "./Container";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Container>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold">
          <Link to="/">Event Connect</Link>
        </h1>
      </div>
    </Container>
  );
};

export default Header;
