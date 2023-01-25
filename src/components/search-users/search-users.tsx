import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../helpers/api-url";
import { Alert, Button, Input, Menu } from "@mantine/core";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import SearchIcon from "@mui/icons-material/Search";
import "./search-users.css";

interface ISearch {
  compact: boolean;
}

export const SearchUsers: React.FC<ISearch> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [search, setSearch] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [selectData, setSelectData] = useState<IUserPreview[]>([]);

  useEffect(() => {
    setSearchError(false);
  }, [selectData]);

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
      <Menu>
        <Menu.Target>
          <Button variant="subtle" color="dark" style={{ padding: "0 10px" }}>
            <SearchIcon sx={{ color: "white", fontSize: "30px" }} />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item closeMenuOnClick={false}>
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
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
