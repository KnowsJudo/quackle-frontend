import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../helpers/api-url";
import { Alert, Button, Loader, Modal, TextInput } from "@mantine/core";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./search-users.css";
import { debounce } from "../../helpers/debounce";

interface ISearch {
  compact: boolean;
}

export const SearchUsers: React.FC<ISearch> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<IUserPreview[]>([]);
  const params = useParams();

  useEffect(() => {
    setModal(false);
  }, [params]);

  const displayUsers = useMemo(
    () =>
      debounce(async (nextUser: string) => {
        setSearchError(false);
        setSelectData([]);
        if (nextUser.length < 3 || nextUser.length > 15) {
          return;
        }
        if (!selectData.length) {
          setLoading(true);
        }
        try {
          const data = await axios.get(`${apiUrl}/search/${nextUser}`);
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
          setSearchError(true);
          setLoading(false);
          console.log(error);
        }
      }, 200),
    [],
  );

  useEffect(() => {
    displayUsers(search);
  }, [search]);

  return props.compact ? (
    <div className="search-container-compact">
      <Button
        variant="subtle"
        color="dark"
        size="xs"
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
        styles={{ body: { display: "flex", flexDirection: "column" } }}
        withCloseButton={false}
      >
        <span className="menu-search">
          <SearchIcon style={{ fontSize: "30px", marginRight: "15px" }} />
          <TextInput
            placeholder="Search Users"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            style={{ flex: "1 1 auto", marginRight: "5px" }}
          />
        </span>
        {searchError ? (
          <Alert color="gray">No users found</Alert>
        ) : loading ? (
          <Loader color="cyan" style={{ margin: "3% auto" }} />
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
        <SearchIcon fontSize="large" style={{ marginRight: "5px" }} />
        <TextInput
          placeholder="Search Users"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          style={{ flex: "1 1 auto" }}
        />
      </span>
      {searchError ? (
        <Alert color="gray">No users found</Alert>
      ) : loading ? (
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
