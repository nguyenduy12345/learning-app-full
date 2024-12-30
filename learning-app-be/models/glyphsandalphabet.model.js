import mongoose from "mongoose";

import collections from "../utils/collections.js";

const glyphsAndAlphabetSchema= new mongoose.Schema({
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true},
    characters: {
        tones: [
            {
                character: {type: String},
                example: {type: String},
                audioUrl: {type: String}
            }
        ],
        initials: [
            {
                character: {type: String},
                example: {type: String},
                audioUrl: {type: String}
            }
        ],
        finals: [
            {
                character: {type: String},
                example: {type: String},
                audioUrl: {type: String}
            }
        ]
    },
    phonetic: 
        {
            vowels: [
                {
                    character: {type: String},
                    example: {type: String},
                    audioUrl: {type: String}
                }
            ],
            consonants: [
                {
                    character: {type: String},
                    example: {type: String},
                    audioUrl: {type: String}
                }
            ]
        },
    letters: [
        {
            letter: {type: String},
            example: {type: String},
            audioUrl: {type: String}
        }
    ]
},{
    timestamps: true
})
const GlyphsAndAlphabetModel = mongoose.model(collections.GLYPHSANDALPHABETS, glyphsAndAlphabetSchema)

export default GlyphsAndAlphabetModel