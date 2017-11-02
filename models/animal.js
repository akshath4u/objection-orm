import { Model } from 'objection';
import { Person } from './person';

class Animal extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'Animal';
	}
	static relationMappings = {
		owner: {
			relation: Model.BelongsToOneRelation,
			modelClass: Person,
			join: {
				from: 'animal.ownerId',
				to: 'person.id'
			}
		}
	}
}