import React, { useState, useEffect } from "react";
import ErrorScreen from "../../tempscreens/ErrorScreen";
import SkillPost from "../organisms/SkillPost";
import GiveawayPost from "../organisms/GiveawayPost";
import MonetarySupport from '../../funding/MonetarySupport'
import MonetarySupportPost from "../organisms/MoneterySupportPost";
import Api from "../../../api/Api";
import { useHistory } from "react-router-dom";
import ChatApi from "../../../api/ChatApi";

function SinglePost({ id, setPosts, user, posts }) {
  
  const history = useHistory();
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchPost = async () => {
      const response = await Api.get(`/posts/${id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [id, posts]);

  const threadHandler = () => {
    const createOrDirect = async () => {
      
      try {
        const response = await ChatApi.createThread(post.user, {
          title: post.title,
        });
        const thread = response.data;
       
        history.push({ pathname: `/chat/${thread.id}`, state: { thread } });
      } catch (e) {
        console.log(e);
      }
    };
    createOrDirect();
  };

  //getPost() function reads post variable passed as props and checks its category.
  //Depending on the category of the passed post a component relevant to that category is called.
  //This process is handled by the switch statement below.
  const getPost = () => {
    switch (post.category) {
      case "skills":
        return (
          <SkillPost
            post={post}
            setPosts={setPosts}
            user={user}
            posts={posts}
            threadHandler={threadHandler}
          />
        );
      case "giveaways":
        return (
          <GiveawayPost
            post={post}
            setPosts={setPosts}
            user={user}
            posts={posts}
            threadHandler={threadHandler}
          />
        );
      case "monetary-support":
        return (
          <MonetarySupportPost
            post={post}
            setPosts={setPosts}
            user={user}
            posts={posts}
            threadHandler={threadHandler}
          />
        );
      default:
        return null;
    }
  };

  try {
    return (
      //Otherwise details of the post passed as props are displayed(managed by getPost() function above)
      //followed by comments to that post.
      <div className="post-wrapper">
        {getPost()}
        
      </div>
    );
  } catch (e) {
    console.log(e);
    return <ErrorScreen />;
  }
}
export default SinglePost;
