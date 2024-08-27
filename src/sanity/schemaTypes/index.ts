import type { SchemaTypeDefinition } from 'sanity';

import { poiType } from './poiType';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [poiType],
};
