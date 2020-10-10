import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'vis-nested-counter',
  shadow: true,
})
export class VisNestedCounter {

  render() {
    return (
      <Host>
        <vis-vote-counter counterTitle="Votes">Votes</vis-vote-counter>
        <vis-vote-counter counterTitle="Likes">Likes</vis-vote-counter>
      </Host>
    );
  }

}
