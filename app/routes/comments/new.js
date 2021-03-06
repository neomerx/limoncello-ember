import Ember from 'ember';

export default Ember.Route.extend({

  templateName: 'comments.edit',

  model() {
    return Ember.RSVP.hash({
      comment: this.store.createRecord('comment'),
      posts: this.store.findAll('post')
    }).then(function (hash) {
      const firstPost = hash.posts.objectAt(0);
      if (firstPost !== undefined) {
        hash.comment.set('post', firstPost);
      }

      hash.selectedPost = firstPost;

      return Ember.RSVP.hash(hash);
    });
  },

  actions: {
    selectPost(post) {
      this.controller.set('model.selectedPost', post);
      this.controller.set('model.relationshipsDirty', true);
    }
  }

});
