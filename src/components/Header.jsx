import Container from "./Container";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Container>
      <div className="flex justify-between items-center mt-4">
        <Link to="/" >
          <h1 className="lg:text-4xl text-2xl font-bold text-white px-7 py-1 font bg-[#5465ff]">
            <div>Event</div>
            <div>Connect</div>
          </h1>
        </Link>
      </div>
    </Container>
  );
};

export default Header;
