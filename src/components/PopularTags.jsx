import React, { useEffect, useState } from "react";
import "./../assets/css/popularTags.css";
import { connect } from "react-redux";
import { getTag } from "./../store/actions";

const PopularTags = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [tags, setTags] = useState();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await props.getTag();
    console.log(data);
    if (data) {
      setTags(data.payload.tags);
      setRefresh(!refresh);
    }
  };
  return (
    <div className="right-sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags &&
          tags.map((tags) => {
            console.log(tags);
            return <button className="tag">{tags}</button>;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tag: state.tag,
  };
};

export default connect(mapStateToProps, { getTag })(PopularTags);
