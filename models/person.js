import { Model } from 'objection';
import { Animal } from './animal';

class Person extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'Person';
	}

	static relationMappings = {
		owner: {
			relation: Model.BelongsToOneRelation,
			modelClass: Animal,
			join: {
				from: 'animal.ownerId',
				to: 'person.id'
			}
		}
	}
}