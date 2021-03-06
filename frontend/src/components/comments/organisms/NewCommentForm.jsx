import React, { useEffect, useState } from "react";
import Api from "../../../api/Api";
import { useNotification } from "../../notifications/NotificationProvider";
import { format } from "date-fns";

export default function NewCommentForm({ onSubmit, post }) {
  const [user, setUser] = useState("");
  const [body, setBody] = useState("");

  //Notification Creator
  const dispatch = useNotification();
  const handlePostNotification = () => {
    dispatch({
      type: "SUCCESS",
      message: "Posting your comment!",
    });
  };

  useEffect(() => {
    Api.get("/user/me").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  // Something still happing here?
  return (
    <div className="comment-area">
      <textarea
        placeholder="type your comment here.."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

     

      <button
        className="medium-button"
        onClick={() => {
          onSubmit({
            body,
            user,
            post,
            date: format(new Date(), "dd-MM-yyyy"),
          });
          setBody("");
        }}
      >
        Comment
      </button>
    </div>
  );
}
