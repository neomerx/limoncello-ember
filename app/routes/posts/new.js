import Ember from 'ember';

export default Ember.Route.extend({

  templateName: 'posts.edit',

  model() {
    return Ember.RSVP.hash({
      post: this.store.createRecord('post'),
      sites: this.store.findAll('site'),
      authors: this.store.findAll('author')
    }).then(function (hash) {
      const firstSite = hash.sites.objectAt(0);
      if (firstSite !== undefined) {
        hash.post.set('site', firstSite);
      }

      const firstAuthor = hash.authors.objectAt(0);
      if (firstAuthor !== undefined) {
        hash.post.set('author', firstAuthor);
      }

      hash.selectedSite = firstSite;
      hash.selectedAuthor = firstAuthor;

      return Ember.RSVP.hash(hash);
    });
  },

  actions: {
    selectSite(site) {
      this.controller.set('model.selectedSite', site);
      this.controller.set('model.relationshipsDirty', true);
    },
    selectAuthor(author) {
      this.controller.set('model.selectedAuthor', author);
      this.controller.set('model.relationshipsDirty', true);
    }
  }

});
