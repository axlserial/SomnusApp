import React, {useEffect, useState} from 'react';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import {View, Text, TouchableOpacity, ProgressBar} from 'react-native-ui-lib';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import {ImageBackground} from 'react-native';

type Props = {
	route: RouteProp<any>;
	navigation: NavigationProp<any>;
};

const Reproductor: React.FC<Props> = ({route}) => {
	//Estado para saber si TrackPlayer se ha inicializado
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
	//Estado para saber si un audio esta siendo reproducido
	const [isPlaying, setIsPlaying] = useState(false);
	//Estado para obtener la pista actual
	const [currentTrack, setCurrentTrack] = useState(route.params);
	//Hook para obtener el progreso del audio en reproducción
	const progress = useProgress();

	useEffect(() => {
		//Inicializar TrackPlayer
		const startPlayer = async () => {
			try {
				setIsTrackPlayerInit(true);
			} catch (error) {
				console.log(error);
			}
		};
		startPlayer();
	}, []);

	useEffect(() => {
		//Inicializar y reproducir la pista actual 
		const initializeTrack = async () => {
			const {id, url, title, artist, artwork} = currentTrack ?? {
				id: 0,
				url: '',
				title: '',
				artist: '',
				artwork: '',
			};
			//Si se selecciona otra pista se debe saltar a la pista seleccionada
			if ((await TrackPlayer.getActiveTrackIndex()) != id) {
				await TrackPlayer.skip(id);
			}
			await TrackPlayer.play();
			setIsPlaying(true);
		};
		if (isTrackPlayerInit) {
			initializeTrack();
			setCurrentTrack(currentTrack);
		}
	}, [isTrackPlayerInit]);

	//Función para pausar o reproducir un audio
	const onPlayPausePress = async () => {
		const state = await TrackPlayer.getState();
		if (state === State.Paused) {
			await TrackPlayer.play();
			setIsPlaying(true);
		} else if (state === State.Playing) {
			await TrackPlayer.pause();
			setIsPlaying(false);
		} else {
			await TrackPlayer.play();
			setIsPlaying(true);
		}
	};
	//Función para saltar al audio anterior
	const skipToPrevius = async () => {
		const currentIndex = Number(await TrackPlayer.getCurrentTrack()); // Obtener el índice del audio actual
		const previusIndex = currentIndex - 1; //Actualizar al nuevo índice
		//Verificar que exista un audio previo
		if (previusIndex >= 0) {
			const previus = await TrackPlayer.getTrack(previusIndex); // Obtener los datos del audio anterior
			if (previus) {
				await TrackPlayer.skip(previus.id); // Pasar el id del audio anterior a skip()
				setCurrentTrack(previus); //Se actualiza el audio actual
				await TrackPlayer.play(); //Reproducir audio
			}
		}
	};

	//Función para saltar al proximo audio
	const skipToNext = async () => {
		const currentIndex = Number(await TrackPlayer.getCurrentTrack()); // Obtener el índice del audio actual
		const nextIndex = currentIndex + 1; //Actualizar al nuevo indice
		const next = await TrackPlayer.getTrack(nextIndex); // Obtener los datos del audio siguiente
		if (next) {
			await TrackPlayer.skip(next.id); // Pasar el id del siguiente audio a skip()
			setCurrentTrack(next); //Se actualiza el audio actual
			await TrackPlayer.play(); //Reproducir audio
		}
	};
	
	//Función para darle formato de minutos:segundos al tiempo de duración del audio
	const formatTime = (seconds: number): string => {
		const min = Math.floor(seconds / 60);
		const sec = Math.floor(seconds % 60);
		return `${min}:${sec < 10 ? '0' : ''}${sec}`;
	};

	useEffect(() => {
		//Actualizar el audio actual y reproducirlo
		const updateCurrentTrack = async () => {
			const {id, url, title, artist, artwork} = currentTrack ?? {
				id: 0,
				url: '',
				title: '',
				artist: '',
				artwork: '',
			};
			const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();
			if (activeTrackIndex !== id) {
				await TrackPlayer.skip(id);
				await TrackPlayer.play();
				setIsPlaying(true);
			}
		};

		if (currentTrack) {
			updateCurrentTrack();
		}
	}, [currentTrack]);

	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<ImageBackground
				source={currentTrack?.artwork}
				style={{
					flex: 0.6,
					width: '90%',
					height: '80%',
					marginLeft: 35,
				}}></ImageBackground>
			<Text style={{fontSize: 28}}>{currentTrack?.title}</Text>
			<Text style={{fontSize: 18, marginTop: 10}}>
				{currentTrack?.artist}
			</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: '60%',
					marginTop: 10,
				}}>
				<Text>{formatTime(progress.position)}</Text>
				<Text>{formatTime(progress.duration)}</Text>
			</View>
			<View>
				<ProgressBar
					progress={progress.position}
					buffered={progress.buffered}
					style={{
						width: 250,
						height: 10,
						borderRadius: 10,
						backgroundColor: '#ddd',
					}}
					trackStyle={{backgroundColor: '#333'}}
					thumbStyle={{backgroundColor: '#333'}}
				/>
			</View>
			<View style={{flexDirection: 'row', marginTop: 30}}>
				<TouchableOpacity onPress={skipToPrevius}>
					<Octicons name="triangle-left" size={50} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onPlayPausePress}
					style={{marginRight: 40, marginLeft: 40}}>
					{isPlaying ? (
						<Octicons name="columns" size={50} />
					) : (
						<Octicons name="play" size={50} />
					)}
				</TouchableOpacity>
				<TouchableOpacity onPress={skipToNext}>
					<Octicons name="triangle-right" size={50} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Reproductor;
