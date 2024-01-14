import { Updater } from "spotify-oauth-simple";
const spotifyApi = new Updater({ clientId: "a6e6cb06b54240a096bd059164dfa062", clientSecret: "a03741473e0f4672affb69441a7d4d41" });
spotifyApi.setAccessToken("existing-token");

const getTrack = async function(song) {
  try {
    const response = await spotifyApi.request({
      url: 'https://api.spotify.com/v1/search?q=track:' + encodeURIComponent(song) + '&type=track',
      authType: "bearer",
    });

    // Extract tracks from the response
    const tracks = response.data.tracks.items;

    // Organize each song by artist
    const organizedData = tracks.map(track => {
      const artists = track.artists.map(artist => artist.name).join(', ');
      const albumName = track.album.name;
      const spotifyLink = track.external_urls.spotify;
      const explicit = track.explicit;
      const imageLink = track.album.images.length > 0 ? track.album.images[0].url : null;

      return {
        artists,
        albumName,
        spotifyLink,
        explicit,
        imageLink,
      };
    });

    // Display the organized data
    console.log(organizedData);
  } catch (error) {
    console.error("Error fetching track:", error);
  }
};

