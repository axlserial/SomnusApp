import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {View, Text, LoaderScreen} from 'react-native-ui-lib';
import {useMMKVStorage} from 'react-native-mmkv-storage';

import MMKV from '../../notificationStorage';
import CardDormir from './CardDormir';
import {horas_dormir, Notification} from '../../utils';

// Recibe un objeto de navegación
type ResultadosProps = {
	navigation: NavigationProp<any>;
};

/**
 * Pantalla que muestra las horas a las que se debe dormir
 */
const ResultadosDormir = ({navigation}: ResultadosProps) => {
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
		const horas = horas_dormir(
			selectedDate!.getHours() % 12,
			selectedDate!.getMinutes(),
			selectedDate!.getHours() >= 12 ? 'PM' : 'AM',
		);

		setHoras(horas);
		setSelecting(false);

		// Se actualiza la fecha
		selectedDate && setDate(selectedDate);
	};

	useEffect(() => {
		// Se abre el selector de fecha
		const unsubscribe = navigation.addListener('focus', () => {
			DateTimePickerAndroid.open({
				value: date,
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

					<View
						style={{
							backgroundColor: '#C9E6FF',
							borderRadius: 10,
							padding: 20,
							marginLeft: 10,
							marginRight: 10,
						}}>
						<Text
							text80
							style={{color: '#001F2A', fontWeight: 'bold'}}>
							Haz click en el icono de la campana para configurar
							una alerta de hora de dormir
						</Text>
					</View>
				</View>
				<View style={{padding: 10, marginBottom: 18}}>
					<Text text60 style={{fontWeight: 'bold'}}>
						Para un buen descanso:
					</Text>
					<View style={{marginTop: 10, gap: 15}}>
						<CardDormir
							hora={horas[0]}
							ciclos={6}
							total={'9h'}
							setNotifications={setNotifications}
						/>
						<CardDormir
							hora={horas[1]}
							ciclos={5}
							total={'7h 30m'}
							setNotifications={setNotifications}
						/>
					</View>
					<Text text60 style={{marginTop: 20, fontWeight: 'bold'}}>
						Para un descanso regular:
					</Text>
					<View style={{marginTop: 10, gap: 15}}>
						<CardDormir
							hora={horas[2]}
							ciclos={4}
							total={'6h'}
							setNotifications={setNotifications}
						/>
					</View>
					<Text text60 style={{marginTop: 20, fontWeight: 'bold'}}>
						Para un descanso mínimo:
					</Text>
					<View style={{marginTop: 10, gap: 15}}>
						<CardDormir
							hora={horas[3]}
							ciclos={3}
							total={'4h 30m'}
							setNotifications={setNotifications}
						/>
						<CardDormir
							hora={horas[4]}
							ciclos={2}
							total={'3h'}
							setNotifications={setNotifications}
						/>
						<CardDormir
							hora={horas[5]}
							ciclos={1}
							total={'1h 30m'}
							setNotifications={setNotifications}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ResultadosDormir;
