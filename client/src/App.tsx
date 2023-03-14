import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";

import { Create, Error, Home } from "./pages";
import {
  setLoader,
  setPaginatedData,
  setStoreData,
} from "./redux/features/post/postSlice";
import { useAppDispatch } from "./redux/hooks";
import { BASE_URL } from "./utils/conversions";
import { AppProps } from "./utils/interface";
import { paginate } from "./utils/pagination";

const App = () => {
  const dispatch = useAppDispatch();

  const fetchUsers = async (): Promise<void> => {
    try {
      dispatch(setLoader(true));
      await axios
        .get(`${BASE_URL}/posts`)
        .then(function (response: AppProps) {
          let data = response.data;
          dispatch(setStoreData(data));
          let newData = paginate(data);
          dispatch(setPaginatedData(newData));
          dispatch(setLoader(false));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Create />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
