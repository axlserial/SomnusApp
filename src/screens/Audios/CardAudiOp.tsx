import {Card, View, Text} from 'react-native-ui-lib';
import {NavigationProp} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type CardAudiOpProps = {
	navigation: NavigationProp<any>;
	to: string;
	titulo: string;
	desc: string;
	icon: string;
	fondo: any;
};
const CardAudiOp = ({
	navigation,
	to,
	titulo,
	desc,
	icon,
	fondo,
}: CardAudiOpProps) => {
	return (
		<Card
			row
			onPress={() => navigation.navigate(to)}
			elevation={3}
			style={{width: '100%', height: '15%'}}>
			<ImageBackground
				source={fondo}
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					borderTopRightRadius: 10,
					borderBottomRightRadius: 10,
					alignItems: 'center',
				}}>
				<View style={{flexDirection: 'row', backgroundColor: 'transparent', marginTop: '10%'}}>
					<View style={{backgroundColor: 'transparent', marginLeft:'35%', alignItems:'center'}}>
						<Text text70 $textDefault style={{fontWeight: 'bold'}}>
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
							alignSelf: 'flex-end',
							backgroundColor: 'transparent',
							borderTopRightRadius: 10,
							borderBottomRightRadius: 10,
							marginLeft:'20%'
						}}>
						<Octicons
							name="chevron-right"
							size={30}
							color="white"
							style={{
								marginRight: 10,
							}}
						/>
					</View>
				</View>
			</ImageBackground>
		</Card>
	);
};

export default CardAudiOp;
