import {Card, View, Text, Colors} from 'react-native-ui-lib';
import {ToastAndroid, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import {NotificationsId} from '../../constants';
import {requestNotificationPermission, scheduleNotification} from '../../utils';

type CardDormirProps = {
	hora: string;
	ciclos: number;
	total: string;
};

const CardDormir = ({hora, ciclos, total}: CardDormirProps) => {
	// Fución que regresa la hora en formato Date
	const getTime = () => {
		const data = hora.split(' ');

		const h = Number(data[0].split(':')[0]); // Hora
		const m = Number(data[0].split(':')[1]); // Minutos
		const t = data[1]; // AM o PM

		const date = new Date(Date.now());

		date.setHours(t == 'PM' ? h + 12 : h);
		date.setMinutes(m);
		date.setSeconds(0);

		return date;
	};

	// Función que se ejecuta cuando se presiona el botón de recordatorio
	// para establecer un recordatorio de ir a dormir
	const onReminderPress = async () => {
		const granted = await requestNotificationPermission(NotificationsId);

		if (!granted) {
			ToastAndroid.show(
				'No se puede establecer un recordatorio sin permisos',
				ToastAndroid.SHORT,
			);
			return;
		}

		// Mensaje del toast
		let message = 'Recordatorio establecido ';

		// Para establecer el recordatorio se debe establecer la fecha
		const date = getTime();
		let fecha: Date = new Date(date.getTime());

		// Si la hora es menor a la actual se establece para el día siguiente
		if (
			date.getHours() < new Date(Date.now()).getHours() ||
			(date.getHours() === new Date(Date.now()).getHours() &&
				date.getMinutes() <= new Date(Date.now()).getMinutes())
		) {
			fecha.setDate(fecha.getDate() + 1);
			message += 'para mañana a las';
		} else {
			message += 'para hoy a las';
		}

		await scheduleNotification({
			title: 'Hora de ir a dormir',
			body: 'Recuerda que debes dormir para despertar a la hora indicada',
			channelId: NotificationsId,
			timestamp: fecha,
		});

		ToastAndroid.show(
			`${message} ${date.toLocaleTimeString('es-MX', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			})}`,
			ToastAndroid.SHORT,
		);
	};

	return (
		<Card row style={{width: '100%', height: 70}}>
			<View
				row
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					paddingLeft: 20,
					paddingRight: 20,
					backgroundColor: '#004B6F',
					borderRadius: 10,
					gap: 25,
				}}>
				<View
					style={{
						alignItems: 'center',
						backgroundColor: '#004B6F',
						marginRight: 20,
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
					<Text text50 style={{fontWeight: 'bold'}}>
						{hora}
					</Text>
				</View>
				<View
					style={{
						backgroundColor: '#004B6F',
						alignItems: 'center',
					}}>
					<Icon.Button
						name="bell"
						color={Colors.textColor}
						backgroundColor={'#004B6F'}
						iconStyle={{
							marginRight: 7,
							marginLeft: 5,
						}}
						onPress={() =>
							Alert.alert(
								'¿Estás seguro?',
								'Se establecerá un recordatorio para ir a dormir a la hora indicada',
								[
									{
										text: 'Cancelar',
										style: 'cancel',
									},
									{
										text: 'Aceptar',
										onPress: onReminderPress,
									},
								],
							)
						}
					/>
				</View>
			</View>
		</Card>
	);
};

export default CardDormir;
