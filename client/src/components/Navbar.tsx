import { Link } from "react-router-dom";
import {
  setErrors,
  setLoader,
  setPage,
} from "../redux/features/post/postSlice";
import { useAppDispatch } from "../redux/hooks";
import { imageLogo } from "../utils/imageLogo";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const items = 0;
  return (
    <nav className="bg-light p-0">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div
            onClick={() => {
              dispatch(setLoader(true));
              dispatch(setErrors(""));
              dispatch(setPage(items));
            }}
          >
            <Link
              to="/"
              className="d-flex justify-content-start py-2 align-items-center text-decoration-none text-secondary"
              style={{ fontFamily: "Lobster Two" }}
            >
              <img
                src={imageLogo}
                alt="chamsmobile-logo"
                height={60}
                width={60}
                className="rounded"
              />
              <h3 className="px-2 fs-2 fw-medium text-success">Chamsmobile</h3>
            </Link>
          </div>

          <div>
            <Link to="/create" onClick={() => dispatch(setErrors(""))}>
              <button className="btn btn-outline-success btn-md mb-2">
                Create Post
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
