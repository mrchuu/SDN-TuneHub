import {
  ArtistRepository,
  TransactionRepository,
  SongStreamRepository,
} from "../repository/index.js";
const findByName = async (req, res) => {
  try {
    const decodedToken = req.decodedToken;
    const artist = await ArtistRepository.findArtistByUserId(
      decodedToken.userId
    );
    if (!artist) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const searchInput = req.body.artistName;
    const result = await ArtistRepository.findArtistByName({
      searchInput: searchInput,
      artistId: artist._id,
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getRisingArtist = async (req, res) => {
  try {
    const artists = await ArtistRepository.getRisingArtist();
    return res.status(200).json({ data: artists });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchArtistByName = async (req, res) => {
  try {
    const artists = await ArtistRepository.searchArtistByName(
      req.params.nameKey
    );
    return res.status(200).json({ data: artists });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllHotArtist = async (req, res) => {
  try {
    const artists = await ArtistRepository.hotArtist();
    res.status(200).json({ data: artists });
  } catch (error) {
    getAllSongsByLastest.res.status(500).json({
      message: error.toString(),
    });
  }
};
const getArtistInfo = async (req, res) => {
  try {
    const artisId = req.params.artistId;
    if (!artisId) {
      return res.status(400).json({ error: "Bad request" });
    }
    const artist = await ArtistRepository.findByArtistId(artisId);
    if (!artist) {
      return res.status(404).json({ error: "Not found" });
    }
    const { followers, ...filteredArtist } = artist;

    filteredArtist.followersCount = artist.followers.length;
    return res.status(200).json({ data: filteredArtist });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getStatistic = async (req, res) => {
  try {
    const decodedToken = req.decodedToken;
    const artist = await ArtistRepository.findArtistByUserId(
      decodedToken.userId
    );
    if (!artist) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const span = req.params.span;
    const sale = await TransactionRepository.getSaleOfArtist(artist._id, span);
    const songStream = await SongStreamRepository.getArtistSongStream(
      artist._id,
      span
    );
    console.log(songStream);
    return res.status(200).json({
      data: {
        sale: sale,
        followers: 10000,
        streamTime: songStream[0]?.total || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getSongStreamOrRevenueTrend = async (req, res) => {
  try {
    const decodedToken = req.decodedToken;
    const artist = await ArtistRepository.findArtistByUserId(
      decodedToken.userId
    );
    if (!artist) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const span = req.query.span || "weekly";
    const type = req.query.type || "revenue";
    let result = [];
    if(type === "revenue"){
      result = await TransactionRepository.getRevenueTrend(
        artist,
        span
      );
    }else{
      result = await SongStreamRepository.getArtistSongStreamTrend(
        artist,
        span
      )
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default {
  findByName,
  searchArtistByName,
  getRisingArtist,
  getAllHotArtist,
  getArtistInfo,
  getStatistic,
  getSongStreamOrRevenueTrend
};
