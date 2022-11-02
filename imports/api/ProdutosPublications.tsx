import { Meteor } from 'meteor/meteor';
import { ProdutosCollection } from '/imports/api/db/ProdutosCollection'

Meteor.publish('produtos', function publishTasks() {
  return ProdutosCollection.find({ userId: this.userId });
});