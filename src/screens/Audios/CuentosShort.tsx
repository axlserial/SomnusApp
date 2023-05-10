import {ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {View, Text} from 'react-native-ui-lib';
import CardOpcion from './CardOption';
import {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

// Recibe un objeto de navegación
type CuentosProps = {
	navigation: NavigationProp<any>;
};

//Arreglo con los cuentos y su información
const cuentos = [
	{
		id: 0,
		url: 'https://dl.dropboxusercontent.com/s/herc7dm0pohwm6m/05100003.mp3?dl=0',
		title: 'La Lechuga',
		artist: 'Teresa disfruta ayudar a su abuelo en la huerta',
		artwork: require('../../assets/images/lechuga.png'),
	},
	{
		id: 1,
		url: 'https://dl.dropboxusercontent.com/s/b0bdg0e772wunq0/05100165.mp3?dl=0',
		title: 'El Terrible Problema de Murciélago',
		artist: 'Un pequeño muerciélago con problemas de sueño',
		artwork: require('../../assets/images/murcielago.png'),
	},
	{
		id: 2,
		url: 'https://dl.dropboxusercontent.com/s/pboo3mhlitozmoo/05100087.mp3?dl=0',
		title: 'El Gato Enamorado',
		artist: 'Toda la dulzura del amor gatuno',
		artwork: require('../../assets/images/gatito.jpg'),
	},
	{
		id: 3,
		url: 'https://dl.dropboxusercontent.com/s/3nubqlyg1s2yz3c/05100002.mp3?dl=0',
		title: 'El Ciempiés Bailarín',
		artist: 'Un alegre ciempiés que no puede dejar de cantar, bailar y zapatear todo el día',
		artwork: require('../../assets/images/cien.jpg'),
	},
	{
		id: 4,
		url: 'https://dl.dropboxusercontent.com/s/rmvb7ifevjbw7jm/05100188.mp3?dl=0',
		title: 'Tatú y su Abrigo Mágico',
		artist: 'Tatú, el armadillo, está confeccionando una bonita capa de tejido fino',
		artwork: require('../../assets/images/armadillo.jpg'),
	},
	{
		id: 5,
		url: 'https://dl.dropboxusercontent.com/s/3rhxok1zlfm66ce/11030046.mp3?dl=0',
		title: 'Los Chivitos que no Querían Andar',
		artist: 'Un niño intentando conducir sus chivitos de regreso al hogar',
		artwork: require('../../assets/images/chivos.jpg'),
	},
	{
		id: 6,
		url: 'https://dl.dropboxusercontent.com/s/zt1wtncj7sytfrf/05100208.mp3?dl=0',
		title: 'La Promesa de los Elefantes',
		artist: 'El rey elefante ha enfermado y todos los animalitos vecinos buscarán el modo de aliviar su malestar',
		artwork: require('../../assets/images/elefante.jpg'),
	},
	{
		id: 7,
		url: 'https://dl.dropboxusercontent.com/s/ntqaektnmy51oij/AUDIO-1200279.mp3?dl=0',
		title: 'El Árbol Mágico',
		artist: 'Recordemos los buenos modales',
		artwork: require('../../assets/images/arbol.jpg'),
	},
	{
		id: 8,
		url: 'https://dl.dropboxusercontent.com/s/wsfwncyfgh1b1d3/05100004.mp3?dl=0',
		title: 'La Araña y el Ciempiés / Caracol Col',
		artist: 'Pequeñas y entretenidas historias de animales y otros personajes que conviven en el huerto',
		artwork: require('../../assets/images/araña.png'),
	},
];

const CuentosShort = ({navigation}: CuentosProps) => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	useEffect(() => {
		//Inicializar TrackPlayer
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
		//Cargar los cuentos en cola
		const addTracks = async () => {
			try {
				await TrackPlayer.reset(); // Limpia la cola de reproducción antes de agregar nuevos audios
				await TrackPlayer.add(cuentos); // Añade todos los cuentos a la cola de reproducción
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
						marginBottom: 15,
						alignItems: 'center',
						padding: 15,
					}}>
					<Text text60>Selecciona un Audio</Text>
				</View>
				<View style={{alignItems: 'center', gap: 20, top: '-3%'}}>
					{cuentos.map((elemento, i) => (
						<CardOpcion
							key={i}
							navigation={navigation}
							to="Reproductor"
							id={elemento.id}
							url={elemento.url}
							title={elemento.title}
							artist={elemento.artist}
							artwork={elemento.artwork}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default CuentosShort;
