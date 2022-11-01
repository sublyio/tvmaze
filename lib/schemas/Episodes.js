import { Schema } from 'mongoose'

export default (db, schemaName = 'Episodes', mongooseOptions) => {
  const options = Object.assign({
    versionKey: false,
  }, mongooseOptions)

  const episodeSchema = new Schema({
    id: {
      type: Number,
      integer: true,
      required: true,
      min: 1,
    },
    episodes: {
      type: Array,
      required: true,
    },
    // 'episodes.$': Object,
    'episodes.$.id': {
      type: Number,
      min: 1,
      required: true,
    },
    'episodes.$.url': {
      type: String,
      // type: SchemaTypes.Url,
      required: true,
    },
    'episodes.$.name': {
      type: String,
      required: true,
    },
    'episodes.$.season': {
      type: Number,
      min: 1,
      required: true,
    },
    'episodes.$.number': {
      type: Number,
      min: 0, // Pilot
      required: true,
    },
    'episodes.$.airdate': {
      type: String,
      required: false,
    },
    'episodes.$.airtime': {
      type: String,
      required: false,
    },
    'episodes.$.airstamp': {
      type: String,
      required: false,
    },
    'episodes.$.runtime': {
      type: Number,
      required: false,
    },
    'episodes.$.image': {
      type: Object,
      required: false,
    },
    'episodes.$.image.medium': {
      type: String,
      required: true,
    },
    'episodes.$.image.original': {
      type: String,
      required: true,
    },
    'episodes.$.summary': {
      type: String,
      required: false,
    },
    'episodes.$._links': {
      type: Object,
      required: true,
    },
    'episodes.$._links.self': {
      type: Object,
      required: true,
    },
    'episodes.$._links.self.href': {
      type: String,
      required: true,
    },
  }, options)

  return db.model(schemaName, episodeSchema)
}
