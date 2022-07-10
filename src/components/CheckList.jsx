const style = {
  display: 'inline-block',
  width: '100px',
};

export const CheckList = ({ prefectures, onChange }) => {
  return (
    <div>
      {prefectures.map((post) => (
        <li style={style} key={post.prefCode}>
          <input type="checkbox" name={post.prefName} onChange={onChange} id={post.prefCode}></input>
          {post.prefName}
        </li>
      ))}
    </div>
  );
};
