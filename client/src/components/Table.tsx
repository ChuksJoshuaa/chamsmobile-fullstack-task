import axios from "axios";
import { useEffect, useState } from "react";
import { BsBookmarks } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  setLoader,
  setPage,
  setPaginatedData,
  setStoreData,
  setErrors,
} from "../redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { BASE_URL } from "../utils/conversions";
import { IIProps, PostProps, TableProps } from "../utils/interface";
import { paginate } from "../utils/pagination";

const Table = () => {
  const { paginateData, isLoading, page, storeData, errors } = useAppSelector(
    (state): IIProps => state.post
  );
  const [getData, setGetData] = useState([] as TableProps["getData"]);
  const [searchData, setSearchData] = useState([] as TableProps["searchData"]);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) return;
    setGetData(paginateData[page] as TableProps["setGetData"]);
    setSearchData(storeData as TableProps["setGetData"]);
  }, [isLoading, page]);

  const handleChange = () => {
    if (!value) {
      dispatch(setErrors(""));
      dispatch(setPage(0));
      setGetData(paginate(searchData)[0]);
    } else {
      let searchResult = new RegExp(`${value}`, "gi");
      const newSearchData = searchData.filter((item: PostProps) =>
        item.title.match(searchResult)
      );
      setGetData(newSearchData);
      if (newSearchData?.length === 0) {
        dispatch(setErrors("No post matched the search input"));
      } else {
        dispatch(setErrors(""));
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`).then(() => {
        const items = [...storeData];
        const filteredItems = items.filter((item: PostProps) => item.id !== id);

        setSearchData(filteredItems);
        dispatch(setStoreData(filteredItems));

        const pagination = paginate(filteredItems);
        dispatch(setPaginatedData(pagination));

        if (getData?.length === 1) {
          setGetData(pagination[0]);
          dispatch(setPage(0));
        } else {
          setGetData(pagination[page]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="input-group mb-3" style={{ width: "300px" }}>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search title"
          onKeyUp={handleChange}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="text-center text-danger fs-6 fw-medium">{errors}</div>
      {getData?.length === 0 ? null : (
        <>
          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="text-nowrap text-center">
                      <span className="table-title text-capitalize  fs-4 fw-semibold text-primary">
                        #
                      </span>
                    </th>
                    <th scope="col" className="text-nowrap text-center">
                      <span className="table-title text-capitalize  fs-4 fw-semibold mt-1">
                        title
                      </span>
                      <span> </span>
                      <span>
                        <BsBookmarks className="fs-5" />
                      </span>
                    </th>
                    <th scope="col" className="text-nowrap text-center">
                      <span className="table-title text-capitalize  fs-4 fw-semibold">
                        description
                      </span>
                      <span> </span>
                      <span>
                        <MdLibraryBooks className="fs-5" />
                      </span>
                    </th>
                    <th scope="col" className="text-nowrap">
                      <span className="table-title"></span>
                    </th>
                    <th scope="col" className="text-nowrap">
                      <span className="table-title"></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getData?.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center text-primary">{index + 1}</td>
                      <td className="text-center">{item.title}</td>
                      <td className="text-center">{item.description}</td>
                      <td className="text-center">
                        <Link to={`/update/${item.id}`}>
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => dispatch(setLoader(true))}
                          >
                            <FaEdit />
                          </button>
                        </Link>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
