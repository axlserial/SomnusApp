import { NavigationProp } from '@react-navigation/native';
import { View, Text, LoaderScreen } from 'react-native-ui-lib';
import CardOpcion from './CardOption';
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

// Recibe un objeto de navegación
type MusicProps = {
	navigation: NavigationProp<any>;
};

const cancionesRelax = [
	{
		titulo: 'Space Jazz',
		desc: 'Como estar en un videojuego tranquilamente',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Space%20Jazz.mp3',
		imagen: require('../../assets/images/space.png'),
	},
	{
		titulo: 'Devonshire Waltz Andante',
		desc: 'Como estar en un baile sin fin',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Devonshire%20Waltz%20Andante.mp3',
		imagen: require('../../assets/images/dance.jpg'),
	},
	{
		titulo: 'Late Night Radio',
		desc: 'Como una noche con amigos',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Late%20Night%20Radio.mp3',
		imagen: require('../../assets/images/friends.jpg'),
	},
	{
		titulo: 'Night in Venice',
		desc: 'Relajate como en una gran noche',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Night%20in%20Venice.mp3',
		imagen: require('../../assets/images/night.jpg'),
	},
	{
		titulo: 'Canon in D for Two Harps',
		desc: 'Disfruta tus momentos',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Canon%20in%20D%20for%20Two%20Harps.mp3',
		imagen: require('../../assets/images/momentos.jpg'),
	},
	{
		titulo: 'A Very Brady Special',
		desc: 'Recordando los bellos momentos',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/A%20Very%20Brady%20Special.mp3',
		imagen: require('../../assets/images/recuerdos.jpg'),
	},
	{
		titulo: 'Stay the Course',
		desc: 'Manteniendo el enfoque',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Stay%20the%20Course.mp3',
		imagen: require('../../assets/images/focus.jpg'),
	},
	{
		titulo: 'Sincerely',
		desc: 'Hable con esperanza sobre el futuro.',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Sincerely.mp3',
		imagen: require('../../assets/images/futuro.jpg'),
	},
	{
		titulo: 'Past Sadness',
		desc: 'Sentir tristeza puede dar paz',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Past%20Sadness.mp3',
		imagen: require('../../assets/images/tristeza.jpg'),
	},
	{
		titulo: 'Smooth Lovin',
		desc: 'Se siente tan suave como el amor',
		url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Smooth%20Lovin.mp3',
		imagen: require('../../assets/images/love.jpg'),
	},
];

const MusicRelax = ({ navigation }: MusicProps) => {
	return (
		<View style={{ height: "100%" }}>
			<ScrollView>
				<View style={{ alignSelf: 'flex-start', marginBottom: 10, alignItems: 'center', padding: 15}}>
					<Text text60>Selecciona un Audio</Text>
				</View>
				<View style={{ alignItems: 'center', gap: 20,top:"-1%"}}>
					{cancionesRelax.map((music, i) => (
						<CardOpcion
							key={i}
							navigation={navigation}
							to="Reproductor"
							titulo={music.titulo}
							desc={music.desc}
							url={music.url}
							imagen={music.imagen}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default MusicRelax;