const db = require("../psql");

class Songs {
  //song related going here
  async displaySongs() {
    const songs = await db.query("select * from songartistalbumview");
    return songs;
  }
  async displayAlbums() {
    const albums = await db.query(
      "select albumname,albumcover,description from albumdimension"
    );
    for (let i = 0; i < albums.rowCount; i++) {
      const songs = await db.query(
        `select songname,artistname,songloc from artistsongdimension natural join artistdimension natural join songdimension natural join albumdimension where albumname='${albums.rows[i].albumname}'`
      );
      albums.rows[i].songs = songs.rows;
    }
    return albums;
  }
  async displayArtists() {
    const artists = await db.query(
      "select artistname,artistprofile from artistdimension"
    );
    for (let i = 0; i < artists.rowCount; i++) {
      const songs = await db.query(
        ` select songname,songloc,albumcover from artistsongdimension natural join artistdimension natural join songdimension natural join albumdimension where artistname='${artists.rows[i].artistname}'`
      );
      artists.rows[i].songs = songs.rows;
    }
    return artists;
  }
}

module.exports = Songs;
