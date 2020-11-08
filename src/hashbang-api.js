export default {
  getNamedTagLists: function () {
    return fetch(
      'https://hashbang.arctair.com/namedTagLists',
    ).then((response) => response.json())
  },
}
