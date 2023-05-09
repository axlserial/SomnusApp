import {Card, View, Text, Colors} from 'react-native-ui-lib';
import Octicons from 'react-native-vector-icons/Octicons';

type CardHoraProps = {
	hora: string;
	ciclos: number;
	total: string;
};

/**
 * Card que muestra la hora y los ciclos de sueño
 * @param hora Hora en la que se debe despertar
 * @param ciclos Cantidad de ciclos de sueño
 * @param total Total de horas de sueño
 */
const CardHora = ({hora, ciclos, total}: CardHoraProps) => {
	return (
		<Card row style={{width: '100%', height: 70}}>
			<View
				row
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: 20,
					paddingRight: 25,
					backgroundColor: '#004B6F',
					borderRadius: 10,
					gap: 15,
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
				<View
					style={{
						backgroundColor: '#004B6F',
						alignItems: 'center',
						flexDirection: 'row',
						gap: 15,
					}}>
					<Octicons name="clock" color={Colors.textColor} size={20} />
					<Text text50 style={{fontWeight: 'bold'}}>
						{hora}
					</Text>
				</View>
			</View>
		</Card>
	);
};

export default CardHora;
