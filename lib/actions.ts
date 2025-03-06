'use server';

import { statesData } from './constants';

export async function findPopulation(formData: FormData) {
	const rawFormData = {
		state: formData.get('state'),
	};

	const population = statesData.find(
		(state) => state.id === rawFormData.state
	)?.population;

	return `${population}`;
}
