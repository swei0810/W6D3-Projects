const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find('input');
    this.$ul = this.$el.find('ul');
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput(e) {
    e.preventDefault();
    APIUtil.searchUsers(this.$input.val())
      .then((users) => this.renderResults.call(this, users));
  }

  renderResults(users) {
    this.$ul.empty();
    users.forEach(user => {
      const $li = $("<li>");
      const $a = $("<a>");
      $a.attr("href", `/users/${user.id}`);
      $a.append(`${user.username}`);
      const $button = $('<button>');
      const followState = user.followed ? 'followed' : 'unfollowed';
      const options = {userId: `${user.id}`, followState: followState};
      new FollowToggle($button, options);
      $li.append($a);
      $li.append($button);
      this.$ul.append($li);
    })
  }
}

module.exports = UsersSearch;