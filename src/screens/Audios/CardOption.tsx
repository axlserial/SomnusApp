import { Card, View, Text } from 'react-native-ui-lib';
import { NavigationProp } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import { ImageBackground } from 'react-native';


type CardOpcionProps = {
	navigation: NavigationProp<any>;
	to: string;
	titulo: string;
	desc: string;
	url: string;
	imagen: any;
};

const CardOpcion = ({ navigation, to, titulo, desc, url, imagen }: CardOpcionProps) => {
	return (
		<View style={{flex:1,padding:20}}>
			<Card
				row
				onPress={() => navigation.navigate(to, { title: titulo, desc: desc, url: url, image: imagen })}
				elevation={3}
				style={{height: '200%'}}
				>
				<View
					style={{
						width: '80%',
						height:"100%",
						justifyContent: 'center',
						paddingLeft: 20,
						backgroundColor: '#1A3D82',
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10,
					}}>
					<Text text70 $textDefault style={{ fontWeight: 'bold' }}>
						{titulo}
					</Text>
					<Text text80 $textDefault>
						{desc}
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
						source={imagen} // establecer la imagen de fondo aquí
						style={{
							flex: 1,
							width: '100%',
							height: '100%',
							//resizeMode: 'cover', // ajustar la imagen al tamaño del contenedor
						}}>
					</ImageBackground>
				</View>
			</Card>
		</View>
	);
};

export default CardOpcion;
