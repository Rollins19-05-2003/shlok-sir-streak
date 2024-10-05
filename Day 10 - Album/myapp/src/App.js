import React, { useEffect, useState } from 'react';

function App() {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);  // Page state
  const albumsPerPage = 10;  // Albums per page

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        const uniqueAlbums = [...new Set(data.map((photo) => photo.albumId))];
        setAlbums(uniqueAlbums);
        setLoading(false);  // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle album card click
  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
  };

  // Calculate the albums to display for the current page
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < Math.ceil(albums.length / albumsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Check if loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Albums (Page {currentPage})</h1>

      {/* Album Cards in Flex Layout */}
      <div className="album-list" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {currentAlbums.map((albumId) => (
          <div
            key={albumId}
            className="album-card"
            onClick={() => handleAlbumClick(albumId)}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '120px',
              height: '100px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3>Album {albumId}</h3>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 15px'}}><b>Page {currentPage} of {Math.ceil(albums.length / albumsPerPage)}</b></span>
        <button onClick={goToNextPage} disabled={currentPage === Math.ceil(albums.length / albumsPerPage)}>
          Next
        </button>
      </div>

      {/* Photos Grid for Selected Album */}
      {selectedAlbum && (
        <div style={{ marginTop: '20px' }}>
          <h2>Photos in Album {selectedAlbum}</h2>

          <div className="photo-grid" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            justifyContent: 'center'
          }}>
            {photos
              .filter((photo) => photo.albumId === selectedAlbum)
              .map((photo) => {
                return (
                  <div key={photo.id} className="photo-card" style={{
                    width: '150px',
                    textAlign: 'center',
                    border: '1px solid #ddd',
                    padding: '10px',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        marginBottom: '10px',
                        borderRadius: '5px'
                      }}
                    />
                    <p style={{ fontSize: '12px', color: '#555' }}>{photo.title}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
