import {defineType, defineField, defineArrayMember} from "@sanity-typed/types";

const exampleSchema = defineType({
    name: 'example',
    type: 'document',
    title: 'Example Schema',
    options: {
        translatable: true,
    },
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: r => r.required()
        }),
        defineField({
            name: 'content',
            type: 'array',
            title: 'Content',
            validation: r => r.required(),
            of: [
                defineArrayMember({
                    type: 'block',
                    validation: r => r.required(),
                })
            ]
        }),
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        })
    ]
});

export default exampleSchema