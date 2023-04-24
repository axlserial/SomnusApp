import {View, Text, Carousel, Spacings} from 'react-native-ui-lib';

// Información de cada fase del sueño
const sleepCicle = [
	{
		title: 'Fase 1',
		description:
			'Es la transición del estado de vigilia al sueño. ' +
			'La actividad cerebral disminuye, los movimientos oculares son lentos y el sueño es ligero y breve.',
	},
	{
		title: 'Fase 2',
		description:
			'Fase de sueño ligero en la que se produce la mayoría del sueño de una noche. ' +
			'La actividad cerebral disminuye aún más, la temperatura corporal y la frecuencia cardíaca' +
			' disminuyen y el cuerpo se prepara para el sueño profundo.',
	},
	{
		title: 'Fase 3',
		description:
			'Esta fase se conoce como sueño de ondas lentas o sueño profundo. ' +
			'La actividad cerebral es muy lenta, la respiración y la frecuencia cardíaca ' +
			'son bajas y el cuerpo se relaja profundamente.',
	},
	{
		title: 'Fase 4',
		description:
			'Es una fase de sueño profundo similar a la fase 3, ' +
			'pero con ondas cerebrales aún más lentas y más difícil de despertar.',
	},
	{
		title: 'Fase REM',
		description:
			'Es la fase en la cual se producen los sueños. ' +
			'La actividad cerebral aumenta, los movimientos oculares son rápidos ' +
			'y la respiración y la frecuencia cardíaca son irregulares. ' +
			'El cuerpo se encuentra en un estado de relajación muscular.',
	},
];

const FasesCarousel = () => {
	return (
		<Carousel autoplay loop showCounter>
			{sleepCicle.map((item, i) => (
				<View
					key={i}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#004B6F',
						borderRadius: 10,
						borderWidth: 2,
						height: '60%',
						width: '100%',
					}}>
					<Text
						text70
						style={{
							marginTop: 15,
							fontWeight: 'bold',
						}}>
						{item.title}
					</Text>
					<Text text70 margin-15 style={{marginTop: 10}}>
						{item.description}
					</Text>
				</View>
			))}
		</Carousel>
	);
};
export default FasesCarousel;
