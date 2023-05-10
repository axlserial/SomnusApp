import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import notifee, {EventType} from '@notifee/react-native';
import {ToastAndroid, StatusBar} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {useEffect, useState} from 'react';
import Main from './src/Main';
import TrackPlayer, {
	Capability,
	AppKilledPlaybackBehavior,
} from 'react-native-track-player';

// Handler para las notificaciones
notifee.onBackgroundEvent(async ({type, detail}) => {
	const {notification} = detail;

	// Si se presiona la notificación
	if (type === EventType.PRESS || type === EventType.DISMISSED) {
		const id = notification?.id;

		// Si la notificación tiene un id
		if (id) {
			await notifee.cancelNotification(id);
		}
	}
});

// Aplicación principal
const App = () => {
	// Indica si es la primera vez que se inicia la aplicación
	const [firstTime, setFirstTime] = useState(true);

	// Inicializar dependencias
	const initTrackPlayer = async () => {
		try {
			// Inicializar TrackPlayer
			if (firstTime) {
				await TrackPlayer.setupPlayer();
				await TrackPlayer.updateOptions({
					android: {
						appKilledPlaybackBehavior:
							AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
					},

					// Capacidad de la notificación
					capabilities: [Capability.Play, Capability.Pause],

					// Notificación compacta
					compactCapabilities: [Capability.Play, Capability.Pause],
				});

				setFirstTime(false);
			}
		} catch (error) {
			ToastAndroid.show(
				'Error al iniciar dependencias de la aplicación',
				ToastAndroid.SHORT,
			);
		}
	};

	useEffect(() => {
		initTrackPlayer();
	}, []);

	return (
		<>
			<StatusBar backgroundColor={Colors.background} />
			<GestureHandlerRootView style={{flex: 1}}>
				<NavigationContainer>
					<Main />
				</NavigationContainer>
			</GestureHandlerRootView>
		</>
	);
};

export default App;
