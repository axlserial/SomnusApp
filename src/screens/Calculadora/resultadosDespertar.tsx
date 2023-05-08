import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react';
import {ScrollView, ToastAndroid, Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {View, Text, LoaderScreen} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Octicons';
import {useMMKVStorage} from 'react-native-mmkv-storage';

import {NotificationsId} from '../../constants';
import MMKV from '../../notificationStorage';
import CardHora from './CardHora';
import {
	horas_despertar,
	requestNotificationPermission,
	scheduleNotification,
	Notification,
} from '../../utils';

// Recibe un objeto de navegación
type ResultadosProps = {
	navigation: NavigationProp<any>;
};

/**
 * Pantalla que muestra las horas a las que se debe despertar
 */
const ResultadosDespertar = ({navigation}: ResultadosProps) => {
	const [date, setDate] = useState(new Date());
	const [selecting, setSelecting] = useState(true);
	const [horas, setHoras] = useState<string[]>([]);

	// Para almacenar los recordatorios
	const [_, setNotifications] = useMMKVStorage<Notification[]>(
		'notifications',
		MMKV,
		[],
	);

	// Función que se ejecuta cuando se selecciona una fecha
	const onChange = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined,
	) => {
		// Si se cancela la selección
		if (event.type === 'dismissed') {
			navigation.navigate('Calculadora');
			return;
		}
		// Si se selecciona una fecha
		const horas = horas_despertar(
			selectedDate!.getHours() % 12,
			selectedDate!.getMinutes(),
			selectedDate!.getHours() >= 12 ? 'PM' : 'AM',
		);

		setHoras(horas);
		setSelecting(false);

		// Se actualiza la fecha
		selectedDate && setDate(selectedDate);
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
		let fecha: Date = new Date(date.getTime());

		// Si la hora es menor a la actual se establece para el día siguiente
		if (
			date.getHours() < new Date(Date.now()).getHours() ||
			(date.getHours() === new Date(Date.now()).getHours() &&
				date.getMinutes() <= new Date(Date.now()).getMinutes())
		) {
			fecha = new Date(Date.now());
			fecha.setDate(fecha.getDate() + 1);
			message += 'para mañana a las';
		} else {
			message += 'para hoy a las';
		}

		// Se establece la hora
		fecha.setHours(date.getHours());
		fecha.setMinutes(date.getMinutes());
		fecha.setSeconds(0);

		const id = await scheduleNotification({
			title: 'Hora de ir a dormir',
			body: 'Recuerda que debes dormir para despertar a la hora indicada',
			channelId: NotificationsId,
			timestamp: fecha,
		});

		// Se agrega el recordatorio a la lista
		setNotifications(notifications => [
			...notifications,
			{
				id,
				timestamp: fecha.getTime(),
			},
		]);

		// Se muestra el toast de confirmación
		ToastAndroid.show(
			`${message} ${date.toLocaleTimeString('es-MX', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			})}`,
			ToastAndroid.SHORT,
		);
	};

	useEffect(() => {
		// Se abre el selector de fecha
		const unsubscribe = navigation.addListener('focus', () => {
			DateTimePickerAndroid.open({
				value: new Date(Date.now()),
				onChange,
				mode: 'time',
			});
		});

		return unsubscribe;
	}, [navigation]);

	// Mientras se selecciona la fecha
	if (selecting) {
		return <LoaderScreen />;
	}

	return (
		<View flex>
			<ScrollView style={{width: '100%', padding: 5}}>
				<View
					style={{
						alignItems: 'center',
						marginTop: 10,
						marginBottom: 20,
						gap: 30,
					}}>
					<Text text70 style={{color: '#A6A6A6', fontWeight: 'bold'}}>
						Tú hora seleccionada es{' '}
						{date.toLocaleTimeString('es-MX', {
							hour: '2-digit',
							minute: '2-digit',
							hour12: true,
						})}
					</Text>
					<Icon.Button
						name="bell"
						color={'white'}
						backgroundColor={'#3E84C5'}
						style={{padding: 10}}
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
						}>
						<Text style={{color: 'white'}}>
							Establecer recordatorio de ir a dormir
						</Text>
					</Icon.Button>
				</View>
				<View style={{padding: 10, marginBottom: 18}}>
					<Text text60 style={{fontWeight: 'bold'}}>
						Para un buen descanso:
					</Text>
					<View style={{marginTop: 10, gap: 15}}>
						<CardHora hora={horas[0]} ciclos={6} total={'9h'} />
						<CardHora hora={horas[1]} ciclos={5} total={'7h 30m'} />
					</View>
					<Text text60 style={{marginTop: 20, fontWeight: 'bold'}}>
						Para un descanso regular:
					</Text>
					<View style={{marginTop: 10, gap: 15}}>
						<CardHora hora={horas[2]} ciclos={4} total={'6h'} />
					</View>
					<Text text60 style={{marginTop: 20, fontWeight: 'bold'}}>
						Para un descanso mínimo:
					</Text>
					<View style={{marginTop: 10, gap: 15}}>
						<CardHora hora={horas[3]} ciclos={3} total={'4h 30m'} />
						<CardHora hora={horas[4]} ciclos={2} total={'3h'} />
						<CardHora hora={horas[5]} ciclos={1} total={'1h 30m'} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ResultadosDespertar;
