import { setErrors, setPage } from "../redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IIProps, PostProps } from "../utils/interface";

const Pagination = () => {
  const { paginateData, page } = useAppSelector((state): IIProps => state.post);
  const dispatch = useAppDispatch();

  const nextPage = () => {
    let nextPage = page + 1;
    if (nextPage > paginateData.length - 1) {
      nextPage = 0;
    }
    return nextPage;
  };

  const next = nextPage();

  const prevPage = () => {
    let prevPage = page - 1;
    if (prevPage < 0) {
      prevPage = paginateData.length - 1;
    }
    return prevPage;
  };

  const prev = prevPage();

  const handlePage = (index: number) => {
    dispatch(setPage(index));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      onClick={() => dispatch(setErrors(""))}
    >
      <div className="btn-container">
        <button className="prev-btn" onClick={() => dispatch(setPage(prev))}>
          prev
        </button>
        {paginateData.map((item: PostProps, index: number) => {
          return (
            <button
              key={index}
              className={`page-btn ${index === page ? "active-btn" : null}`}
              onClick={() => handlePage(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button className="next-btn" onClick={() => dispatch(setPage(next))}>
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
