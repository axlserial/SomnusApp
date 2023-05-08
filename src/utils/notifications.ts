import notifee, {
	AuthorizationStatus,
	AndroidNotificationSetting,
	TriggerType,
} from '@notifee/react-native';
import {Alert} from 'react-native';

export type Notification = {
	id: string;
	timestamp: number;
};

/**
 * Comprueba si la aplicación tiene permiso para enviar notificaciones.
 * @returns true si tiene permiso, false si no.
 */
export const checkNotificationPermission = async () => {
	const settings = await notifee.getNotificationSettings();
	return settings.authorizationStatus == AuthorizationStatus.AUTHORIZED;
};

/**
 * Comprueba si la aplicación tiene permiso para enviar notificaciones programadas.
 * @returns true si tiene permiso, false si no.
 */
export const checkScheduledNotifications = async () => {
	const settings = await notifee.getNotificationSettings();
	return settings.android.alarm == AndroidNotificationSetting.ENABLED;
};

/**
 * Solicita permiso para enviar notificaciones al usuario.
 * @param channelId ID del canal de notificaciones.
 * @returns true si el usuario aceptó, false si no.
 */
export const requestNotificationPermission = async (channelId: string) => {
	// Comprobamos si ya tiene permiso
	const notiPerm = await checkNotificationPermission();
	const alarmPerm = await checkScheduledNotifications();

	if (notiPerm && alarmPerm) return true;

	if (!notiPerm) {
		// Si no tiene permiso, lo solicitamos
		Alert.alert(
			'Permisos de notificaciones',
			'Para que las notificaciones se vean, ' +
				'por favor activa los permisos de notificaciones para la aplicación.',
			[
				{
					text: 'OK',
				},
			],
		);
		await notifee.openNotificationSettings(channelId);
	}

	if (!alarmPerm) {
		// Si no tiene permiso, lo solicitamos
		Alert.alert(
			'Permisos de notificaciones programadas',
			'Para que las notificaciones programadas se vean, ' +
				'por favor activa los permisos de notificaciones programadas para la aplicación.',
			[
				{
					text: 'OK',
				},
			],
		);
		await notifee.openAlarmPermissionSettings();
	}

	// Battery optimization
	const batteryOptimization = await notifee.isBatteryOptimizationEnabled();

	if (batteryOptimization) {
		Alert.alert(
			'Restricciones detectadas',
			'Para asegurar que las notificaciones se vean, ' +
				'por favor desactiva la optimización de batería para la aplicación.',
			[
				// 3. launch intent to navigate the user to the appropriate screen
				{
					text: 'OK, abre ajustes',
					onPress: async () =>
						await notifee.openBatteryOptimizationSettings(),
				},
				{
					text: 'Cancelar',
					style: 'cancel',
				},
			],
			{cancelable: false},
		);
	}

	// Comprobamos si ahora tiene permiso
	const newNotiPerm = await checkNotificationPermission();
	const newAlarmPerm = await checkScheduledNotifications();

	return newNotiPerm && newAlarmPerm;
};

type NotificationSchedule = {
	title: string;
	body: string;
	channelId: string;
	timestamp: Date;
};

/**
 * Programa una notificación para una fecha y hora concretas.
 * @param notification Objeto con los datos de la notificación.
 * @returns El ID de la notificación programada.
 */
export const scheduleNotification = async (
	notification: NotificationSchedule,
) => {
	const {title, body, channelId, timestamp} = notification;

	const channel = await notifee.createChannel({
		id: channelId,
		name: 'Recordatorios',
		sound: 'notif',
	});

	return notifee.createTriggerNotification(
		{
			title: `${title} &#x1F4A4;`,
			body,
			subtitle: 'Recordatorio',
			android: {
				channelId: channel,
				smallIcon: 'ic_launcher_round',
				pressAction: {
					id: 'eliminar-notificacion',
				}
			},
		},
		{
			type: TriggerType.TIMESTAMP,
			timestamp: timestamp.getTime(),
			alarmManager: true,
		},
	);
};
