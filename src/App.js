import "./App.css";
import PhotoItem from "./PhotoItem";
import { useState, useEffect } from "react";

function App() {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((data) => data.json())
      .then((res) => {
        setAlbums(res);
        setFilteredAlbums(res);
      });

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((res) => {
        setUsers(res);
      });

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((data) => data.json())
      .then((res) => {
        setPhotos(res);
      });
  }, []);

  useEffect(() => {
    if(selectedUserId){
      const filteredAlbums = albums.filter((u) => u.userId == selectedUserId)
      setFilteredAlbums(filteredAlbums);
    }else{
      setFilteredAlbums(albums);
    }
    
  }, [selectedUserId]);

  const setSelectedData = (e) => {
    setSelectedUserId(e.target.value);
  }

  return (
    <>
      <div className="form-group">
        <label>Filter Album</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedData(e)}
          className="form-control"
        >
          <option value="" disabled>
            {"Select User"}
          </option>
          {users.map((option) => {
            return (
              <option key={option.id} id={option.id} value={option.id} label={option?.name}>
                {option?.name}
              </option>
            );
          })}
        </select>
        <button onClick={(e) => setSelectedUserId("")}>Reset</button>
      </div>
      {filteredAlbums.map((alb) => {
        return (
          <PhotoItem
            photo={photos?.find((p) => p.albumId === alb.id)}
            data={alb}
            user={users?.find((u) => u.id === alb.userId)}
          />
        );
      })}
    </>
  );
}

export default App;
