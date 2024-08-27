import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const poiType = defineType({
	name: 'poi',
	title: 'Point of Interest',
	type: 'document',
	icon: EarthGlobeIcon,
	fields: [
		defineField({
			name: 'address',
			type: 'string',
		}),
		defineField({
			name: 'description',
			type: 'string',
		}),
		defineField({
			name: 'type',
			type: 'string',
		}),
		defineField({
			name: 'position',
			type: 'geopoint',
		}),
	],
	preview: {
		select: {
			title: 'description',
		},
	},
});
