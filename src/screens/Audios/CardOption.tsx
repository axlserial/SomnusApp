import {Card, View, Text} from 'react-native-ui-lib';
import {NavigationProp} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import {ImageBackground} from 'react-native';

type CardOpcionProps = {
	navigation: NavigationProp<any>;
	to: string;
	id: number;
	url: string;
	title: string;
	artist: string;
	artwork: any;
};

const CardOpcion = ({
	navigation,
	to,
	id,
	url,
	title,
	artist,
	artwork,
}: CardOpcionProps) => {
	return (
		<View style={{flex: 1, padding: 20}}>
			<Card
				row
				onPress={() =>
					navigation.navigate(to, {
						id: id,
						url: url,
						title: title,
						artist: artist,
						artwork: artwork,
					})
				}
				elevation={3}
				style={{height: '200%'}}>
				<View
					style={{
						width: '80%',
						height: '100%',
						justifyContent: 'center',
						paddingLeft: 20,
						backgroundColor: '#1A3D82',
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10,
					}}>
					<Text text70 $textDefault style={{fontWeight: 'bold'}}>
						{title}
					</Text>
					<Text text80 $textDefault>
						{artist}
					</Text>
				</View>
				<View
					style={{
						height: '100%',
						width: '20%',
						justifyContent: 'center',
						alignItems: 'center',
						//backgroundColor: 'transparente',
						borderTopRightRadius: 10,
						borderBottomRightRadius: 10,
					}}>
					<ImageBackground
						source={artwork} // establecer la imagen de fondo aquí
						style={{
							flex: 1,
							width: '100%',
							height: '100%',
							//resizeMode: 'cover', // ajustar la imagen al tamaño del contenedor
						}}></ImageBackground>
				</View>
			</Card>
		</View>
	);
};

export default CardOpcion;
