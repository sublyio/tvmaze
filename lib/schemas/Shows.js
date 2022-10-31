import { Schema } from 'mongoose';

export default (db, schemaName = 'Show', mongooseOptions) => {
  const options = Object.assign({
    versionKey: false,
  }, mongooseOptions);

  const showSchema = new Schema({
    id: {
      type: Number,
      integer: true,
      required: true,
      min: 1,
    },
    url: {
      type: String,
      // type: SchemaTypes.Url,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    genres: {
      type: Array,
      required: false,
    },
    'genres.$': {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    runtime: {
      type: Number,
      required: false,
    },
    premiered: {
      type: String,
      required: false,
    },
    schedule: {
      type: Object,
      required: true,
    },
    'schedule.time': {
      type: String,
      required: false,
    },
    'schedule.days': {
      type: Array,
      required: false,
    },
    'schedule.days.$': {
      type: String,
      required: false,
    },
    rating: {
      type: Object,
      required: false,
    },
    'rating.average': {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    network: {
      type: Object,
      required: false,
    },
    'network.id': {
      type: Number,
      required: false,
    },
    'network.name': {
      type: String,
      required: false,
    },
    'network.country': {
      type: Object,
      required: false,
    },
    'network.country.name': {
      type: String,
      required: false,
    },
    'network.country.code': {
      type: String,
      required: false,
    },
    'network.country.timezone': {
      type: String,
      required: false,
    },
    webChannel: {
      type: Object,
      required: false,
    },
    'webChannel.id': {
      type: Number,
      required: false,
    },
    'webChannel.name': {
      type: String,
      required: false,
    },
    'webChannel.country': {
      type: Object,
      required: false,
    },
    'webChannel.country.name': {
      type: String,
      required: false,
    },
    'webChannel.country.code': {
      type: String,
      required: false,
    },
    'webChannel.country.timezone': {
      type: String,
      required: false,
    },
    externals: {
      type: Object,
      required: true,
    },
    'externals.tvrage': {
      type: Number,
      required: false,
    },
    'externals.thetvdb': {
      type: Number,
      required: false,
    },
    'externals.imdb': {
      type: String,
      required: false,
    },
    image: {
      type: Object,
      required: false,
    },
    'image.medium': {
      type: String,
      required: true,
    },
    'image.original': {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    updated: {
      type: Number,
      required: true,
    },
    _links: {
      type: Object,
      required: true,
    },
    '_links.self': {
      type: Object,
      required: true,
    },
    '_links.self.href': {
      type: String,
      required: true,
    },
    '_links.previousepisode': {
      type: Object,
      required: false,
    },
    '_links.previousepisode.href': {
      type: String,
      required: false,
    },
    '_links.nextepisode': {
      type: Object,
      required: false,
    },
    '_links.nextepisode.href': {
      type: String,
      required: false,
    },
  }, options);

  return db.model(schemaName, showSchema);
};
