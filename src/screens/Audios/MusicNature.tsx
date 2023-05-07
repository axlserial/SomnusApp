import {ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {View, Text, LoaderScreen} from 'react-native-ui-lib';
import CardOpcion from './CardOption';
import {useState, useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

// Recibe un objeto de navegación
type MusicProps = {
	navigation: NavigationProp<any>;
};

const cancionesNature = [
	{
		id: 0,
		url: 'https://musicarelajante.me/wp-content/uploads/2016/11/Pajaros-Cantores-en-un-amanecer.mp3',
		title: 'Canto de aves',
		artist: 'Un canto muy reconfortante',
		artwork: require('../../assets/images/aves.jpg'),
	},
	{
		id: 1,
		url: 'http://radioteca.net/media/uploads/old_radioteca/audios/05100003.mp3',
		title: 'Devonshire Waltz Andante',
		artist: 'Como estar en un baile sin fin',
		artwork: require('../../assets/images/dance.jpg'),
	},
	{
		id: 2,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Late%20Night%20Radio.mp3',
		title: 'Late Night Radio',
		artist: 'Como una noche con amigos',
		artwork: require('../../assets/images/friends.jpg'),
	},
	{
		id: 3,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Night%20in%20Venice.mp3',
		title: 'Night in Venice',
		artist: 'Relajate como en una gran noche',
		artwork: require('../../assets/images/night.jpg'),
	},
	{
		id: 4,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Canon%20in%20D%20for%20Two%20Harps.mp3',
		title: 'Canon in D for Two Harps',
		artist: 'Disfruta tus momentos',
		artwork: require('../../assets/images/momentos.jpg'),
	},
	{
		id: 5,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/A%20Very%20Brady%20Special.mp3',
		title: 'A Very Brady Special',
		artist: 'Recordando los bellos momentos',
		artwork: require('../../assets/images/recuerdos.jpg'),
	},
	{
		id: 6,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Stay%20the%20Course.mp3',
		title: 'Stay the Course',
		artist: 'Manteniendo el enfoque',
		artwork: require('../../assets/images/focus.jpg'),
	},
	{
		id: 7,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Sincerely.mp3',
		title: 'Sincerely',
		artist: 'Hable con esperanza sobre el futuro.',
		artwork: require('../../assets/images/futuro.jpg'),
	},
	{
		id: 8,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Past%20Sadness.mp3',
		title: 'Past Sadness',
		artist: 'Sentir tristeza puede dar paz',
		artwork: require('../../assets/images/tristeza.jpg'),
	},
	{
		id: 9,
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Smooth%20Lovin.mp3',
		title: 'Smooth Lovin',
		artist: 'Se siente tan suave como el amor',
		artwork: require('../../assets/images/love.jpg'),
	},
];

const MusicNature = ({navigation}: MusicProps) => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	useEffect(() => {
		const startPlayer = async () => {
			try {
				setIsTrackPlayerInit(true);
			} catch (error) {
				console.log(error);
			}
		};
		startPlayer();
	}, []);

	useEffect(() => {
		const addTracks = async () => {
			try {
				await TrackPlayer.reset(); // Limpia la cola de reproducción antes de agregar nuevas canciones
				await TrackPlayer.add(cancionesNature); // Añade todas las canciones a la cola de reproducción
				const tracks = await TrackPlayer.getQueue();
			} catch (error) {
				console.log('Error al agregar las canciones a la cola:', error);
			}
		};
		if (isTrackPlayerInit) {
			addTracks();
		}
	}, [isTrackPlayerInit]);
	return (
		<View style={{height: '100%'}}>
			<ScrollView>
				<View
					style={{
						alignSelf: 'flex-start',
						marginBottom: 10,
						alignItems: 'center',
						padding: 15,
					}}>
					<Text text60>Selecciona un Audio</Text>
				</View>
				<View style={{alignItems: 'center', gap: 20, top: '-1%'}}>
					{cancionesNature.map((canci, i) => (
						<CardOpcion
							key={i}
							navigation={navigation}
							to="Reproductor"
							id={canci.id}
							url={canci.url}
							title={canci.title}
							artist={canci.artist}
							artwork={canci.artwork}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default MusicNature;
