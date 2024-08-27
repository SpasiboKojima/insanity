import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			S.documentTypeListItem('poi').title('Point of Interest'),
			S.divider(),
			...S.documentTypeListItems().filter((item) => item.getId() && !['poi'].includes(item.getId()!)),
		]);
