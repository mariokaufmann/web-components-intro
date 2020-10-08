import {Component, Event, EventEmitter, h, Host, Listen, Prop, State, Watch} from '@stencil/core';

@Component({
  tag: 'vis-vote-counter',
  styleUrl: 'vote-counter.css',
  shadow: true,
})
export class VoteCounter {

  @Prop()
  counterTitle: string = '';

  @State()
  count: number = 0;

  @Event()
  countChanged: EventEmitter<number>;

  render() {
    return (
      <Host>
        {this.counterTitle && <p>{this.counterTitle}</p>}
        <div>
          <button class="downvote" onClick={() => this.decrementCount()}>&#8595;</button>
          <span>{this.count}</span>
          <slot/>
          <button class="upvote" onClick={() => this.incrementCount()}>&#8593;</button>
        </div>
      </Host>
    );
  }

  incrementCount() {
    this.count += 1;
    this.countChanged.emit(this.count);
  }

  decrementCount() {
    if (this.count === 0) {
      return;
    }

    this.count -= 1;
    this.countChanged.emit(this.count);
  }

  @Watch('counterTitle')
  counterTitleHandler(newValue: string, oldValue: string) {
    console.log(`Old title: ${oldValue}, new value: ${newValue}.`);
  }

  @Listen('dblclick')
  doubleClickHandler() {
    console.log('Double click!');
  }

}
