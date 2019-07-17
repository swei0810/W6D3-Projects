const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") ||
      options.followState;
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render () {
    let text;
    if (this.followState === "unfollowed" || this.followState === "followed") {
      text = this.followState === "followed" ? "Unfollow!" : "Follow!";
      this.$el.prop('disabled', false);
    } else {
      text = this.followState === "following" ? "Following..." : "Unfollowing...";
      this.$el.prop('disabled', true);
    }
    this.$el.empty().append(text);
  }

  handleClick(e) {
    e.preventDefault();
    const request = this.followState === 'followed' ? APIUtil.unfollowUser : APIUtil.followUser;
    this.followState = this.followState === 'followed' ? 'unfollowing' : 'following';
    this.render();
    request(this.userId)
      .then(data => {
        this.followState = this.followState === 'following' ? 'followed' : 'unfollowed';
        this.render();
      });
  }
}

module.exports = FollowToggle;