import mongoose from 'mongoose';
import axios from 'axios';
import { Track } from './trackModel.js'; // Adjust the path as necessary
import { fetchAppAccessToken } from '../controllers/apiCallsController.js';

const artists = [
    'Adele', 'Beyoncé', 'Drake', 'Ed Sheeran', 'Taylor Swift', 'The Weeknd', 'Billie Eilish', 'Bruno Mars', 'Kanye West', 'Rihanna',
    'Justin Bieber', 'Ariana Grande', 'Post Malone', 'Shawn Mendes', 'Dua Lipa', 'Harry Styles', 'Katy Perry', 'Lady Gaga', 'Maroon 5', 'Sam Smith',
    'Selena Gomez', 'Travis Scott', 'Cardi B', 'Khalid', 'Halsey', 'Imagine Dragons', 'Lizzo', 'Camila Cabello', 'Lil Nas X', 'Miley Cyrus',
    'Nicki Minaj', 'Sia', 'Zayn', 'Lana Del Rey', 'Doja Cat', 'J Balvin', 'Bad Bunny', 'Rosalía', 'Shakira', 'Maluma',
    'Ozuna', 'Daddy Yankee', 'Anuel AA', 'Karol G', 'Becky G', 'Natti Natasha', 'Luis Fonsi', 'Enrique Iglesias', 'Pitbull', 'J. Cole',
    'Kendrick Lamar', 'Lil Wayne', 'Future', '21 Savage', 'Meek Mill', 'Young Thug', 'Trippie Redd', 'Juice WRLD', 'Lil Uzi Vert', 'DaBaby',
    'Roddy Ricch', 'Lil Baby', 'Gunna', 'Pop Smoke', 'NAV', 'Tyga', 'Offset', 'Quavo', 'Takeoff', 'Lil Yachty',
    'Playboi Carti', 'Travis Barker', 'Machine Gun Kelly', 'Yungblud', 'Blackbear', 'Bazzi', 'Bryson Tiller', 'Frank Ocean', 'The Chainsmokers', 'Marshmello',
    'Zedd', 'Kygo', 'Calvin Harris', 'David Guetta', 'Martin Garrix', 'Avicii', 'Deadmau5', 'Skrillex', 'Diplo', 'Major Lazer',
    'DJ Snake', 'Tiesto', 'Armin van Buuren', 'Afrojack', 'Steve Aoki', 'Hardwell', 'Kaskade', 'Porter Robinson', 'Madeon', 'Illenium',
    'Seven Lions', 'Gryffin', 'San Holo', 'RL Grime', 'Flume', 'Louis The Child', 'NGHTMRE', 'Said The Sky', 'Ekali', 'Jai Wolf',
    'What So Not', 'REZZ', 'ZHU', 'Getter', 'JOYRYDE', 'Kayzo', 'Jauz', 'Slushii', 'Boombox Cartel', 'Crankdat',
    'Whethan', 'Medasin', 'Pluko', 'Manila Killa', 'Hotel Garuda', 'Autograf', 'Big Wild', 'Kasbo', 'Petit Biscuit', 'Shallou',
    'Yotto', 'Lane 8', 'Ben Böhmer', 'Anjunadeep', 'ODESZA', 'RÜFÜS DU SOL', 'Bob Moses', 'Gorgon City', 'CamelPhat', 'Fisher',
    'Chris Lake', 'Green Velvet', 'Carl Cox', 'Richie Hawtin', 'Adam Beyer', 'Charlotte de Witte', 'Amelie Lens', 'Nina Kraviz', 'Peggy Gou', 'Sven Väth',
    'Paul Kalkbrenner', 'Jamie Jones', 'Marco Carola', 'Joseph Capriati', 'Luciano', 'Ricardo Villalobos', 'Paco Osuna', 'Hot Since 82', 'Patrick Topping',
    'Omer Adam', 'Eden Ben Zaken', 'Static and Ben El', 'Noa Kirel', 'Ivri Lider', 'Eyal Golan', 'Sarit Hadad', 'Moshe Peretz', 'Shiri Maimon', 'Harel Skaat',
    'Ninet Tayeb', 'Yehuda Poliker', 'Shlomi Shabat', 'Keren Peles', 'Idan Raichel', 'Miri Mesika', 'Rita', 'Boaz Sharabi', 'Yishai Ribo', 'Hanan Ben Ari',
    'Aviv Geffen', 'Shalom Hanoch', 'Arik Einstein', 'Berry Sakharof', 'Ehud Banai', 'Yehudit Ravitz', 'Gidi Gov', 'Mashina', 'Teapacks', 'Hadag Nahash',
    'Kaveret', 'Ethnix', 'Eifo HaYeled', 'Shlomo Artzi', 'Yoni Rechter', 'Matt Caseli', 'Jane Bordeaux', 'Tuna', 'Avraham Tal', 'Hatikva 6', 
    'Cafe Shahor Hazak', 'Red Band', 'The Angelcy', 'A-WA', 'Tomer Yosef', 'Geva Alon', 'Eliad', 'Noga Erez', 'Lola Marsh'
];

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
let SPOTIFY_ACCESS_TOKEN = '';

const updateAccessToken = async () => {
    SPOTIFY_ACCESS_TOKEN = await fetchAppAccessToken();
};

await updateAccessToken();
async function fetchTracksByArtist(artist) {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
            headers: {
                Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`
            },
            params: {
                q: artist,
                type: 'track',
                limit: 40
            }
        });

        return response.data.tracks.items;
    } catch (error) {
        console.error(`Error fetching tracks for artist ${artist}:`, error);
        return [];
    }
}

async function populateDb() {
    await mongoose.connect('mongodb://localhost:27017/spotify-clone', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    for (const artist of artists) {
        const tracks = await fetchTracksByArtist(artist);

        for (const track of tracks) {
            const trackData = {
                spotifyTrackId: track.id,
                name: track.name,
                artist: track.artists.map(artist => artist.name).join(', '),
                album: track.album.name,
                albumCoverUrl: track.album.images[0]?.url || '',
                durationMs: track.duration_ms
            };

            try {
                await Track.create(trackData);
                console.log(`Added track ${track.name} by ${trackData.artist} to the database.`);
            } catch (error) {
                console.error(`Error adding track ${track.name} to the database:`, error);
            }
        }
    }

    mongoose.connection.close();
}

populateDb().catch(error => {
    console.error('Error populating the database:', error);
    mongoose.connection.close();
});