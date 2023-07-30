import {SchemaTypeDefinition} from "@sanity/types";

const exampleSchema: SchemaTypeDefinition = {
    name: 'example',
    type: 'document',
    title: 'Example Schema',
    options: {
        translatable: true,
    },
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }
    ]
};
export default exampleSchema