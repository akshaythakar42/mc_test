import "./App.css";

function PhotoItem(props) {
  return (
    <div className="card d-flex">
      <div>
        <img src={props?.photo?.thumbnailUrl} alt="" />
      </div>
      <div className="card-body">
        <div>{ "Album Owner : "+props?.user?.name}</div>
        <div>{"Email : "+props?.user?.email}</div>
        <div>{"Website : "+props?.user?.website}</div>
        <button>View Album</button>
      </div>
    </div>
  );
}
export default PhotoItem;
