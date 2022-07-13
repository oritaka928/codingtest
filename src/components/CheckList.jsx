const style = {
  display: 'inline-block',
  width: '100px',
};

export const CheckList = ({ prefectures, onChange }) => {
  return (
    <div>
      {prefectures.map((post) => (
        <li style={style} key={post.prefCode}>
          <input
            type="checkbox"
            name={post.prefName}
            onChange={(event) => onChange(post.prefName, post.prefCode, event.target.checked)}
            id={post.prefCode}
          ></input>
          {post.prefName}
        </li>
      ))}
    </div>
  );
};
