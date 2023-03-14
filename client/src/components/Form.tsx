import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  setLoader,
  setPaginatedData,
  setStoreData,
} from "../redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { BASE_URL } from "../utils/conversions";
import { PostProps } from "../utils/interface";
import { paginate } from "../utils/pagination";
import Loader from "./Loader";

const initialState = {
  title: "",
  description: "",
};

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const getId = Number(id);
  const { isLoading, storeData } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent) => {
    setFormData({
      ...formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const findData = () => {
    const findObject = storeData.find((item: PostProps) => item.id === getId);

    return findObject;
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 400);
  });

  useEffect(() => {
    if (id !== null && id !== undefined) {
      setFormData({
        title: findData()?.title as string,
        description: findData()?.description as string,
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      setErrors("This field is required");
      setTitleError(true);
      return;
    }

    if (formData.title) {
      setErrors("");
      setTitleError(false);
    }

    if (!formData.description) {
      setErrors("This field is required");
      setDescriptionError(true);
      return;
    }

    if (formData.description) {
      setErrors("");
      setDescriptionError(false);
    }

    try {
      setLoading(true);
      if (id !== null && id !== undefined) {
        await axios
          .put(`${BASE_URL}/posts/${getId}`, formData)
          .then(function () {
            const newItems = [...storeData];
            const findIndexValue = storeData.findIndex(
              (item: PostProps) => item.id === getId
            );
            newItems[findIndexValue] = {
              id: getId,
              title: formData.title as string,
              description: formData.description as string,
              createdAt: findData()?.createdAt as string,
              updatedAt: findData()?.updatedAt as string,
            };

            const newData = paginate(newItems);
            dispatch(setStoreData(newItems));
            dispatch(setPaginatedData(newData));
            setFormData({
              title: "",
              description: "",
            });
            navigate("/");
            dispatch(setLoader(true));
            setErrors("");
          });
      } else {
        await axios
          .post(`${BASE_URL}/posts`, formData)
          .then(function (response) {
            const newItems = [response.data, ...storeData];
            const newData = paginate(newItems);
            dispatch(setStoreData(newItems));
            dispatch(setPaginatedData(newData));
            setFormData({
              title: "",
              description: "",
            });
            navigate("/");
            dispatch(setLoader(true));
            setErrors("");
          });
      }
    } catch (error) {
      setLoading(false);
      setErrors("Something went wrong, try a different title");
      console.log(error);
    }
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-5 py-6">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="vh-100 mt-5 py-5 bg-white">
      <div
        className="single-form-container p-3"
        style={{ backgroundColor: "#fff" }}
      >
        <p className="text-danger text-center fw-bold fs-6 mb-2">{errors}</p>
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              style={{
                border: `${titleError ? "1px solid crimson" : ""}`,
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              style={{
                border: `${descriptionError ? "1px solid crimson" : ""}`,
              }}
            ></textarea>
          </div>

          <div className="pt-1 mb-4">
            <div className="d-flex">
              <button
                className={
                  id !== undefined ? "btn btn-secondary" : "btn btn-success"
                }
                type="button"
                onClick={handleSubmit}
                onKeyDown={handleEnterKeyPress}
              >
                {id !== undefined ? "Update" : "Submit"}
              </button>

              {loading && (
                <div className="px-3">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
