import { Button } from '@ag.ds-next/react/button';
import { FormStack } from '@ag.ds-next/react/form-stack';
import { H2 } from '@ag.ds-next/react/heading';
import { Select } from '@ag.ds-next/react/select';
import { Stack } from '@ag.ds-next/react/stack';
import { findPopulation } from '../../lib/actions';
import { STATES } from '../../lib/constants';

export const FormExample = () => {
	return (
		<Stack paddingTop={2} gap={1}>
			<H2 id="form-heading">Find a population</H2>

			<form action={findPopulation} aria-labelledby="form-heading">
				<FormStack>
					<Select
						label="State"
						name="state"
						options={STATES}
						placeholder="Please select"
					/>

					<Button alignSelf="start" loadingLabel="Finding" type="submit">
						Find population
					</Button>
				</FormStack>
			</form>
		</Stack>
	);
};
