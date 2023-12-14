const db = require("../psql");
const uid = require("uid/secure").uid;
class PopulateDB {
  async addArtist(req) {
    const result = await db.query(
      `select * from artistdimension where artistname = '${req.artistName}'`
    );
    if (result.rowCount === 0) {
      const result = await db.query(
        `insert into artistdimension(artistid,artistname,artistprofile) values($1,$2,$3) RETURNING *`,
        [uid(16), req.artistName, req.artistProfile]
      );
      return result;
    }
    return result;
  }
  async addAlbum(req) {
    const result = await db.query(
      `select * from albumdimension where albumname = '${req.albumName}'`
    );
    if (result.rowCount === 0) {
      console.log(result);
      let res = await this.addArtist({ artistName: req.artistName });
      const artistId = res.rows[0].artistid;
      console.log(artistId);
      const result_1 = await db.query(
        `insert into albumdimension(albumid,albumname,description,artistid,albumcover) values($1,$2,$3,$4,$5) RETURNING *`,
        [uid(16), req.albumName, req.description, artistId, req.albumCover]
      );
      return result_1;
    }
    return result;
  }

  async addGenre(req) {
    // return {1:req.genre}
    const result = await db.query(
      "select * from genredimension where genrename = $1",[req.genre]
    );
    // return result
    if (result.rowCount === 0) {
      // console.log(result);
      const result_1 = await db.query(
        "insert into genredimension(genreid,genrename) values($1,$2) RETURNING *",
        [uid(16), req.genre]
      );
      return result_1;
    }
    // return result;
  }

  async addSong(req) {
    // return {1:req.artistName}
    const artist_res = await db.query(
      "select * from artistdimension where artistname = $1",
      [req.artistName]
    );
    if (artist_res.rowCount === 0) {
      return {
        status: 404,
        detail: artist_res,
      };
    }
    const album_res = await db.query(
      "select * from albumdimension where albumname = $1",
      [req.albumName]
    );
    if (album_res.rowCount === 0) {
      return {
        status: 404,
        detail: album_res,
      };
    }
    const genre_res = await db.query(
      "select * from genredimension where genrename = $1",
      [req.genre]
    );
    if (genre_res.rowCount === 0) {
      return {
        status: 404,
        detail: genre_res,
      };
    }

    const albumId = album_res.rows[0].albumid;
    const artistId = artist_res.rows[0].artistid;
    const genreId = genre_res.rows[0].genreid;
    const songId = uid(16);
    const song_res = db.query(
      `insert into songdimension(songid,songname,songloc,albumid) values($1,$2,$3,$4) RETURNING *`,
      [songId, req.songName, req.songLoc, albumId]
    );
    const artist_song_res = db.query(
      "insert into artistsongdimension(songid,artistid) values($1,$2) RETURNING *",
      [songId, artistId]
    );

    const genre_song_res = db.query(
      'insert into songgenredimension(songid,genreid) values($1,$2) RETURNING *',
      [songId,genreId]
    );

    return genre_song_res;
    // if(artist_res.rowCount===0){
    //   let artist_result = await this.addArtist({ artistName: req.artistName });
    //   artistId = res.rows[0].artistId;
    // }
    // // const album_res = await db.query(`select * from albumdimension where albumname = '${req.albumName}'`);
    // if(album_res.rowCount===0){
    //   let album_result = await this.addAlbum({})
    // }
    // // const artistId = res.rows[0].artistId;
  }
}

module.exports = PopulateDB;
