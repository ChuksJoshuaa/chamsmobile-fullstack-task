import { useEffect } from "react";
import { Loader, Table } from "../components";
import Pagination from "../components/Pagination";
import { setErrors, setLoader } from "../redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IIProps } from "../utils/interface";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, storeData } = useAppSelector(
    (state): IIProps => state.post
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 500);

    if (storeData.length === 0) {
      dispatch(setErrors(""));
    }
  });

  return (
    <div className="container mt-5 cover-container">
      <h3
        className="py-4 fs-3 fw-semibold"
        style={{ fontFamily: "Lobster Two" }}
      >
        Top Recent Posts
      </h3>

      {isLoading ? (
        <div className="mt-3">
          <Loader />
        </div>
      ) : storeData.length === 0 ? (
        <div className="text-center text-danger fs-6 fw-medium">
          No post available, create one
        </div>
      ) : (
        <>
          <Table />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Home;
