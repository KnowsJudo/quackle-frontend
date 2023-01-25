import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../helpers/api-url";
import { Alert, Button, Input, Modal } from "@mantine/core";
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
  const [search, setSearch] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<IUserPreview[]>([]);
  const params = useParams();

  useEffect(() => {
    setSearchError(false);
  }, [selectData]);

  useEffect(() => {
    setModal(false);
  }, [params]);

  const searchUsers = async () => {
    if (search.length < 3) {
      setSearchError(true);
      return;
    }
    try {
      const data = await axios.get(`${apiUrl}/user/${search}`);
      const user = data.data;
      const singleUser: IUserPreview = {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        tagline: user.tagline,
        matchesUser: user.username === userData.username,
      };
      setSelectData([singleUser]);
    } catch (error) {
      setSearchError(true);
      console.error(error);
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
        centered
        size={"90vw"}
        opened={modal}
        onClick={(e) => e.stopPropagation()}
        onClose={() => {
          setModal(false);
        }}
        withCloseButton={false}
      >
        <span className="menu-search">
          <Input
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
            <SearchIcon sx={{ fontSize: "30px" }} />
          </Button>
        </span>
        {searchError ? (
          <Alert color="gray">No users found</Alert>
        ) : (
          selectData.map((next) => {
            return (
              <UserPreview
                key={next.id}
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
        <Input
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
      {searchError ? (
        <Alert color="gray">No users found</Alert>
      ) : (
        selectData.map((next) => {
          return (
            <UserPreview
              key={next.id}
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
