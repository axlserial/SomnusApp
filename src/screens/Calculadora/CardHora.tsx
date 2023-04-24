import {Card, View, Text} from 'react-native-ui-lib';
import Octicons from 'react-native-vector-icons/Octicons';

type CardHoraProps = {
	hora: string;
	ciclos: number;
	total: string;
};

const CardHora = ({hora, ciclos, total}: CardHoraProps) => {
	return (
		<Card row style={{width: '100%', height: 70}}>
			<View
				row
				style={{
					width: '75%',
					justifyContent: 'space-between',
					paddingLeft: 20,
					paddingRight: 15,
					backgroundColor: '#004B6F',
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					alignItems: 'center',
				}}>
				<View
					style={{
						alignItems: 'center',
						backgroundColor: '#004B6F',
						marginRight: 30,
					}}>
					<Text text70>
						{ciclos} ciclo{ciclos > 1 ? 's de' : ' de  '}
					</Text>
					<Text text80 style={{fontWeight: 'bold'}}>
						{total}
					</Text>
				</View>
				<Text text50 style={{fontWeight: 'bold'}}>
					{hora}
				</Text>
			</View>
			<View
				style={{
					height: '100%',
					width: '25%',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#004B6F',
					borderTopRightRadius: 10,
					borderBottomRightRadius: 10,
				}}>
				<Octicons
					name="clock"
					color="white"
					size={20}
				/>
			</View>
		</Card>
	);
};

export default CardHora;
