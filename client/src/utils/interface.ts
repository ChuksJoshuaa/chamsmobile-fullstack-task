export interface PostProps {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IIProps {
  isLoading: boolean;
  storeData: PostProps[];
  paginateData: PostProps[];
  page: number;
  errors: string;
}

export interface AppProps {
  data: PostProps[];
}

export interface TableProps {
  getData: PostProps[] | [];
  setGetData: React.SetStateAction<PostProps[] | any>;
  searchData: PostProps[] | [];
  setSearchData: React.SetStateAction<PostProps[] | any>;
}

declare module "react" {
  interface HTMLProps<T> {
    size?: string;
    type?: string;
  }
}
