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

//Arreglo con sonidos de la naturaleza y su información
const cancionesNature = [
	{
		id: 0,
		url: 'https://dl.dropboxusercontent.com/s/0h07ohlkt16smxp/14%20-%20Lluvia%20Tropical.mp3?dl=0', 
		title: 'Lluvia Tropical',
		artist: 'Que relajante escuchar la lluvia',
		artwork: require('../../assets/images/lluvia.jpg'),
	},
	{
		id: 1,
		url: 'https://dl.dropboxusercontent.com/s/11cgatnmrfq7keo/06%20-%20P%C3%A1jaros%20del%20Bosque.mp3?dl=0',
		title: 'Canto de Aves',
		artist: 'Escucha ese bonito cantar',
		artwork: require('../../assets/images/aves.jpg'),
	},
	{
		id: 2,
		url: 'https://dl.dropboxusercontent.com/s/73l8gg7upvu9n1h/09%20-%20Agua%20de%20R%C3%ADo%20Fluyendo.mp3?dl=0',
		title: 'Agua Corriendo en el Río',
		artist: 'La paz que produce escuchar correr el agua',
		artwork: require('../../assets/images/rio.jpg'),
	},
	{
		id: 3,
		url: 'https://dl.dropboxusercontent.com/s/3l0o84050xh5j5l/10%20-%20Sonido%20de%20las%20Olas%20del%20Mar.mp3?dl=0',
		title: 'Olas del Mar',
		artist: 'Dejate llevar como en las olas del mar',
		artwork: require('../../assets/images/olas.jpg'),
	},
	{
		id: 4,
		url: 'https://dl.dropboxusercontent.com/s/pyhb5a1quiint0s/17%20-%20Sonido%20del%20Viento%20para%20Dormir.mp3?dl=0',
		title: 'Viento Silencioso',
		artist: 'Disfrutar de la soledad',
		artwork: require('../../assets/images/viento.jpg'),
	},
	{
		id: 5,
		url: 'https://dl.dropboxusercontent.com/s/z6hvvsyn103370x/21%20-%20Agua%20en%20la%20Gruta.mp3?dl=0',
		title: 'Gruta',
		artist: 'Experimenta tranquilidad y paz',
		artwork: require('../../assets/images/gruta.jpg'),
	},
	{
		id: 6,
		url: 'https://dl.dropboxusercontent.com/s/ajiusd8tefkpk9d/20%20-%20Grillos.mp3?dl=0',
		title: 'Noche en el Bosque',
		artist: 'Siente la tranquilidad y relajación',
		artwork: require('../../assets/images/bosque.jpg'),
	},
	{
		id: 7,
		url: 'https://dl.dropboxusercontent.com/s/y4639u6lgh93qt1/19%20-%20Naturaleza%20Salvaje.mp3?dl=0',
		title: 'En Medio de la Naturaleza',
		artist: 'Conectando con la naturaleza',
		artwork: require('../../assets/images/nat.jpg'),
	}
];

const MusicNature = ({navigation}: MusicProps) => {
	//Inicializar TackPlayer
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
		//Agregar los sonidos a la cola
		const addTracks = async () => {
			try {
				await TrackPlayer.reset(); // Limpia la cola de reproducción antes de agregar nuevos audios
				await TrackPlayer.add(cancionesNature); // Añade todas los cuentos a la cola de reproducción
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
