import {useRef, useState, useEffect} from 'react';
import notifee, {EventType} from '@notifee/react-native';
import {FlatList, ToastAndroid, Alert, AppState} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {View, Text, Drawer, Colors} from 'react-native-ui-lib';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import Octicons from 'react-native-vector-icons/Octicons';

import MMKV from '../../notificationStorage';
import {Notification} from '../../utils';

/**
 * Pantalla que muestra los recordatorios
 */
const Recordatorios = () => {
	const [notifications, setNotifications] = useMMKVStorage<Notification[]>(
		'notifications',
		MMKV,
		[],
	);

	const appState = useRef(AppState.currentState);
	const [_, setAppStateVisible] = useState(appState.current);

	// Se ejecuta cuando se monta el componente
	useEffect(() => {
		// Filtra los recordatorios que ya pasaron
		const filterNotifications = () => {
			const actual = Date.now();
			const filteredNotifications = notifications.filter(
				notification => notification.timestamp > actual,
			);
			setNotifications(filteredNotifications);
		};

		filterNotifications();

		// Se ejecuta cuando la aplicación pasa a segundo plano
		const subscription = AppState.addEventListener(
			'change',
			nextAppState => {
				// Si la aplicación regresa a primer plano
				if (
					appState.current.match(/inactive|background/) &&
					nextAppState === 'active'
				) {
					filterNotifications();
				}

				// Se actualiza el estado de la aplicación
				appState.current = nextAppState;
				setAppStateVisible(appState.current);
			},
		);

		// Se ejecuta cuando se recibe una notificación en primer plano
		const notifeeUnsubscription = notifee.onForegroundEvent(
			async ({type, detail}) => {
				const {notification} = detail;

				// Sí acaba de ser entregada, se elimina de la lista
				if (
					type === EventType.DELIVERED &&
					notification?.android?.pressAction?.id ===
					'eliminar-notificacion'
				) {
					const id = notification.id!;
					await notifee.cancelTriggerNotification(id);
					setNotifications(
						notifications.filter(
							notification => notification.id !== id,
						),
					);
				}
			},
		);

		// Se ejecuta cuando se desmonta el componente
		return () => {
			subscription.remove();
			notifeeUnsubscription();
		};
	}, []);

	// Función que se ejecuta cuando se presiona el botón de eliminar
	const onDelete = async (id: string) => {
		// Función que elimina el recordatorio
		const deleteItem = async () => {
			try {
				await notifee.cancelTriggerNotification(id);
				setNotifications(
					notifications.filter(
						notification => notification.id !== id,
					),
				);
			} catch (error) {
				ToastAndroid.show(
					'Error al eliminar el recordatorio',
					ToastAndroid.SHORT,
				);
			} finally {
				ToastAndroid.show('Recordatorio eliminado', ToastAndroid.SHORT);
			}
		};

		// Alerta de confirmación
		Alert.alert(
			'Eliminar recordatorio',
			'¿Estás seguro de que deseas eliminar este recordatorio?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Eliminar',
					style: 'destructive',
					onPress: () => deleteItem(),
				},
			],
		);
	};

	// Regresa un elemento de la lista de recordatorios
	const RecordatorioItem = ({item}: {item: Notification}) => {
		// Función que genera el texto del recordatorio
		const genText = () => {
			const date = new Date(item.timestamp);
			const today = new Date();

			let generatedText = `${date.toLocaleTimeString('es-MX', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			})} de `;

			if (date.getDate() === today.getDate()) {
				generatedText += 'hoy';
			} else {
				generatedText += 'mañana';
			}

			return generatedText;
		};

		return (
			<Drawer
				fullSwipeRight={false}
				leftItem={{
					text: 'Eliminar',
					background: Colors.red30,
					onPress: () => onDelete(item.id),
				}}
				style={{
					marginHorizontal: 10,
					marginVertical: 5,
				}}>
				<View
					centerV
					padding-s4
					bg-white
					style={{
						height: 60,
						backgroundColor: '#1a2547',
						alignItems: 'center',
						flexDirection: 'row',
						gap: 15,
					}}>
					<Octicons name="bell" size={18} color={Colors.textColor} />
					<Text text65>{genText()}</Text>
				</View>
			</Drawer>
		);
	};

	return (
		<View flex>
			{notifications.length > 0 ? (
				<View center style={{marginTop: 15, gap: 10}}>
					<Text text70 style={{color: '#A6A6A6', fontWeight: 'bold'}}>
						Recordatorios programados
					</Text>
					<FlatList
						data={notifications}
						renderItem={({item}) => (
							<RecordatorioItem item={item} />
						)}
						keyExtractor={item => item.id}
						style={{width: '100%', marginBottom: 23}}
					/>
				</View>
			) : (
				<View center style={{height: '100%'}}>
					<Text>No hay recordatorios vigentes</Text>
				</View>
			)}
		</View>
	);
};

export default gestureHandlerRootHOC(Recordatorios);
