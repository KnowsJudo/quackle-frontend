import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../helpers/api-url";
import {
  Alert,
  Button,
  Loader,
  LoadingOverlay,
  Modal,
  TextInput,
} from "@mantine/core";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./search-users.css";

interface ISearch {
  compact: boolean;
}

export const SearchUsers: React.FC<ISearch> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<IUserPreview[]>([]);
  const params = useParams();

  useEffect(() => {
    setSearchError(false);
    setUserError(false);
  }, [search, selectData]);

  useEffect(() => {
    setModal(false);
  }, [params]);

  const searchUsers = async () => {
    if (search.length < 3) {
      setSearchError(true);
      return;
    }
    setSelectData([]);
    setLoading(true);
    try {
      const data = await axios.get(`${apiUrl}/search/${search}`);
      const user = data.data;
      const singleUser: IUserPreview = {
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        tagline: user.tagline,
        matchesUser: user.username === userData.username,
      };
      setSelectData([singleUser]);
      setLoading(false);
    } catch (error) {
      setUserError(true);
      console.error(error);
      setLoading(false);
    }
  };

  return props.compact ? (
    <div className="search-container-compact">
      <Button
        variant="subtle"
        color="dark"
        style={{ padding: "0 10px" }}
        onClick={() => setModal(true)}
      >
        <SearchIcon sx={{ color: "white", fontSize: "30px" }} />
      </Button>
      <Modal
        size={"90vw"}
        opened={modal}
        onClick={(e) => e.stopPropagation()}
        onClose={() => {
          setModal(false);
        }}
        withCloseButton={false}
      >
        <span className="menu-search">
          <TextInput
            placeholder="Search Quackle Users"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            style={{ flex: "1 1 auto" }}
          />
          <Button
            variant="subtle"
            color="dark"
            onClick={() => searchUsers()}
            style={{ marginLeft: "auto", padding: "5px" }}
          >
            <SearchIcon sx={{ fontSize: "30px" }} />
          </Button>
        </span>
        {userError && <Alert color="gray">No users found</Alert>}
        {searchError && <Alert color="red">Enter at least 3 characters</Alert>}
        {loading ? (
          <LoadingOverlay
            visible={loading}
            overlayBlur={3}
            overlayOpacity={0.05}
            loaderProps={{ color: "cyan" }}
          />
        ) : (
          selectData.map((next) => {
            return (
              <UserPreview
                key={next._id}
                avatar={next.avatar}
                name={next.name}
                username={next.username}
                tagline={next.tagline}
                matchesUser={next.matchesUser}
              />
            );
          })
        )}
      </Modal>
    </div>
  ) : (
    <div className="search-container">
      <span className="profile-search">
        <TextInput
          placeholder="Search Quackle Users"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          style={{ flex: "1 1 auto" }}
        />
        <Button
          variant="subtle"
          color="dark"
          onClick={() => searchUsers()}
          style={{ marginLeft: "auto" }}
        >
          <SearchIcon fontSize="large" />
        </Button>
      </span>
      {userError && <Alert color="gray">No users found</Alert>}
      {searchError && <Alert color="red">Enter at least 3 characters</Alert>}
      {loading ? (
        <Loader color="cyan" sx={{ margin: "15px auto" }} />
      ) : (
        selectData.map((next) => {
          return (
            <UserPreview
              key={next._id}
              avatar={next.avatar}
              name={next.name}
              username={next.username}
              tagline={next.tagline}
              matchesUser={next.matchesUser}
            />
          );
        })
      )}
    </div>
  );
};
