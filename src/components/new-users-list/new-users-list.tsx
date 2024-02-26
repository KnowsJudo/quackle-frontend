import React, { useContext } from "react";
import { Loader } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { UserPreview } from "../user-preview/user-preview";
import { IUserPreview } from "../../types/user-types";
import "./new-users-list.css";

interface INewUsersList {
  loading: boolean;
  newUserData: IUserPreview[];
}

export const NewUsersList: React.FC<INewUsersList> = (props) => {
  const { userData } = useContext(QuackleContext);

  return (
    <div className="new-users-container">
      <h6> Newest Users</h6>
      {props.loading ? (
        <Loader color="cyan" sx={{ margin: "7vh auto" }} />
      ) : (
        props.newUserData.map((next) => {
          return (
            <div key={next._id} className="new-user-stats">
              <UserPreview
                name={next.name}
                username={next.username}
                avatar={next.avatar}
                tagline={next.tagline}
                matchesUser={next.username === userData.username}
              />
            </div>
          );
        })
      )}
    </div>
  );
};
