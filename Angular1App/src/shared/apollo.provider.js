import angular from 'angular';

function ApolloProvider() {
  let _client;

  this.defaultClient = (client) => {
    _client = client;
  };

  this.$get = ['$q', ($q) => ({
    query(options) {
      this._check();

      return this._wrapper(_client.query(options));
    },

    mutate(options) {
      this._check();

      return this._wrapper(_client.mutate(options));
    },

    _check() {
      if (!_client) {
        throw new Error('Missing client');
      }
    },

    _wrapper(promise) {
      return $q((resolve, reject) => {
        promise.then(resolve).catch(reject);
      });
    }
  })];
}

export default angular.module('apollo', [])
  .provider('apollo', ApolloProvider);
